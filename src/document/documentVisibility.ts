import { useState, useEffect } from "react";



let visibilityState = document.visibilityState;  // Globally cached
const listeners = new Set<(visible: boolean) => void>();

function onVisibilityChange() {
  visibilityState = document.visibilityState;
  const isVisible = visibilityState === "visible";
  listeners.forEach(listener => listener(isVisible));
}


/**
 * React hook that returns whether the current document (tab) is visible.
 * Uses a shared global `visibilitychange` listener across all instances.
 * Useful for pausing animations, refreshing data, or handling logic
 * when the user switches tabs or minimizes the window.
 *
 * @returns {boolean} `true` if the document is visible; `false` if it is hidden.
 *
 * @example
 * const isVisible = useDocumentVisibility();
 * useEffect(() => {
 *   if (isVisible) {
 *     console.log("Tab is active again!");
 *   }
 * }, [isVisible]);
 */
export function useDocumentVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === "visible");


  useEffect(() => {  // Add a listener that will update the local state
    const listener = (visible: boolean) => setIsVisible(visible);
    listeners.add(listener);

    if (listeners.size === 1) {  // If it's the first subscriber, add the global event listener
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    // Synchronize the current state
    setIsVisible(visibilityState === "visible");

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {  // If there are no more listeners, remove the global event listener
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
    };
  }, []);

  return isVisible;
}
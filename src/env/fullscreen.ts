import { isIOS } from "./platform";



/**
 * Extends the standard HTMLVideoElement interface
 * with WebKit-only fullscreen API methods used in Safari.
 *
 * These methods are non-standard but officially supported
 * by WebKit on iOS and macOS.
 */
declare global {
  interface HTMLVideoElement {
    /**
     * Enters fullscreen mode (WebKit-specific).
     * Available in Safari on iOS and macOS.
     */
    webkitEnterFullscreen?: () => void;

    /**
     * Exits fullscreen mode (WebKit-specific).
     * Available in Safari on iOS and macOS.
     */
    webkitExitFullscreen?: () => void;
  }
}



/**
 * Handles fullscreen toggling for iOS Safari,
 * using the non-standard webkitEnter/ExitFullscreen API.
 *
 * @param videoEl HTMLVideoElement instance (can be null)
 */
function _handleIosFSToggle(videoEl: HTMLVideoElement | null): void {
  if (!videoEl) {
    return;
  }

  // WebKit-only API, still officially supported in Safari (iOS & macOS)
  if ('webkitDisplayingFullscreen' in videoEl && (videoEl as any).webkitDisplayingFullscreen) {
    // Exits fullscreen mode if currently active
    videoEl.webkitExitFullscreen?.();
  }
  else {
    // Enters fullscreen mode (WebKit-specific behavior)
    videoEl.webkitEnterFullscreen?.();
  }
}



/**
 * Toggles fullscreen mode for the specified element by ID.
 * On iOS, only <video> elements can enter fullscreen, so if the
 * target is not a <video>, the function attempts to locate the
 * first <video> child and trigger fullscreen on it instead.
 *
 * @param htmlElementId The ID of the element to toggle fullscreen for.
 */
async function goFullScreen(htmlElementId: string) {
  const el = document.getElementById(htmlElementId);

  if (!el) {
    return;
  }


  /* iOS special handling */
  if (isIOS) {
    _handleIosFSToggle(
      el instanceof HTMLVideoElement
        ? el  // If the element itself is a video
        : el.querySelector("video") // Otherwise, find the first video inside it
    );

    return;
  }


  /* Standard Fullscreen API (non-iOS) */
  if (!document.fullscreenEnabled) return;

  try {
    if (document.fullscreenElement?.id === htmlElementId) {
      await document.exitFullscreen();
    }
    else {
      await el.requestFullscreen();
    }
  }
  catch {
    // Ignore rejected fullscreen requests (e.g., user gesture required)
  }
}



export { goFullScreen };
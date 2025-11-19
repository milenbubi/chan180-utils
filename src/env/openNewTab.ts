/**
 * Opens a new browser tab with the given URL.
 *
 * - Uses `noopener` and `noreferrer` for improved security.
 * - Explicitly sets `newWindow.opener = null` to prevent reverse tabnabbing.
 * - Does nothing if the URL is missing, empty, or invalid.
 *
 * @param {string} [link] - The URL to open in a new tab.
 * @returns {void}
 *
 * @example
 * openNewTab("https://example.com");
 */
export function openNewTab(link?: string): void {
  if (typeof link !== "string" || !link.trim()) {
    return;
  }

  const newWindow = window.open(link, "_blank", "noopener,noreferrer");

  if (newWindow) {
    newWindow.opener = null;
  }
};
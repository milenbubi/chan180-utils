import { isNumeric } from "../numbers";
import { openNewTab } from "./openNewTab";
import { isMobile } from "./platform";



/**
 * Opens a Facebook profile either via deep link (fb://) on mobile devices,
 * or in a new browser tab on desktop.
 *
 * Behavior:
 * - Accepts the Facebook profile ID as a number or a numeric string.
 * - Validates that the provided `fbUserId` is a non-negative integer.
 * - On desktop: opens `https://www.facebook.com/{id}` in a new tab.
 * - On mobile: attempts to open the Facebook app using a deep link (`fb://profile/{id}`).
 * - If the Facebook app does not open within ~1.5 seconds, falls back to the web URL.
 *
 * @param {number|string} fbUserId - The Facebook user/profile ID (numeric or numeric string).
 * @returns {void}
 *
 * @example
 * openFacebookProfile(123456789);
 * openFacebookProfile("987654321");
 * 
 * @remarks
 * The fallback timer uses a 1500 ms delay and checks whether the app launch
 * interrupted the flow. If not, it opens the profile in the browser.
 */
export function openFacebookProfile(fbUserId: number | string): void {
  if (!isNumeric(fbUserId, { isInteger: true, notNegative: true })) {
    return;
  }

  const fbUserProfile = `https://www.facebook.com/${fbUserId}`;

  if (!isMobile()) {
    openNewTab(fbUserProfile);
    return;
  }

  const now = Date.now();

  window.location.href = `fb://profile/${fbUserId}`;

  setTimeout(() => {
    if (Date.now() - now < 1600) {
      openNewTab(fbUserProfile);
    }
  }, 1500);
}
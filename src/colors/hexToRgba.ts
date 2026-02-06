const _hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;


/**
 * Convert a HEX color code to an RGBA color string.
 *
 * @param {string} hex    HEX color code (e.g. "#ae951e" or "ae951e").
 * @param {number} [alpha=1]  Alpha value between 0 and 1 (default is 1).
 * @returns {string | null}   RGBA string (e.g. "rgba(174, 149, 30, 1)") or null if invalid.
 */
export function hexToRgba(hex: string, alpha: number = 1): string | null {
  const result = _hexRegex.exec(hex);

  if (!result) {
    return null;
  }

  if (alpha < 0 || alpha > 1) {
    alpha = 1;
  }

  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}
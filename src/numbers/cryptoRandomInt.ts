/**
 * Returns a cryptographically secure random integer
 * between `min` and `max` (inclusive).
 *
 * This function is fully defensive and will NEVER throw.
 * Invalid inputs are sanitized and replaced with safe defaults.
 *
 * Default behavior:
 * - If `min` is invalid → defaults to 0
 * - If `max` is invalid → defaults to 1
 * - `min` and `max` can be negative
 * - If `min > max` → values are swapped
 * - Non-integer values are rounded
 * - Values outside safe integer bounds are clamped
 *
 * Range is limited to `<= 2^32` due to `Uint32Array` constraints.
 * If exceeded, it falls back to a safe `[0, 1]` range.
 *
 * @param min - Minimum integer value (inclusive). Default: 0
 * @param max - Maximum integer value (inclusive). Default: 1
 *
 * @returns A cryptographically secure random integer.
 *
 * @example
 * getCryptoRandomInt(1, 45);   // 1..45
 * getCryptoRandomInt();       // 0 or 1
 * getCryptoRandomInt(null, 5) // 0..5
 * getCryptoRandomInt(10, 3)   // 3..10
 * getCryptoRandomInt(7)   // 1..7
 */
export function getCryptoRandomInt(min?: number, max?: number): number {

  // sanitize inputs
  let safeMin = (typeof min === "number" && Number.isFinite(min)) ? Math.round(min) : 0;
  let safeMax = (typeof max === "number" && Number.isFinite(max)) ? Math.round(max) : 1;

  // clamp to safe integer bounds
  safeMin = Math.max(Number.MIN_SAFE_INTEGER, Math.min(Number.MAX_SAFE_INTEGER, safeMin));
  safeMax = Math.max(Number.MIN_SAFE_INTEGER, Math.min(Number.MAX_SAFE_INTEGER, safeMax));

  // swap if inverted
  if (safeMin > safeMax) {
    [safeMin, safeMax] = [safeMax, safeMin];
  }

  let range = safeMax - safeMin + 1;

  // hard limit for Uint32
  if (range <= 0 || range > 2 ** 32) {
    safeMin = 0;
    safeMax = 1;
    range = 2;
  }

  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % range);
  const array = new Uint32Array(1);

  while (true) {
    crypto.getRandomValues(array);

    if (array[0] < limit) {
      return safeMin + (array[0] % range);
    }
  }
}
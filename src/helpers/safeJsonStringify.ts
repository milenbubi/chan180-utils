/**
 * Safely stringifies a JS value without throwing an exception.
 *
 * Returns `null` if:
 * - JSON.stringify throws (circular refs, BigInt, etc.),
 * - the value cannot be serialized.
 *
 * @param {any} value - The value to stringify.
 * @returns {string | null} JSON string or null on failure.
 *
 * @example
 * const txt = safeJsonStringify({ a: 1 });
 * // → '{"a":1}'
 *
 * @example
 * const circular = {};
 * circular.self = circular;
 * const txt2 = safeJsonStringify(circular);
 * // → null
 */
export function safeJsonStringify(value: any): string | null {
  try {
    return JSON.stringify(value);
  }
  catch {
    return null;
  }
}
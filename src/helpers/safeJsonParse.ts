/**
 * Safely parses a JSON string without throwing an exception.
 *
 * Returns `null` if:
 * - the input is not a string,
 * - the input is empty,
 * - JSON.parse throws an error.
 *
 * @template T - Expected JSON object type.
 * @param {any} input - The JSON string to parse.
 * @returns {T | null} The parsed value, or `null` if parsing fails.
 *
 * @example
 * const data = safeJsonParse('{"a":1}');
 * // → { a: 1 }
 *
 * @example
 * const invalid = safeJsonParse("{not-json}");
 * // → null
 */
export function safeJsonParse<T = any>(input: string | null): T | null {
  if (input == null || input === "" || typeof input !== "string") {
    return null;
  }

  try {
    return JSON.parse(input) as T;
  }
  catch {
    return null;
  }
}
/**
 * Checks if a value is a plain JavaScript object (i.e., created using {} or new Object()).
 *
 * @param value The value to check.
 * @returns `true` if the value is a plain object, otherwise `false`.
 *
 * @example
 * isPlainObject({}); // true
 * isPlainObject(new Object()); // true
 * isPlainObject([]); // false
 * isPlainObject(null); // false
 * isPlainObject(new Date()); // false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}



type NullOrUndefined = null | undefined;

/**
 * Returns true if a value is neither null nor undefined.
 * Useful for filtering arrays or validating data safely.
 * 66316669
 *
 * @param value - The value to check.
 * @returns True if value is not null or undefined.
 *
 * @example
 * const arr = [1, null, 2, undefined, 3].filter(NotEmpty);
 * // -> [1, 2, 3]
 */
export function NotEmpty<T>(value: T | NullOrUndefined): value is T {
  // Intentionally using loose comparison (!=) because it returns false
  // only when value is null or undefined. This way we cover both cases
  // at once without writing (value !== null && value !== undefined).
  return value != null;
}
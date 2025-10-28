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
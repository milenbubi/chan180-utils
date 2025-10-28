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
/**
 * Generates a union type of numbers from `0` up to `N` (inclusive).
 *
 * This is a **helper type** used to create compile-time ranges.
 * Typically you will use it together with `Range1To<N>` to exclude `0`.
 *
 * ⚠️ Limitation:
 * TypeScript tuple recursion can handle up to ~999 elements.
 *
 * @template N - The maximum number in the range (inclusive).
 *
 * @example
 * type ZeroToThree = UpTo<3>; // 0 | 1 | 2 | 3
 */
export type Range0To<N extends number, T extends number[] = []> =
  T["length"] extends N
  ? [...T, N][number]         // 0..N
  : Range0To<N, [...T, T["length"]]>;



/**
 * Generates a union type of numbers from 1 up to N (inclusive).
 *
 * This is useful for creating type-safe ranges for function parameters,
 * array indices, or any scenario where you want to restrict a number
 * to a specific range at compile time.
 *
 *  ⚠️ Limitation:
 *   TypeScript tuple recursion can handle up to ~999 elements.
 *   If N > 999, compilation may fail with
 *   "Type instantiation is excessively deep and possibly infinite."
 * 
 * @template N - The maximum number in the range (inclusive).
 *
 * @see {@link Range0To<N>} - the underlying type including 0.
 * 
 * @example
 * // Generates 1 | 2 | 3
 * type ValidCount = Range1To<3>;
 * 
 * @remarks
 * Using `Range1To<0>` produces `never`, because there are no numbers ≥ 1.
 */
export type Range1To<N extends number> = Exclude<Range0To<N>, 0>;
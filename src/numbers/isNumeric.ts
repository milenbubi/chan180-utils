/**
 * Configuration options for numeric validation.
 *
 * @property notNegative - If true, negative numbers are disallowed.
 * @property isInteger - If true, only integer values are allowed (no decimals).
 * @property allowEmpty - If true, empty strings ("") are considered valid.
 */
type IsNumericOptions = {
  notNegative?: boolean;
  isInteger?: boolean;
  allowEmpty?: boolean;
};


// Predefined regex patterns
const NUMERIC_REGEX = {
  base: /^-?\d*\.?\d*$/,
  notNegative: /^\d*\.?\d*$/,
  integer: /^-?\d*$/,
  integerNotNegative: /^\d*$/,
  notZero: /^(?!0*\.?0*$)\d*\.?\d*$/
};


// List of allowed primitive types for the `value` parameter
const validTypes = ["number", "string"];



/**
 * Checks whether a given value is a valid numeric string or number,
 * according to the specified validation options.
 *
 * Supports validation for integers, negative values,
 * and optionally allows empty strings.
 *
 * ---
 * **Examples:**
 *
 * ✅ **Basic usage**
 * ```ts
 * isNumeric("123");           // true
 * isNumeric(123);             // true
 * isNumeric("12.3");          // true
 * isNumeric("-12.3");         // true
 * isNumeric("-.");            // false (invalid number format)
 * isNumeric("12a");           // false (contains letter)
 * ```
 *
 * ✅ **Integers only**
 * ```ts
 * isNumeric("42", { isInteger: true });   // true
 * isNumeric("-42", { isInteger: true });  // true
 * isNumeric("4.2", { isInteger: true });  // false
 * ```
 *
 * ✅ **Non-negative numbers**
 * ```ts
 * isNumeric("10", { notNegative: true });   // true
 * isNumeric("-10", { notNegative: true });  // false
 * isNumeric("3.14", { notNegative: true }); // true
 * ```
 *
 * ✅ **Allow empty string**
 * ```ts
 * isNumeric("", { allowEmpty: true });  // true
 * isNumeric("", { allowEmpty: false }); // false
 * ```
 *
 * ✅ **Combined options**
 * ```ts
 * isNumeric("42", { isInteger: true, notNegative: true }); // true
 * isNumeric("-5", { isInteger: true, notNegative: true }); // false
 * isNumeric(".5", { isInteger: true, notNegative: true }); // false
 * isNumeric("", { allowEmpty: true, isInteger: true }); // true
 * ```
 *
 * ---
 * @param {string | number} value - The value to check.
 * @param {Object} [options] - Configuration options for numeric validation.
 * @param {boolean} [options.notNegative=false] - Disallow negative numbers (`-` prefix).
 * @param {boolean} [options.isInteger=false] - Only allow integers (no decimal point).
 * @param {boolean} [options.allowEmpty=false] - Treat empty string as valid input.
 *
 * @returns {boolean} `true` if the value matches the specified numeric criteria, otherwise `false`.
 */
export function isNumeric(value: string | number, options: IsNumericOptions = {}): boolean {
  if (!validTypes.includes(typeof value)) {  // Reject values that are not string or number
    return false;
  }

  value = value.toString();

  if (value === "-." || value === ".") {  // Block edge cases that are not valid numbers
    return false;
  }

  const { notNegative, isInteger, allowEmpty } = options;

  if (value === "") {
    return !!allowEmpty;
  }

  let numberMatch = NUMERIC_REGEX.base;

  if (isInteger && notNegative) numberMatch = NUMERIC_REGEX.integerNotNegative;
  else if (isInteger) numberMatch = NUMERIC_REGEX.integer;
  else if (notNegative) numberMatch = NUMERIC_REGEX.notNegative;

  return numberMatch.test(value);
}
export type DateSource = Date | string | number | null;
type DateFormatUnit = "fullDateTime" | "date" | "year" | "yearMonth" | "monthDay" | "hoursMinutesSeconds" | "camStyle";



/**
 * Checks if the given value is a valid date.
 * 
 * @param value - The value to check. Can be a Date object, a number (milliseconds since Epoch), or a string.
 * @returns A Date object if the value is valid, otherwise null.
 */
export function parseValidDate(value: DateSource): Date | null {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  }
  else if (typeof value === "number") {
    date = new Date(value);
  }
  else if (typeof value === "string") {
    date = new Date(value.trim());
  }
  else {
    return null;
  }

  return isNaN(date.getTime()) ? null : date;
}

interface IFormatUtcDateProps {
  source: DateSource;
  unit: DateFormatUnit;
  locale?: string;
  noSeconds?: boolean;
  returnEmptyInsteadOfNA?: boolean;
}


/**
 * Formats a UTC date value into a localized date/time string.
 *
 * @param source - The source date. Can be a Date object, a date string, a Unix timestamp (milliseconds since Epoch), or null.
 * @param unit - The output format unit. Controls how detailed the formatted string will be:
 *    - *NOTE: All examples below use locale "en"*
 *    - `"fullDateTime"` → includes date and time: **25 Feb 2026, 16:32:10**
 *    - `"date"` → year, short month, and day: **25 Feb 2026**
 *    - `"year"` → year only: **2026**
 *    - `"yearMonth"` → full month name and year: **February 2026**
 *    - `"monthDay"` → full month name and day only: **February 25**
 *    - `"hoursMinutesSeconds"` → time only: **16:32:10**
 *    - `"camStyle"` → Styles for cameras: **25-02-2026 16:24:39**
 * @param locale - The target locale (e.g. `"en-US"`, `"bg-BG"`). Determines language and formatting rules.
 * @param noSeconds - Optional flag to omit seconds in time-based formats.
 * @param returnEmptyInsteadOfNA - Optional flag. If `true`, returns an empty string `""` instead of `"N/A"` when the source is invalid or null.
 * @returns {string} - The formatted local date/time string. Returns `"N/A"` if the source is invalid or null.
 */
export function formatUTCDateToLocalDateString({ source, unit, locale = "en", noSeconds, returnEmptyInsteadOfNA }: IFormatUtcDateProps): string {
  const date = parseValidDate(source);
  if (!date) {
    return returnEmptyInsteadOfNA ? "" : "N/A";
  }

  let dateLocaleOptions: Intl.DateTimeFormatOptions;

  switch (unit) {
    case "fullDateTime":
      dateLocaleOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        // hour12: false,
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        second: noSeconds ? undefined : "2-digit"
      };
      break;

    case "date":
      dateLocaleOptions = { year: "numeric", month: "short", day: "numeric" };
      break;

    case "year":
      dateLocaleOptions = { year: "numeric" };
      break;

    case "yearMonth":
      dateLocaleOptions = { year: "numeric", month: "long" };
      break;

    case "monthDay":
      dateLocaleOptions = { month: "long", day: "numeric" };
      break;

    case "hoursMinutesSeconds":
      dateLocaleOptions = {
        // hour12: false,
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        second: noSeconds ? undefined : "2-digit"
      };
      break;

    case "camStyle": {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // месеците са 0-based month
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    default:  // fallback to long date
      dateLocaleOptions = { year: "numeric", month: "long", day: "numeric" };
      break;
  }

  // 69512992
  // show 00:00 instead of 24:00 
  return date.toLocaleString(locale, dateLocaleOptions);
}



/**
 * Converts a Date object (or date-like source) to a UTC ISO string
 * with the time normalized to 00:00 of the same day, based on the local date of the user.
 *
 * Useful for storing or comparing dates in UTC without caring about the local time of day.
 *
 * @param {DateSource} source - A Date object, timestamp, or other parseable date input.
 * @returns {string | null} UTC ISO string with time set to 00:00, or null if input is invalid.
 *
 * @example
 * getUTCStartOfLocalDay(new Date("2025-10-15T14:30:00")); 
 * // "2025-10-15T00:00:00.000Z"
 *
 * @example
 * // User in New York enters 2025-10-14T23:01 local time
 * getUTCStartOfLocalDay(new Date("2025-10-14T23:01:00")); 
 * // "2025-10-14T00:00:00.000Z"
 */
export function getUTCStartOfLocalDay(source: DateSource): string | null {
  const date = parseValidDate(source);

  if (!date) {
    return null;
  }

  const utcDate = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0, 0, 0, 0
  ));

  return utcDate.toISOString();
}



/**
 * Returns a formatted ISO 8601 (JSON) date string for the given input.
 *
 * @param {DateSource} source - A Date object, a Unix timestamp, or other parseable date input.
 *                              If the input is invalid, `null` is returned.
 * @returns {string | null} The formatted ISO 8601 date string (e.g. "2021-01-18T10:57:30.268Z"),
 *                               or `null` if the input could not be parsed.
 *
 * Converts the input into an ISO 8601 string using `toISOString()`, which always outputs UTC time.
 * 
 * @example
 * getLocalToUTCString(new Date("2025-10-15T14:30:00"));
 * // "2025-10-15T12:30:00.000Z"
 *
 * @example
 * getLocalToUTCString(null);
 * // null
 *
 * @example
 * getLocalToUTCString(1697367000000); // timestamp
 * // "2023-10-15T12:30:00.000Z"
 */
export function getLocalToUTCString(source: DateSource): string | null {
  const localDate = parseValidDate(source);
  return localDate?.toISOString() || null;
}
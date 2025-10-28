import { isPlainObject } from "../types";


/**
 * Downloads a file from a given URL and triggers a browser download.
 *
 * @async
 * @param {string} fileUrl - The URL of the file to download.
 * @param {string} fileName - The name to give the downloaded file.
 * @returns {Promise<{ error: string | null }>} A promise that resolves to an object:
 * - `{ error: null }` if the file was successfully downloaded.
 * - `{ error: string }` if the download failed.
 *
 * @example
 * const result = await downloadFile('/files/report.pdf', 'report.pdf');
 * if (result.error) {
 *   console.error(result.error);
 * }
 */
export async function downloadFile(fileUrl: string, fileName: string,): Promise<{ error: string | null; }> {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return { error: null }
  }
  catch (err) {
    return { error: "File is not downloaded" };
  }
}



/**
 * Converts a nested JavaScript object into a PHP-style query string.
 *
 * Supported types:
 * - primitives (string, number, boolean)
 * - Date (serialized via toISOString)
 * - arrays (including arrays of objects)
 * - plain nested objects
 *
 * Skips:
 * - null / undefined
 * - functions, symbols
 * - NaN / Infinity
 *
 * Example:
 * ```ts
 * urlQueryStringFromObject({
 *   page: 1,
 *   filters: { active: true, tags: ["a", "b"] },
 *   countries: [ { active: "USA" }, {currentt: "Russia"}],
 *   date: new Date()
 * });
 * // ?page=1&filters[active]=true&filters[tags][]=a&filters[tags][]=b&countries[][active]=USA&countries[][currentt]=Russia&date=2025-10-17T12%3A30%3A34.081Z
 * ```
 *
 * @param {Record<string, any>} obj - The object to serialize.
 * @returns {string} A valid query string starting with '?' or an empty string.
 */
export const urlQueryStringFromObject = (() => {
  /** Recursive helper — defined once, not recreated on each call */
  const buildQuery = (parts: string[], keyPrefix: string, value: unknown) => {
    if (value === null || value === undefined) return;

    // Skip non-serializable types
    if (typeof value === "function" || typeof value === "symbol") return;
    if (Number.isNaN(value) || value === Infinity || value === -Infinity) return;

    // Array
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (isPlainObject(v)) {
          Object.entries(v).forEach(([k, val]) =>
            buildQuery(parts, `${keyPrefix}[][${k}]`, val)
          );
        }
        else {
          buildQuery(parts, `${keyPrefix}[]`, v);
        }
      });
      return;
    }

    // Date
    if (value instanceof Date) {
      parts.push(`${keyPrefix}=${encodeURIComponent(value.toISOString())}`);
      return;
    }

    // Plain Object
    if (isPlainObject(value)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        buildQuery(parts, `${keyPrefix}[${subKey}]`, subValue);
      });
      return;
    }

    // Primitive values
    parts.push(`${keyPrefix}=${encodeURIComponent(String(value))}`);
  };


  // The main exported function
  return function urlQueryStringFromObject(obj: Record<string, any>): string {
    if (!isPlainObject(obj) || Object.keys(obj).length === 0) {
      return "";
    }

    const parts: string[] = [];


    Object.entries(obj).forEach(([key, value]) => buildQuery(parts, key, value));

    return parts.length ? "?" + parts.join("&") : "";
  };
})();
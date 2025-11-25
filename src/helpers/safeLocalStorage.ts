import { safeJsonParse } from "./safeJsonParse";
import { safeJsonStringify } from "./safeJsonStringify";



/**
 * A lightweight, fail-safe wrapper around the browser's `localStorage` API.
 *
 * Provides safe access methods (`set`, `get`, `getParsed`, `remove`)
 * that will **never throw**, even in restricted environments like
 * Safari Private Mode, headless browsers, or bots.
 *
 * ---
 * ### Notes
 * - Does **not** include a `clear()` method by design.
 * - Safe to import and use in any runtime — never throws exceptions.
 * - Designed for simple, direct use: `safeLocalStorage.set("place", "Bulgaria")`.
 */
export const safeLocalStorage = {
  /**
   * Stores a value in LocalStorage.
   * @param {string} key Storage key.
   * @param {any} data Value to store.
   * @param {boolean} [shouldStringifyData=false] Whether to JSON-stringify the value.
   */
  set(key: string, data: any, shouldStringifyData: boolean = false) {
    const value = shouldStringifyData
      ? safeJsonStringify(data)
      : (typeof data === "string" ? data : (data != null ? String(data) : null));

    /**
     * Using loose equality (`==`) intentionally:
     * - `value == null` matches both `null` and `undefined`
     * - We do not want to store either of those in LocalStorage
     */
    if (value == null) {
      return;
    }

    try {
      localStorage.setItem(key, value);
    }
    catch { }
  },

  /**
   * Retrieves a raw string value from LocalStorage.
   * @param {string} key Storage key.
   * @returns {string|null} Stored value or `null` if missing or inaccessible.
   */
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    }
    catch {
      return null;
    }
  },

  /**
   * Retrieves and parses JSON data from LocalStorage.
   * @template T
   * @param {string} key Storage key.
   * @returns {T|null} Parsed object or `null` if unavailable or invalid JSON.
   */
  getParsed<T = any>(key: string): T | null {
    let raw: string | null;

    try {
      raw = localStorage.getItem(key);
    }
    catch {
      return null;
    }

    return safeJsonParse<T>(raw);
  },

  /**
   * Removes a specific key from LocalStorage.
   * @param {string} key Storage key to remove.
   */
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    }
    catch { }
  }
};
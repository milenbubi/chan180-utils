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
    try {
      localStorage.setItem(key,
        shouldStringifyData ? JSON.stringify(data) : data);
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
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    catch {
      return null;
    }
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
import { safeJsonParse } from "./safeJsonParse";



/**
 * Internal flag used to ensure the LocalStorage helper
 * is initialized **only once** per application runtime.
 *
 * This enforces the **singleton pattern**, preventing accidental
 * re-initialization of the LocalStorage helper with different keys.
 *
 * ---
 * ⚠️ You should **not modify this variable manually**.
 * It is automatically managed inside `createSafeTypedLocalStorage()`.
 */
let initialized = false;



/**
 * Creates a **type-safe** and **fail-safe** LocalStorage helper.
 *
 * This function implements the **singleton pattern** —
 * it can be initialized only **once** per runtime.
 * Any subsequent calls will throw an error to prevent inconsistent state.
 *
 * ---
 * ### 💡 Key features
 * - ✅ **Type-safe** — keys are inferred directly from the provided list.
 * - 🛡️ **Runtime-safe** — wrapped in `try/catch` to handle Safari Private Mode,
 *   quota limits, or other `localStorage` access errors gracefully.
 * - 🚫 **Singleton-protected** — guarantees a single instance.
 * - ⚙️ **Convenient API** — `set`, `get`, `getParsed`, `remove`, `clearAll`.
 *
 * ---
 * ### Example usage
 * ```ts
 * // Initialization (only once, e.g. in index.ts)
 * export const LS = createSafeTypedLocalStorage(["theme", "user", "token"]);
 *
 * // Reuse anywhere else:
 * import { LS } from "../path/to/ls-instance";
 *
 * LS.set("theme", "dark");
 * const user = LS.getParsed<{ name: string }>("user");
 * ```
 *
 * ---
 * ### Notes
 * - Throws an error if called more than once (singleton enforcement).
 * - Autocomplete is available for all provided keys.
 * - TypeScript 5+ automatically infers literal key types — no need for `as const`.
 * - All operations are wrapped in `try/catch` — no runtime crashes.
 *
 * @template {string} K The list of allowed LocalStorage keys.
 * @param {readonly K[]} keys Array of valid LocalStorage key names.
 * @returns Helper instance exposing safe methods:
 * - `set(key, data, stringify?)`
 * - `get(key)`
 * - `getParsed<T>(key)`
 * - `remove(key)`
 * - `clearAll()`
 */
export function createSafeTypedLocalStorage<const K extends string>(keys: readonly K[]): {
  set: (key: K, data: any, shouldStringifyData?: boolean) => void;
  get: (key: K) => string | null;
  getParsed: <T = any>(key: K) => T | null;
  remove: (key: K) => void;
  clearAll: VoidFunction;
} {
  if (initialized) {
    throw new Error("[LS] LocalStorageHelper already initialized!");
  }

  initialized = true;

  type LocalStorageKeys = (typeof keys)[number];

  return {
    /**
     * Stores a value in LocalStorage.
     * @param {LocalStorageKeys} key Key name.
     * @param {any} data Value to store.
     * @param {boolean} [shouldStringifyData=false] Whether to JSON-stringify the value.
     */
    set(key: LocalStorageKeys, data: any, shouldStringifyData: boolean = false) {
      try {
        localStorage.setItem(
          key,
          shouldStringifyData ? JSON.stringify(data) : data
        );
      }
      catch { }
    },

    /**
     * Retrieves a raw string value from LocalStorage.
     * @param {LocalStorageKeys} key Key name.
     * @returns {string|null} Stored value or `null` if inaccessible.
     */
    get(key: LocalStorageKeys): string | null {
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
     * @param {LocalStorageKeys} key Key name.
     * @returns {T|null} Parsed object or `null` if unavailable or invalid JSON.
     */
    getParsed<T = any>(key: LocalStorageKeys): T | null {
      const data = localStorage.getItem(key);
      return safeJsonParse<T>(data);
    },

    /**
     * Removes a specific key from LocalStorage.
     * @param {LocalStorageKeys} key Key name to remove.
     */
    remove(key: LocalStorageKeys) {
      try {
        localStorage.removeItem(key);
      }
      catch { }
    },

    /**
     * Clears all keys defined in this helper.
     * (Does not affect other LocalStorage entries.)
     */
    clearAll() {
      try {
        keys.forEach(key => localStorage.removeItem(key));
      }
      catch { }
    }
  };
}
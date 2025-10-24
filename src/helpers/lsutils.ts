/**
 * Internal flag used to ensure the LocalStorage helper
 * is initialized **only once** per application runtime.
 *
 * This enforces the **singleton pattern**, preventing accidental
 * re-initialization of the LocalStorage helper with different keys.
 *
 * ---
 * ⚠️ You should **not modify this variable manually**.
 * It is automatically managed inside `createLocalStorageHelper()`.
 */
let initialized = false;



/**
 * Creates a type-safe, singleton-based LocalStorage helper.
 *
 * You should call this **only once** in your app (e.g. in a root file like `index.ts` or `App.tsx`).
 * After initialization, import and reuse the same instance everywhere else.
 *
 * ---
 * ### Example usage
 * ```ts
 * // App initialization (e.g. index.ts)
 * export const LS = createLocalStorageHelper(["theme", "user", "token"]);
 *
 * // Anywhere else in your project:
 * import { LS } from "../path/to/your/ls-instance";
 *
 * LS.set("theme", "dark");
 * const user = LS.getParsed<{ name: string }>("user");
 * ```
 * ---
 *
 * ### Notes
 * - The function **throws an error** if called more than once (singleton pattern).
 * - Autocomplete is available for all provided keys.
 * - You don’t need `as const` — TypeScript 5+ infers literal types automatically.
 *
 * @template {string} K The list of keys that will be available in LocalStorage.
 * @param {readonly K[]} keys - Array of allowed keys (string literals).
 * @returns {{
 *   set: (key: K, data: any, shouldStringifyData?: boolean) => void,
 *   get: (key: K) => string,
 *   getParsed: <T = any>(key: K) => T | null,
 *   remove: (key: K) => void
 * }} LocalStorage helper instance.
 */
export function createLocalStorageHelper<const K extends string>(keys: readonly K[]): {
  set: (key: K, data: any, shouldStringifyData?: boolean) => void;
  get: (key: K) => string;
  getParsed: <T = any>(key: K) => T | null;
  remove: (key: K) => void;
} {
  if (initialized) {
    throw new Error("[LS] LocalStorageHelper already initialized!");
  }

  initialized = true;

  type LocalStorageKeys = (typeof keys)[number];

  const set = (key: LocalStorageKeys, data: any, shouldStringifyData?: boolean) => {
    try {
      localStorage.setItem(
        key,
        shouldStringifyData ? JSON.stringify(data) : data
      );
    }
    catch { }
  };


  const get = (key: LocalStorageKeys) => {
    return localStorage.getItem(key) || "";
  };


  const getParsed = <T = any>(key: LocalStorageKeys): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    catch {
      return null;
    }
  };


  const remove = (key: LocalStorageKeys) => {
    localStorage.removeItem(key);
  };


  return { set, get, getParsed, remove };
}
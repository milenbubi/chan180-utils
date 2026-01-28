const _hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;


/**
 * Convert a HEX color code to an RGBA color string.
 *
 * @param {string} hex    HEX color code (e.g. "#ae951e" or "ae951e").
 * @param {number} [alpha=1]  Alpha value between 0 and 1 (default is 1).
 * @returns {string | null}   RGBA string (e.g. "rgba(174, 149, 30, 1)") or null if invalid.
 */
export function hexToRgba(hex: string, alpha: number = 1): string | null {
  const result = _hexRegex.exec(hex);

  if (!result) {
    return null;
  }

  if (alpha < 0 || alpha > 1) {
    alpha = 1;
  }

  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}


/* Deprecated colors */
const oldPastelColors = [
  "#0088fe",
  "#2fc4c6",
  "#ffa8bb",
  "#b040cc",
  "#feda2d",
  "#a6ade0",
  "#ea907a",
  "#faf0af",
  "#d4b5b0",
  "#e5cfe5",
  "#588da8",
  "#d8345f",
  "#679b9b",
  "#f1935c",
  "#a7e9af",
  "#1cb54e",
  "#00c49f",
  "#851372",
  "#ffee93",
  "#95b8d1",
  "#fb6f92",
  "#ffbb28",
  "#ff8042"
];


const pastelColors = [
  "#ff0000", // pure red, bold and aggressive
  "#ff4500", // orange red, fiery and dynamic
  "#ff7f00", // bright orange, energetic
  "#ff8c00", // dark orange, strong and warm
  "#ffd700", // gold, rich and royal
  "#ffff00", // yellow, sunny and vivid
  "#7fff00", // chartreuse, striking green
  "#32cd32", // lime green, vivid and fresh
  "#00ff00", // pure green, eye-catching
  "#00fa9a", // medium spring green, lively
  "#00ffff", // cyan, bright and clear
  "#00ced1", // dark turquoise, fresh and cool
  "#1e90ff", // dodger blue, sharp and vibrant
  "#0000ff", // pure blue, deep and strong
  "#8a2be2", // electric violet, mystical
  "#9400d3", // dark violet, rich and bold
  "#ff00ff", // magenta, bold and daring
  "#ff1493", // deep pink, punchy and lively
  "#ff69b4", // hot pink, fun and eye-catching
  "#db7093", // pale violet red, subtle yet vibrant
  "#dc143c", // crimson, intense and fiery
  "#ff6347", // tomato red, energetic
  "#ffa07a", // light salmon, soft but bright
  "#f0e68c", // khaki, warm and light
  "#ffd1dc", // light pink, soft and playful
  "#a6ade0", // pastel blue, calm and friendly
  "#b040cc", // medium purple, vivid
  "#2fc4c6", // teal, fresh and modern
  "#0088fe", // bright blue, striking
  "#fb6f92", // pinkish red, lively
  "#ffee93", // light yellow, sunny
  "#faf0af", // pale yellow, soft
  "#ea907a", // coral, warm and bold
  "#d4b5b0", // dusty rose, muted yet nice
  "#95b8d1", // light blue, calm
  "#1cb54e", // fresh green, punchy
  "#00c49f", // turquoise, modern and vivid
  "#851372", // deep purple, strong accent
  "#f1935c", // orange peach, warm
  "#a7e9af"  // mint green, fresh and soft
] as const;




// Generates a union 0..N (inclusive) using tuples only
type UpTo<N extends number, T extends number[] = []> =
  T["length"] extends N
  ? [...T, N][number]         // 0..N
  : UpTo<N, [...T, T["length"]]>;

// Valid range: 1..length (exclude 0)
type ValidCount = Exclude<UpTo<typeof pastelColors["length"]>, 0>;
// result: 1 | 2 | 3 | ... | N 


/**
 * Returns one or more unique random pastel colors.
 *
 * The number of colors to return is specified by `count`.
 * `count` must be between 1 and the total number of available colors (inclusive).
 *
 * @param count - Number of unique colors to return (1 ... 23).
 * @returns {C extends 1 ? string : string[]} A single color if `count` is 1, otherwise an array of colors.
 *
 * @example
 * getRandomPastelColors(1);
 * // => "#feda2d"
 *
 * getRandomPastelColors(3);
 * // => ["#ffa8bb", "#1CB54E", "#95b8d1"]
 */
export function getRandomPastelColors<C extends ValidCount>(
  count: C
): C extends 1 ? string : string[] {
  const colors = [...pastelColors];
  const result: string[] = [];

  for (let i = 0; i < count && colors.length > 0; i++) {
    const index = Math.floor(Math.random() * colors.length);
    result.push(colors.splice(index, 1)[0]);
  }

  // TypeScript’s type inference doesn’t perfectly handle this conditional return type,
  // so we manually cast it to ensure the return type matches (string | string[]).
  return (count === 1 ? result[0] : result) as C extends 1 ? string : string[];
}
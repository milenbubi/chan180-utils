import { getCryptoRandomInt, isNumeric } from "../numbers";


const pastelColors = [
  // Reds
  "#ff0000", // pure red, bold and aggressive
  "#dc143c", // crimson, intense and fiery
  "#ff4500", // orange red, fiery and dynamic
  "#ff6347", // tomato red, energetic

  // Oranges
  "#ff8c00", // dark orange, strong and warm
  "#ffbb28", // warm amber, bright and cheerful
  "#f1935c", // orange peach, warm
  "#ea907a", // coral, warm and bold
  "#ffa07a", // light salmon, soft but bright

  // Yellows
  "#ffd700", // gold, rich and royal
  "#ffff00", // yellow, sunny and vivid
  "#c7f000", // yellow-green, fresh transition from yellow to chartreuse
  "#ffee93", // light yellow, sunny
  "#faf0af", // pale yellow, soft
  "#f0e68c", // khaki, warm and light

  // Yellow-Greens / Greens
  "#7fff00", // chartreuse, striking green
  "#32cd32", // lime green, vivid and fresh
  "#00ff00", // pure green, eye-catching
  "#1cb54e", // fresh green, punchy
  "#a7e9af", // mint green, fresh and soft

  // Green → Cyan
  "#00fa9a", // medium spring green, lively
  "#00c49f", // turquoise, modern and vivid
  "#2fc4c6", // teal, fresh and modern
  "#00ffff", // cyan, bright and clear
  "#00ced1", // dark turquoise, fresh and cool

  // Blues
  "#0088fe", // bright blue, striking
  "#588da8", // muted blue, calm and versatile
  "#4f6d7a", // cool blue-gray, stable and balanced
  "#679b9b", // muted teal, calm and balanced
  "#95b8d1", // light blue, calm
  "#a6ade0", // pastel blue, calm and friendly
  "#0000ff", // pure blue, deep and strong

  // Purples
  "#8a2be2", // electric violet, mystical
  "#9400d3", // dark violet, rich and bold
  "#b040cc", // medium purple, vivid
  "#851372", // deep purple, strong accent

  // Pinks
  "#ff00ff", // magenta, bold and daring
  "#d8345f", // vivid pink-red, bold and energetic
  "#ff1493", // deep pink, punchy and lively
  "#ff69b4", // hot pink, fun and eye-catching
  "#fb6f92", // pinkish red, lively
  "#db7093", // pale violet red, subtle yet vibrant
  "#ffa8bb", // soft pink, playful and cheerful
  "#ffd1dc", // light pink, soft and playful
  "#d4b5b0", // dusty rose, muted yet nice
] as const;


const pastelColorsLength = pastelColors.length;

/**
 * Compile-time length of the `pastelColors` palette.
 *
 * This type represents the total number of available pastel colors
 * and is inferred directly from the palette definition.
 *
 * ⚠️ Note:
 * This is a **type-only alias**.
 * It does not exist at runtime and cannot be used as a value.
 *
 * If the `pastelColors` array changes, this type updates automatically.
 *
 * @example
 * // If pastelColors has 40 items:
 * type MaxColors = C180PastelColorsLength; // 40
 */
export type C180PastelColorsLength = typeof pastelColorsLength;


/**
 * Returns one or more **unique random pastel colors**.
 *
 * @param count - Number of colors to return (1 ... up to {@link C180PastelColorsLength}).
 * @returns {string[]} Array of unique pastel color hex codes.
 *
 * @example
 * getRandomPastelColors(1);
 * // => ["#ffd700"]
 *
 * getRandomPastelColors(3);
 * // => ["#ffa8bb", "#1CB54E", "#95b8d1"]
 */
export function getRandomPastelColors(count: number): string[] {
  if (!isNumeric(count)) {
    count = pastelColorsLength;
  }
  else {
    count = Math.min(Math.max(Math.floor(count), 1), pastelColorsLength);
  }

  const result: string[] = [];
  const used = new Set<number>();

  while (result.length < count) {
    const index = getCryptoRandomInt(0, pastelColorsLength - 1);
    if (!used.has(index)) {
      used.add(index);
      result.push(pastelColors[index]);
    }
  }
  return result;
}
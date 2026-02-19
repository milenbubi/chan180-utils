/**
 * A minimal 1x1 transparent PNG image in Base64 format.
 *
 * This constant can be used as a fallback image when the original image fails to load.
 * It's especially useful in React components, image placeholders, thumbnails, or anywhere
 * an <img> or <CardMedia> element requires a valid source to maintain layout stability.
 *
 * Example usage in React:
 * ```tsx
 * import { EMPTY_BASE64_IMAGE } from "your-library";
 *
 * <img
 *   src={imageUrl || EMPTY_BASE64_IMAGE}
 *   width={60}
 *   height={60}
 *   style={{ objectFit: "cover", borderRadius: "8px" }}
 *   onError={(e) => (e.currentTarget.src = EMPTY_BASE64_IMAGE)}
 * />
 * ```
 *
 * Notes:
 * - The image is 1x1 pixel and completely transparent.
 * - Using this ensures that layouts are not broken if an image fails to load.
 * - It's lightweight and does not affect performance.
 *
 * @constant {string}
 */
export const EMPTY_BASE64_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
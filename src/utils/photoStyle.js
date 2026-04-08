/**
 * Shared photo style helper.
 * Uses object-fit:cover + object-position for base framing,
 * and transform:scale + transform-origin for zoom.
 *
 * This approach:
 * - No layout reflow (all GPU compositing) → zero jitter
 * - object-position handles vertical panning at any zoom (portrait images)
 * - At zoom > 1, transform-origin synced with object-position enables
 *   both horizontal AND vertical control
 *
 * Container MUST have: overflow: hidden
 */
export function getPhotoStyle(photoCrop) {
  const c = photoCrop || { scale: 1.2, posX: 50, posY: 20 }
  const s = Math.max(1, c.scale)
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: `${c.posX}% ${c.posY}%`,
    transform: `scale(${s})`,
    transformOrigin: `${c.posX}% ${c.posY}%`,
  }
}

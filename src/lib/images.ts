import type { ImageMetadata } from 'astro';

/**
 * How many times wider than its frame an image is drawn when `object-fit: cover` crops it.
 * Landscape art in a portrait frame needs a proportionally larger file to stay sharp, so
 * `sizes` hints are multiplied by this factor.
 */
export const coverScale = (img: ImageMetadata, frameAspect: number): number =>
  Math.max(1, img.width / img.height / frameAspect);

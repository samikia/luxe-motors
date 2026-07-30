/**
 * Builds an optimized images.unsplash.com URL from a bare photo id.
 * Mock-data-only helper — real imagery will come from the Strapi media
 * library once the CMS phase lands, so nothing outside `src/data` should
 * depend on this.
 */
export function unsplash(photoId: string, width = 1200, quality = 80): string {
  return `https://images.unsplash.com/photo-${photoId}?q=${quality}&w=${width}&auto=format&fit=crop`;
}

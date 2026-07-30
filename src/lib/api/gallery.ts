import { galleryImages as mockGalleryImages } from "@/data/gallery.mock";
import type { GalleryCategory, GalleryImage } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getGalleryImages(category?: GalleryCategory): Promise<GalleryImage[]> {
  await simulateNetworkDelay();
  const items = category
    ? mockGalleryImages.filter((img) => img.category === category)
    : mockGalleryImages;
  return [...items].sort((a, b) => a.order - b.order);
}

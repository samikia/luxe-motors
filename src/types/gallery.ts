export type GalleryCategory = "showroom" | "lifestyle" | "event" | "car-detail";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: GalleryCategory;
  relatedCarSlug?: string;
  order: number;
}

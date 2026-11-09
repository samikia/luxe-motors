import type { GalleryCategory, GalleryImage } from "@/types";
import { strapiFind, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiGalleryImage {
  documentId: string;
  image: { url: string; alternativeText: string | null };
  alt: string;
  category: GalleryCategory;
  relatedCar: { slug: string } | null;
  order: number;
}

const GALLERY_POPULATE = "populate[image]=true&populate[relatedCar]=true";

function flattenStrapiGalleryImage(entity: StrapiGalleryImage): GalleryImage {
  return {
    id: entity.documentId,
    url: strapiMediaUrl(entity.image) ?? "",
    alt: entity.alt,
    category: entity.category,
    relatedCarSlug: entity.relatedCar?.slug,
    order: entity.order,
  };
}

export async function getGalleryImages(category?: GalleryCategory): Promise<GalleryImage[]> {
  const params = new URLSearchParams({ "sort[0]": "order:asc" });
  if (category) params.set("filters[category][$eq]", category);
  const json = await strapiFind<StrapiGalleryImage>(`/api/gallery-images?${GALLERY_POPULATE}&${params}`);
  return json.data.map(flattenStrapiGalleryImage);
}

import type { Testimonial } from "@/types";
import { strapiFind, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiTestimonial {
  documentId: string;
  authorName: string;
  authorTitle: string | null;
  avatar: { url: string } | null;
  quote: string;
  rating: Testimonial["rating"];
  isFeatured: boolean;
  relatedCar: { slug: string } | null;
}

const TESTIMONIAL_POPULATE = "populate[avatar]=true&populate[relatedCar]=true";

function flattenStrapiTestimonial(entity: StrapiTestimonial): Testimonial {
  return {
    id: entity.documentId,
    authorName: entity.authorName,
    authorTitle: entity.authorTitle ?? undefined,
    avatarUrl: strapiMediaUrl(entity.avatar),
    quote: entity.quote,
    rating: entity.rating,
    relatedCarSlug: entity.relatedCar?.slug,
    isFeatured: entity.isFeatured,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const json = await strapiFind<StrapiTestimonial>(`/api/testimonials?${TESTIMONIAL_POPULATE}`);
  return json.data.map(flattenStrapiTestimonial);
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const params = new URLSearchParams({
    "filters[isFeatured][$eq]": "true",
    "pagination[pageSize]": String(limit),
  });
  const json = await strapiFind<StrapiTestimonial>(`/api/testimonials?${TESTIMONIAL_POPULATE}&${params}`);
  return json.data.map(flattenStrapiTestimonial);
}

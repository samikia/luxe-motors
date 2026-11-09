import type { Category } from "@/types";
import { strapiFind } from "./shared/strapi-client";

interface StrapiCategory {
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

function flattenStrapiCategory(entity: StrapiCategory): Category {
  return {
    id: entity.documentId,
    slug: entity.slug,
    name: entity.name,
    description: entity.description ?? undefined,
  };
}

export async function getCategories(): Promise<Category[]> {
  const json = await strapiFind<StrapiCategory>("/api/categories");
  return json.data.map(flattenStrapiCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const params = new URLSearchParams({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  const json = await strapiFind<StrapiCategory>(`/api/categories?${params}`);
  return json.data[0] ? flattenStrapiCategory(json.data[0]) : null;
}

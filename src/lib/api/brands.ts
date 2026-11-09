import type { Brand } from "@/types";
import { getInventoryBrandSlugs } from "./cars";
import { strapiFind, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiBrand {
  documentId: string;
  BrandName: string;
  BrandImage: { url: string }[] | null;
  slug: string;
  description: string | null;
  logo: { url: string } | null;
  heroImage: { url: string } | null;
  isFeatured: boolean;
  order: number;
}

const BRAND_POPULATE = "populate[BrandImage]=true&populate[logo]=true&populate[heroImage]=true";

function flattenStrapiBrand(entity: StrapiBrand): Brand {
  return {
    id: entity.documentId,
    slug: entity.slug,
    name: entity.BrandName,
    logoUrl: strapiMediaUrl(entity.logo) ?? strapiMediaUrl(entity.BrandImage?.[0]) ?? "",
    description: entity.description ?? undefined,
    heroImageUrl: strapiMediaUrl(entity.heroImage),
    isFeatured: entity.isFeatured,
    order: entity.order,
  };
}

export async function getBrands(): Promise<Brand[]> {
  const params = new URLSearchParams({ "sort[0]": "order:asc" });
  const json = await strapiFind<StrapiBrand>(`/api/brands?${BRAND_POPULATE}&${params}`);
  return json.data.map(flattenStrapiBrand);
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const params = new URLSearchParams({
    "filters[isFeatured][$eq]": "true",
    "sort[0]": "order:asc",
  });
  const json = await strapiFind<StrapiBrand>(`/api/brands?${BRAND_POPULATE}&${params}`);
  return json.data.map(flattenStrapiBrand);
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const params = new URLSearchParams({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  const json = await strapiFind<StrapiBrand>(`/api/brands?${BRAND_POPULATE}&${params}`);
  return json.data[0] ? flattenStrapiBrand(json.data[0]) : null;
}

/** Brands that actually have at least one car in the current collection ("in exhibition"). */
export async function getExhibitionBrands(): Promise<Brand[]> {
  const [allBrands, inventoryBrandSlugs] = await Promise.all([
    getBrands(),
    getInventoryBrandSlugs(),
  ]);
  return allBrands.filter((brand) => inventoryBrandSlugs.has(brand.slug));
}

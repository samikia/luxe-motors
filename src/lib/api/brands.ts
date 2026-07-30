import { brands as mockBrands } from "@/data/brands.mock";
import type { Brand } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getBrands(): Promise<Brand[]> {
  await simulateNetworkDelay();
  return [...mockBrands].sort((a, b) => a.order - b.order);
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  await simulateNetworkDelay();
  return mockBrands.filter((b) => b.isFeatured).sort((a, b) => a.order - b.order);
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  await simulateNetworkDelay(200);
  return mockBrands.find((b) => b.slug === slug) ?? null;
}

import { categories as mockCategories } from "@/data/categories.mock";
import type { Category } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getCategories(): Promise<Category[]> {
  await simulateNetworkDelay();
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await simulateNetworkDelay(200);
  return mockCategories.find((c) => c.slug === slug) ?? null;
}

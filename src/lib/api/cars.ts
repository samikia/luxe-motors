import { cars as mockCars } from "@/data/cars.mock";
import type { Car, InventoryFilters, PaginatedResult } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";
import { paginate } from "./shared/paginate";
import { type StrapiFilterClause, toStrapiSearchParams } from "./shared/strapi-query";

/**
 * Builds the Strapi-equivalent filter clauses from our typed filters. Kept
 * separate from the in-memory filtering below so that, once a real Strapi
 * backend exists, this function is reused as-is to build the query string —
 * only the execution (in-memory vs. `fetch`) changes.
 */
function buildFilterClauses(filters: InventoryFilters): StrapiFilterClause[] {
  const clauses: StrapiFilterClause[] = [];

  if (filters.brandSlug) clauses.push({ field: "brand.slug", operator: "$eq", value: filters.brandSlug });
  if (filters.categorySlug) clauses.push({ field: "category.slug", operator: "$eq", value: filters.categorySlug });
  if (filters.yearMin) clauses.push({ field: "year", operator: "$gte", value: filters.yearMin });
  if (filters.yearMax) clauses.push({ field: "year", operator: "$lte", value: filters.yearMax });
  if (filters.priceMin) clauses.push({ field: "price", operator: "$gte", value: filters.priceMin });
  if (filters.priceMax) clauses.push({ field: "price", operator: "$lte", value: filters.priceMax });
  if (filters.bodyStyle) clauses.push({ field: "bodyStyle", operator: "$eq", value: filters.bodyStyle });
  if (filters.condition) clauses.push({ field: "condition", operator: "$eq", value: filters.condition });
  if (filters.query) clauses.push({ field: "model", operator: "$contains", value: filters.query });
  if (filters.fuelType) {
    clauses.push({
      field: "fuelType",
      operator: Array.isArray(filters.fuelType) ? "$in" : "$eq",
      value: filters.fuelType,
    });
  }

  return clauses;
}

function applyFiltersInMemory(items: Car[], filters: InventoryFilters): Car[] {
  let result = items;

  if (filters.brandSlug) result = result.filter((c) => c.brand.slug === filters.brandSlug);
  if (filters.categorySlug) result = result.filter((c) => c.category.slug === filters.categorySlug);
  if (filters.yearMin) result = result.filter((c) => c.year >= filters.yearMin!);
  if (filters.yearMax) result = result.filter((c) => c.year <= filters.yearMax!);
  if (filters.priceMin) result = result.filter((c) => c.price >= filters.priceMin!);
  if (filters.priceMax) result = result.filter((c) => c.price <= filters.priceMax!);
  if (filters.bodyStyle) result = result.filter((c) => c.bodyStyle === filters.bodyStyle);
  if (filters.condition) result = result.filter((c) => c.condition === filters.condition);
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) =>
        c.model.toLowerCase().includes(q) ||
        c.brand.name.toLowerCase().includes(q) ||
        (c.trim?.toLowerCase().includes(q) ?? false),
    );
  }
  if (filters.fuelType) {
    const wanted = Array.isArray(filters.fuelType) ? filters.fuelType : [filters.fuelType];
    result = result.filter((c) => wanted.includes(c.fuelType));
  }

  return result;
}

function applySort(items: Car[], sort: InventoryFilters["sort"]): Car[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "year-asc":
      return sorted.sort((a, b) => a.year - b.year);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
}

/**
 * MOCK IMPLEMENTATION. The future Strapi-backed version keeps this exact
 * signature and return shape; internally it will do:
 *
 *   const params = toStrapiSearchParams(buildFilterClauses(filters));
 *   params.set("pagination[page]", String(filters.page ?? 1));
 *   params.set("pagination[pageSize]", String(filters.pageSize ?? 12));
 *   const res = await fetch(`${STRAPI_URL}/api/cars?populate=*&${params}`);
 *   const json = await res.json();
 *   return { data: json.data.map(flattenStrapiCar), meta: mapStrapiMeta(json.meta) };
 */
export async function getCars(filters: InventoryFilters = {}): Promise<PaginatedResult<Car>> {
  await simulateNetworkDelay();

  // Computed (and discarded) to prove parity with the future Strapi query shape.
  toStrapiSearchParams(buildFilterClauses(filters));
  const filtered = applyFiltersInMemory(mockCars, filters);
  const sorted = applySort(filtered, filters.sort);

  return paginate(sorted, filters.page ?? 1, filters.pageSize ?? 12);
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  await simulateNetworkDelay(300);
  return mockCars.find((c) => c.slug === slug) ?? null;
}

export async function getRelatedCars(car: Car, limit = 3): Promise<Car[]> {
  await simulateNetworkDelay(300);
  return mockCars
    .filter((c) => c.id !== car.id && (c.brand.id === car.brand.id || c.category.id === car.category.id))
    .slice(0, limit);
}

export async function getFeaturedCars(limit = 6): Promise<Car[]> {
  await simulateNetworkDelay();
  return mockCars.filter((c) => c.isFeatured).slice(0, limit);
}

export async function getAllCarSlugs(): Promise<string[]> {
  await simulateNetworkDelay(100);
  return mockCars.map((c) => c.slug);
}

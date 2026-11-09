import type {
  Brand,
  Car,
  CarSpec,
  Category,
  InventoryFilters,
  InventorySortOption,
  PaginatedResult,
} from "@/types";
import { strapiFind, strapiMediaUrl, mapStrapiMeta } from "./shared/strapi-client";
import { type StrapiFilterClause, toStrapiSearchParams } from "./shared/strapi-query";

interface StrapiMediaFile {
  documentId: string;
  url: string;
  alternativeText: string | null;
}

/** Only the fields populated at this depth when embedded inside a car response. */
interface StrapiCarBrandRef {
  documentId: string;
  BrandName: string;
  slug: string;
}

interface StrapiCarCategoryRef {
  documentId: string;
  name: string;
  slug: string;
}

interface StrapiCarSpec {
  label: string;
  value: string;
  group: CarSpec["group"];
}

interface StrapiCar {
  documentId: string;
  model: string;
  trim: string | null;
  slug: string;
  year: number;
  price: number;
  currency: "USD";
  mileage: number;
  fuelType: Car["fuelType"];
  transmission: Car["transmission"];
  bodyStyle: Car["bodyStyle"];
  condition: Car["condition"];
  availability: Car["availability"];
  exteriorColor: string;
  interiorColor: string;
  horsepower: number;
  topSpeedMph: number;
  zeroToSixtySec: number;
  shortDescription: string;
  description: string;
  images: StrapiMediaFile[];
  specs: StrapiCarSpec[];
  isFeatured: boolean;
  vin: string | null;
  brand: StrapiCarBrandRef;
  category: StrapiCarCategoryRef;
  createdAt: string;
  updatedAt: string;
}

const CAR_POPULATE =
  "populate[brand]=true&populate[category]=true&populate[images]=true&populate[specs]=true";

function flattenStrapiBrandRef(entity: StrapiCarBrandRef): Brand {
  return {
    id: entity.documentId,
    slug: entity.slug,
    name: entity.BrandName,
    logoUrl: "",
    isFeatured: false,
    order: 0,
  };
}

function flattenStrapiCategoryRef(entity: StrapiCarCategoryRef): Category {
  return {
    id: entity.documentId,
    slug: entity.slug,
    name: entity.name,
  };
}

function flattenStrapiCar(entity: StrapiCar): Car {
  return {
    id: entity.documentId,
    slug: entity.slug,
    brand: flattenStrapiBrandRef(entity.brand),
    category: flattenStrapiCategoryRef(entity.category),
    model: entity.model,
    trim: entity.trim ?? undefined,
    year: entity.year,
    price: entity.price,
    currency: entity.currency,
    mileage: entity.mileage,
    fuelType: entity.fuelType,
    transmission: entity.transmission,
    bodyStyle: entity.bodyStyle,
    condition: entity.condition,
    availability: entity.availability,
    exteriorColor: entity.exteriorColor,
    interiorColor: entity.interiorColor,
    horsepower: entity.horsepower,
    topSpeedMph: entity.topSpeedMph,
    zeroToSixtySec: entity.zeroToSixtySec,
    shortDescription: entity.shortDescription,
    description: entity.description,
    images: entity.images.map((img, i) => ({
      id: img.documentId,
      url: strapiMediaUrl(img) ?? "",
      alt: img.alternativeText ?? `${entity.model} photo ${i + 1}`,
      isPrimary: i === 0,
      order: i,
    })),
    specs: entity.specs,
    isFeatured: entity.isFeatured,
    vin: entity.vin ?? undefined,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

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

function sortParam(sort: InventorySortOption | undefined): string {
  switch (sort) {
    case "price-asc":
      return "price:asc";
    case "price-desc":
      return "price:desc";
    case "year-desc":
      return "year:desc";
    case "year-asc":
      return "year:asc";
    case "mileage-asc":
      return "mileage:asc";
    case "newest":
    default:
      return "createdAt:desc";
  }
}

export async function getCars(filters: InventoryFilters = {}): Promise<PaginatedResult<Car>> {
  const params = toStrapiSearchParams(buildFilterClauses(filters));
  params.set("pagination[page]", String(filters.page ?? 1));
  params.set("pagination[pageSize]", String(filters.pageSize ?? 12));
  params.set("sort[0]", sortParam(filters.sort));

  const json = await strapiFind<StrapiCar>(`/api/cars?${CAR_POPULATE}&${params}`);
  return { data: json.data.map(flattenStrapiCar), meta: mapStrapiMeta(json.meta) };
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const params = new URLSearchParams({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  const json = await strapiFind<StrapiCar>(`/api/cars?${CAR_POPULATE}&${params}`);
  return json.data[0] ? flattenStrapiCar(json.data[0]) : null;
}

export async function getRelatedCars(car: Car, limit = 3): Promise<Car[]> {
  const params = new URLSearchParams({
    "filters[slug][$ne]": car.slug,
    "filters[$or][0][brand][slug][$eq]": car.brand.slug,
    "filters[$or][1][category][slug][$eq]": car.category.slug,
    "pagination[pageSize]": String(limit),
  });
  const json = await strapiFind<StrapiCar>(`/api/cars?${CAR_POPULATE}&${params}`);
  return json.data.map(flattenStrapiCar);
}

export async function getFeaturedCars(limit = 6): Promise<Car[]> {
  const params = new URLSearchParams({
    "filters[isFeatured][$eq]": "true",
    "pagination[pageSize]": String(limit),
  });
  const json = await strapiFind<StrapiCar>(`/api/cars?${CAR_POPULATE}&${params}`);
  return json.data.map(flattenStrapiCar);
}

export async function getAllCarSlugs(): Promise<string[]> {
  const params = new URLSearchParams({ "fields[0]": "slug", "pagination[pageSize]": "100" });
  const json = await strapiFind<{ slug: string }>(`/api/cars?${params}`);
  return json.data.map((c) => c.slug);
}

/** Slugs of every brand that has at least one car currently in the collection. */
export async function getInventoryBrandSlugs(): Promise<Set<string>> {
  const params = new URLSearchParams({
    "fields[0]": "id",
    "populate[brand][fields][0]": "slug",
    "pagination[pageSize]": "100",
  });
  const json = await strapiFind<{ brand: { slug: string } | null }>(`/api/cars?${params}`);
  const slugs = json.data.map((c) => c.brand?.slug).filter((s): s is string => Boolean(s));
  return new Set(slugs);
}

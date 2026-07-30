export type SortDirection = "asc" | "desc";

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type TransmissionType = "automatic" | "manual" | "dual-clutch" | "cvt";

export type BodyStyle =
  | "sedan"
  | "coupe"
  | "suv"
  | "convertible"
  | "hatchback"
  | "wagon";

export type CarCondition = "new" | "used" | "certified-pre-owned";

export type CarAvailability = "in-stock" | "reserved" | "sold" | "arriving-soon";

export type InventorySortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "mileage-asc";

export interface InventoryFilters {
  brandSlug?: string;
  categorySlug?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuelType?: FuelType | FuelType[];
  bodyStyle?: BodyStyle;
  condition?: CarCondition;
  query?: string;
  sort?: InventorySortOption;
  page?: number;
  pageSize?: number;
}

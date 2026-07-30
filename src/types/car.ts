import type { Brand } from "./brand";
import type { Category } from "./category";
import type {
  BodyStyle,
  CarAvailability,
  CarCondition,
  FuelType,
  TransmissionType,
} from "./common";

export interface CarImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface CarSpec {
  label: string;
  value: string;
  group: "performance" | "dimensions" | "interior" | "safety" | "efficiency";
}

export interface Car {
  id: string;
  slug: string;
  brand: Brand;
  category: Category;
  model: string;
  trim?: string;
  year: number;
  price: number;
  currency: "USD";
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyStyle: BodyStyle;
  condition: CarCondition;
  availability: CarAvailability;
  exteriorColor: string;
  interiorColor: string;
  horsepower: number;
  topSpeedMph: number;
  zeroToSixtySec: number;
  shortDescription: string;
  description: string;
  images: CarImage[];
  specs: CarSpec[];
  isFeatured: boolean;
  vin?: string;
  createdAt: string;
  updatedAt: string;
}

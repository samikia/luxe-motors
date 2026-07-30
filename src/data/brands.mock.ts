import type { Brand } from "@/types";
import { unsplash } from "./shared/unsplash";

export const brands: Brand[] = [
  {
    id: "brand-porsche",
    slug: "porsche",
    name: "Porsche",
    logoUrl: "/brands/porsche.svg",
    description:
      "Since 1948, Porsche has built sports cars that turn everyday drives into events.",
    heroImageUrl: unsplash("1614200187524-dc4b892acf16", 1920),
    isFeatured: true,
    order: 1,
  },
  {
    id: "brand-mercedes-benz",
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    logoUrl: "/brands/mercedes-benz.svg",
    description:
      "The inventor of the automobile, still defining what luxury motoring means.",
    heroImageUrl: unsplash("1503376780353-7e6692767b70", 1920),
    isFeatured: true,
    order: 2,
  },
  {
    id: "brand-bmw",
    slug: "bmw",
    name: "BMW",
    logoUrl: "/brands/bmw.svg",
    description: "The ultimate driving machine, engineered in Munich.",
    heroImageUrl: unsplash("1511919884226-fd3cad34687c", 1920),
    isFeatured: true,
    order: 3,
  },
  {
    id: "brand-rolls-royce",
    slug: "rolls-royce",
    name: "Rolls-Royce",
    logoUrl: "/brands/rolls-royce.svg",
    description:
      "Handcrafted in Goodwood, England — the pinnacle of automotive luxury.",
    heroImageUrl: unsplash("1605559424843-9e4c228bf1c2", 1920),
    isFeatured: true,
    order: 4,
  },
  {
    id: "brand-bentley",
    slug: "bentley",
    name: "Bentley",
    logoUrl: "/brands/bentley.svg",
    description: "British craftsmanship, extraordinary performance.",
    heroImageUrl: unsplash("1617654112368-307921291f42", 1920),
    isFeatured: true,
    order: 5,
  },
  {
    id: "brand-audi",
    slug: "audi",
    name: "Audi",
    logoUrl: "/brands/audi.svg",
    description: "Vorsprung durch Technik — progress through technology.",
    heroImageUrl: unsplash("1601362840469-51e4d8d58785", 1920),
    isFeatured: true,
    order: 6,
  },
];

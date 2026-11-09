import type { Hero } from "@/types";
import { strapiFindOne, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiMediaFile {
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface StrapiHero {
  heroText: string | null;
  heroTitle: string | null;
  heroImage: StrapiMediaFile | null;
}

const HERO_POPULATE = "populate[heroImage]=true";

export async function getHero(): Promise<Hero> {
  const json = await strapiFindOne<StrapiHero>(`/api/hero?${HERO_POPULATE}`);
  const entity = json.data;

  return {
    text: entity?.heroText ?? "",
    title: entity?.heroTitle ?? "",
    imageUrl: strapiMediaUrl(entity?.heroImage ?? undefined),
    imageAlt: entity?.heroImage?.alternativeText ?? entity?.heroText ?? undefined,
  };
}

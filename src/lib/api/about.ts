import type { AboutUs } from "@/types";
import { strapiFindOne, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiMediaFile {
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface StrapiAboutUs {
  AboutText: string | null;
  AboutImage: StrapiMediaFile[] | null;
}

const ABOUT_US_POPULATE = "populate[AboutImage]=true";

export async function getAboutUs(): Promise<AboutUs> {
  const json = await strapiFindOne<StrapiAboutUs>(`/api/about-us?${ABOUT_US_POPULATE}`);
  const entity = json.data;

  return {
    text: entity?.AboutText ?? "",
    images: (entity?.AboutImage ?? []).map((img, i) => ({
      id: img.documentId,
      url: strapiMediaUrl(img) ?? "",
      alt: img.alternativeText ?? `About TKRAN photo ${i + 1}`,
    })),
  };
}

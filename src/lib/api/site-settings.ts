import type { BusinessHours, ContactInfo, SiteSettings, SiteStat, SocialLink } from "@/types";
import { strapiFindOne, strapiMediaUrl } from "./shared/strapi-client";

interface StrapiAddress {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  mapEmbedUrl: string | null;
}

interface StrapiContactInfo {
  phone: string;
  email: string;
  whatsapp: string | null;
  address: StrapiAddress | null;
  hours: BusinessHours[];
  socials: SocialLink[];
}

interface StrapiSiteSetting {
  siteName: string;
  tagline: string;
  logo: { url: string } | null;
  favicon: { url: string } | null;
  defaultOgImage: { url: string } | null;
  contact: StrapiContactInfo;
  stats: SiteStat[];
}

const SITE_SETTING_POPULATE =
  "populate[logo]=true&populate[favicon]=true&populate[defaultOgImage]=true" +
  "&populate[contact][populate][address]=true" +
  "&populate[contact][populate][hours]=true" +
  "&populate[contact][populate][socials]=true" +
  "&populate[stats]=true";

function flattenStrapiContactInfo(entity: StrapiContactInfo): ContactInfo {
  return {
    phone: entity.phone,
    email: entity.email,
    whatsapp: entity.whatsapp ?? undefined,
    address: {
      line1: entity.address?.line1 ?? "",
      line2: entity.address?.line2 ?? undefined,
      city: entity.address?.city ?? "",
      state: entity.address?.state ?? "",
      zip: entity.address?.zip ?? "",
      country: entity.address?.country ?? "",
      mapEmbedUrl: entity.address?.mapEmbedUrl ?? undefined,
    },
    hours: entity.hours,
    socials: entity.socials,
  };
}

function flattenStrapiSiteSetting(entity: StrapiSiteSetting): SiteSettings {
  return {
    siteName: entity.siteName,
    tagline: entity.tagline,
    logoUrl: strapiMediaUrl(entity.logo) ?? "",
    faviconUrl: strapiMediaUrl(entity.favicon) ?? "",
    defaultOgImageUrl: strapiMediaUrl(entity.defaultOgImage) ?? "",
    contact: flattenStrapiContactInfo(entity.contact),
    stats: entity.stats,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const json = await strapiFindOne<StrapiSiteSetting>(`/api/site-setting?${SITE_SETTING_POPULATE}`);
  if (!json.data) throw new Error("Site settings have not been configured in Strapi yet.");
  return flattenStrapiSiteSetting(json.data);
}

export async function getContactInfo(): Promise<ContactInfo> {
  const settings = await getSiteSettings();
  return settings.contact;
}

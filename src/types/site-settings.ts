import type { ContactInfo } from "./contact";

export interface SiteStat {
  label: string;
  value: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  defaultOgImageUrl: string;
  contact: ContactInfo;
  stats: SiteStat[];
}

import { siteSettings as mockSiteSettings } from "@/data/site-settings.mock";
import type { ContactInfo, SiteSettings } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getSiteSettings(): Promise<SiteSettings> {
  await simulateNetworkDelay(200);
  return mockSiteSettings;
}

export async function getContactInfo(): Promise<ContactInfo> {
  await simulateNetworkDelay(200);
  return mockSiteSettings.contact;
}

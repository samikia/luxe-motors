import type { SiteSettings } from "@/types";
import { unsplash } from "./shared/unsplash";

export const siteSettings: SiteSettings = {
  siteName: "TKRAN",
  tagline: "Curated luxury and performance vehicles, delivered without compromise.",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  defaultOgImageUrl: unsplash("1503376780353-7e6692767b70", 1200),
  contact: {
    phone: "+1 (310) 555-0148",
    email: "concierge@tkran.example",
    whatsapp: "+13105550148",
    address: {
      line1: "8899 Beverly Boulevard",
      line2: "Suite 200",
      city: "Los Angeles",
      state: "CA",
      zip: "90048",
      country: "United States",
      mapEmbedUrl:
        "https://www.google.com/maps?q=8899+Beverly+Boulevard,+Los+Angeles,+CA+90048&output=embed",
    },
    hours: [
      { day: "Monday – Friday", open: "9:00 AM", close: "7:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
      { day: "Sunday", open: "By appointment", close: "" },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com/luxemotors" },
      { platform: "youtube", url: "https://youtube.com/@luxemotors" },
      { platform: "facebook", url: "https://facebook.com/luxemotors" },
    ],
  },
  stats: [
    { label: "Vehicles Delivered", value: "1,200+" },
    { label: "Years in Business", value: "18" },
    { label: "Average Rating", value: "4.9/5" },
    { label: "Nationwide Delivery", value: "48 States" },
  ],
};

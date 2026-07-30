export interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "youtube" | "tiktok" | "x";
  url: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    mapEmbedUrl?: string;
  };
  hours: BusinessHours[];
  socials: SocialLink[];
}

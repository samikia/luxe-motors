export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      inventory: "Inventory",
      brands: "Brands",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    cta: {
      reserve: "Reserve a Visit",
    },
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
    },
    lang: {
      toggle: "Switch language",
    },
    footer: {
      tagline: "Curated luxury and performance vehicles, delivered without compromise.",
      quickLinks: "Quick Links",
      connect: "Connect With Us",
      hours: "Business Hours",
      address: "Showroom",
      rights: "All rights reserved.",
    },
  },
  fa: {
    nav: {
      home: "خانه",
      inventory: "خودروها",
      brands: "برندها",
      testimonials: "نظرات مشتریان",
      contact: "تماس با ما",
    },
    cta: {
      reserve: "رزرو بازدید",
    },
    theme: {
      toggle: "تغییر پوسته",
      light: "روشن",
      dark: "تیره",
    },
    lang: {
      toggle: "تغییر زبان",
    },
    footer: {
      tagline: "خودروهای لوکس و پرفورمنس، منتخب و بدون هیچ مصالحه‌ای.",
      quickLinks: "دسترسی سریع",
      connect: "ارتباط با ما",
      hours: "ساعات کاری",
      address: "نمایشگاه",
      rights: "تمامی حقوق محفوظ است.",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)[Locale];

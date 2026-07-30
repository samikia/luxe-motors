import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { getCategories, getContactInfo } from "@/lib/api";
import { LanguageProvider } from "@/lib/i18n/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "TKRAN | نمایشگاه تکران خودرو",
  description: "Curated luxury and performance vehicles, delivered without compromise.",
};

// Runs before hydration so the stored locale's lang/dir apply without a flash.
const localeInitScript = `
try {
  var l = localStorage.getItem("tkran-locale");
  if (l === "fa") {
    document.documentElement.lang = "fa";
    document.documentElement.dir = "rtl";
  }
} catch (e) {}
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contact, categories] = await Promise.all([getContactInfo(), getCategories()]);

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <SiteHeader />
            {children}
            <SiteFooter contact={contact} categories={categories} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

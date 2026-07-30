"use client";

import { LanguagesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

export function LanguageToggle() {
  const { locale, toggleLocale, dict } = useLanguage();

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={dict.lang.toggle}
      title={dict.lang.toggle}
      onClick={toggleLocale}
    >
      <LanguagesIcon />
      {locale === "en" ? "FA" : "EN"}
    </Button>
  );
}

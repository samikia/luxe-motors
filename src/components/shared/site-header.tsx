"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { FallbackImage } from "@/components/shared/fallback-image";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

const navHrefs = ["/", "#inventory", "#brands", "#testimonials", "#contact"] as const;
const navKeys = ["home", "inventory", "brands", "testimonials", "contact"] as const;

export function SiteHeader() {
  const { dict } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = navKeys.map((key, i) => ({
    href: navHrefs[i],
    label: dict.nav[key],
  }));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        isHome
          ? "dark border-gold/15 bg-background"
          : "border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
      )}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-3 sm:px-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <FallbackImage
            src="/logo.png"
            alt="TKRAN"
            width={220}
            height={64}
            className="h-18 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors",
                isHome ? "hover:text-gold" : "hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1.5 sm:flex">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Button
            className={cn(
              "hidden sm:inline-flex",
              isHome && "bg-gold text-gold-foreground hover:bg-gold/90"
            )}
            nativeButton={false}
            render={<Link href="#contact" />}
          >
            {dict.cta.reserve}
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className={isHome ? "dark" : undefined}>
              <SheetHeader>
                <SheetTitle>TKRAN</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex items-center justify-between gap-2 border-t p-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CameraIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  Music2Icon,
  PhoneIcon,
  PlayIcon,
  UsersIcon,
} from "lucide-react";

import { FallbackImage } from "@/components/shared/fallback-image";
import type { Category, ContactInfo } from "@/types";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

// lucide-react dropped brand/logo icons — these are the closest generic stand-ins.
const socialIcons = {
  instagram: CameraIcon,
  facebook: UsersIcon,
  youtube: PlayIcon,
  tiktok: Music2Icon,
  x: MessageCircleIcon,
} as const;

export function SiteFooter({
  contact,
  categories,
}: {
  contact: ContactInfo;
  categories: Category[];
}) {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      id="contact"
      className={cn(
        "scroll-mt-24 border-t",
        isHome ? "dark border-gold/15 bg-background" : "border-border/60 bg-muted/30"
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-3 py-12 sm:px-4 lg:grid-cols-4 lg:px-6">
        <div className="flex flex-col gap-4">
          <FallbackImage
            src="/logo.png"
            alt="TKRAN"
            width={200}
            height={58}
            className="h-16 w-auto object-contain"
          />
          <p className="text-sm text-muted-foreground">{dict.footer.tagline}</p>
          <div className="flex items-center gap-2">
            {contact.socials.map((social) => {
              const Icon = socialIcons[social.platform];
              return (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    isHome && "hover:border-gold/40 hover:text-gold"
                  )}
                  aria-label={social.platform}
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{dict.footer.quickLinks}</h3>
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href="#inventory"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{dict.footer.connect}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 size-4 shrink-0" />
              <Link href={`tel:${contact.phone}`} dir="ltr" className="hover:text-foreground">
                {contact.phone}
              </Link>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 size-4 shrink-0" />
              <Link href={`mailto:${contact.email}`} dir="ltr" className="hover:text-foreground">
                {contact.email}
              </Link>
            </li>
            {contact.whatsapp && (
              <li className="flex items-start gap-2">
                <MessageCircleIcon className="mt-0.5 size-4 shrink-0" />
                <Link
                  href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-foreground"
                >
                  WhatsApp
                </Link>
              </li>
            )}
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" />
              <span dir="ltr" className="text-start">
                {contact.address.line1}
                {contact.address.line2 ? `, ${contact.address.line2}` : ""}, {contact.address.city},{" "}
                {contact.address.state} {contact.address.zip}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{dict.footer.hours}</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {contact.hours.map((hour) => (
              <li key={hour.day} className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 size-4 shrink-0" />
                <span>
                  {hour.day}
                  {hour.open ? ` — ${hour.open}${hour.close ? ` – ${hour.close}` : ""}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn("border-t", isHome ? "border-gold/15" : "border-border/60")}>
        <div className="mx-auto max-w-7xl px-3 py-4 text-center text-xs text-muted-foreground sm:px-4 lg:px-6">
          © {year} TKRAN. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}

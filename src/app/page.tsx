import Link from "next/link";
import {
  ArrowRightIcon,
  CarIcon,
  ClockIcon,
  GaugeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  WrenchIcon,
} from "lucide-react";

import { FallbackImage } from "@/components/shared/fallback-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getAboutUs,
  getContactInfo,
  getExhibitionBrands,
  getFeaturedCars,
  getFeaturedTestimonials,
  getHero,
  getSiteSettings,
} from "@/lib/api";
import type { CarAvailability } from "@/types";

function formatAvailability(availability: CarAvailability): string {
  return availability
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function Home() {
  const [featuredCars, brands, testimonials, siteSettings, contact, aboutUs, hero] =
    await Promise.all([
      getFeaturedCars(6),
      getExhibitionBrands(),
      getFeaturedTestimonials(3),
      getSiteSettings(),
      getContactInfo(),
      getAboutUs(),
      getHero(),
    ]);

  const heroCar = featuredCars[0];
  const heroCarImage =
    heroCar?.images.find((img) => img.isPrimary) ?? heroCar?.images[0];
  const heroBackgroundImage = hero.imageUrl
    ? { url: hero.imageUrl, alt: hero.imageAlt ?? hero.text }
    : heroCarImage;

  return (
    <div className="dark bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden border-b border-gold/15">
        {heroBackgroundImage && (
          <div className="absolute inset-0 -z-10">
            <FallbackImage
              src={heroBackgroundImage.url}
              alt={heroBackgroundImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/20" />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        <div className="mx-auto w-full max-w-7xl px-3 py-24 sm:px-4 lg:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              A Private, By-Appointment Exhibition
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
              {hero.text || (
                <>
                  The Ultimate
                  <br />
                  Driving Experience.
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {hero.title || siteSettings.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="#visit"
                className="text-sm font-semibold tracking-widest text-gold uppercase transition-colors hover:text-gold/80"
              >
                [ Request An Exclusive Tour ]
              </Link>
              <Button
                size="lg"
                className="bg-gold px-6 text-gold-foreground hover:bg-gold/90"
                nativeButton={false}
                render={<Link href="#inventory" />}
              >
                View The Collection
                <ArrowRightIcon />
              </Button>
            </div>

            <Separator className="mt-14 bg-gold/15" />
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {siteSettings.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-3 py-24 sm:px-4 lg:px-6"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <WrenchIcon className="size-5" />
              <h2 className="text-xl font-semibold tracking-wide uppercase">
                About TKRAN
              </h2>
            </div>
            <p className="mt-5 whitespace-pre-line text-muted-foreground">
              {aboutUs.text ||
                `TKRAN is a private, by-appointment exhibition gallery. ${siteSettings.tagline}`}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {aboutUs.images[0] && (
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-gold/15">
                <FallbackImage
                  src={aboutUs.images[0].url}
                  alt={aboutUs.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: ShieldCheckIcon, label: "Certified & Inspected" },
                { icon: GaugeIcon, label: "Performance Verified" },
                { icon: StarIcon, label: "Concierge Delivery" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-3 rounded-2xl border border-gold/15 p-5"
                >
                  <Icon className="size-6 text-gold" />
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section
        id="inventory"
        className="scroll-mt-24 border-t border-gold/15 bg-muted/10"
      >
        <div className="mx-auto max-w-7xl px-3 py-24 sm:px-4 lg:px-6">
          <div className="flex items-center gap-2 text-gold">
            <CarIcon className="size-5" />
            <h2 className="text-xl font-semibold tracking-wide uppercase">
              The Collection
            </h2>
          </div>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A rotating selection of our current inventory.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => {
              const image =
                car.images.find((img) => img.isPrimary) ?? car.images[0];
              return (
                <Card key={car.id} className="ring-gold/15">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <FallbackImage
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-3 right-3 border border-gold/30 bg-background/80 text-foreground backdrop-blur">
                      {formatAvailability(car.availability)}
                    </Badge>
                  </div>
                  <div className="px-(--card-spacing)">
                    <p className="font-heading font-semibold">
                      {car.year} {car.brand.name} {car.model} {car.trim ?? ""}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ${car.price.toLocaleString()} ·{" "}
                      {car.mileage.toLocaleString()} mi
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Full inventory available by private appointment.
            </p>
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 hover:text-gold"
              nativeButton={false}
              render={<Link href="#visit" />}
            >
              Schedule a Private Viewing
            </Button>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="scroll-mt-24 border-t border-gold/15">
        <div className="mx-auto max-w-7xl px-3 py-24 sm:px-4 lg:px-6">
          <h2 className="text-xl font-semibold tracking-wide text-gold uppercase">
            The Marques We Curate
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-gold/15 p-5"
              >
                <FallbackImage
                  src={brand.logoUrl}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
                <p className="text-center text-xs text-muted-foreground">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="scroll-mt-24 border-t border-gold/15 bg-muted/10"
      >
        <div className="mx-auto max-w-7xl px-3 py-24 sm:px-4 lg:px-6">
          <h2 className="text-xl font-semibold tracking-wide text-gold uppercase">
            What Our Clients Say
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.authorName}</p>
                {t.authorTitle && (
                  <p className="text-xs text-muted-foreground">
                    {t.authorTitle}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-24 border-t border-gold/15">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-3 py-24 sm:px-4 lg:grid-cols-2 lg:px-6">
          {contact.address.mapEmbedUrl && (
            <div className="min-h-80 overflow-hidden rounded-2xl border border-gold/20">
              <iframe
                src={contact.address.mapEmbedUrl}
                loading="lazy"
                title="Exhibition location"
                className="h-full min-h-80 w-full grayscale-40"
              />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-gold">
              <MapPinIcon className="size-5" />
              <h2 className="text-xl font-semibold tracking-wide uppercase">
                Visit The Exhibition
              </h2>
            </div>

            <p className="mt-5 text-muted-foreground">
              {contact.address.line1}
              {contact.address.line2 ? `, ${contact.address.line2}` : ""}
              <br />
              {contact.address.city}, {contact.address.state}{" "}
              {contact.address.zip}
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {contact.hours.map((hour) => (
                <li key={hour.day} className="flex items-start gap-2">
                  <ClockIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    {hour.day}
                    {hour.open
                      ? ` — ${hour.open}${hour.close ? ` – ${hour.close}` : ""}`
                      : ""}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={`tel:${contact.phone}`}
              dir="ltr"
              className="mt-6 flex w-fit items-center gap-2 text-2xl font-bold text-gold hover:text-gold/80"
            >
              <PhoneIcon className="size-5" />
              {contact.phone}
            </Link>

            <Button
              size="lg"
              className="mt-6 bg-gold px-6 text-gold-foreground hover:bg-gold/90"
              nativeButton={false}
              render={<Link href={`tel:${contact.phone}`} />}
            >
              Call To Reserve
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

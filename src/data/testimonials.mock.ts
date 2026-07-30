import type { Testimonial } from "@/types";
import { unsplash } from "./shared/unsplash";

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    authorName: "Evelyn Marsh",
    authorTitle: "Verified Buyer — Rolls-Royce Phantom",
    avatarUrl: unsplash("1534528741775-53994a69daeb", 200),
    quote:
      "From the first call to delivery, the entire process felt as considered as the car itself. No pressure, no games — just genuine expertise.",
    rating: 5,
    relatedCarSlug: "rolls-royce-phantom-2025",
    isFeatured: true,
  },
  {
    id: "testimonial-2",
    authorName: "Marcus Ade",
    authorTitle: "Verified Buyer — Porsche 911 Turbo S",
    avatarUrl: unsplash("1472099645785-5658abf4ff4e", 200),
    quote:
      "I've bought performance cars from three other dealers before. This was the only one that let the car sell itself instead of the salesperson.",
    rating: 5,
    relatedCarSlug: "porsche-911-turbo-s-2025",
    isFeatured: true,
  },
  {
    id: "testimonial-3",
    authorName: "Priya Nandan",
    authorTitle: "Verified Buyer — Bentley Continental GT",
    avatarUrl: unsplash("1544005313-94ddf0286df2", 200),
    quote:
      "The reservation process was seamless online, and the car was exactly as described down to every stitch. Concierge delivery was a genuinely five-star touch.",
    rating: 5,
    relatedCarSlug: "bentley-continental-gt-2024",
    isFeatured: true,
  },
  {
    id: "testimonial-4",
    authorName: "Daniel Cho",
    authorTitle: "Verified Buyer — BMW M8 Competition",
    avatarUrl: unsplash("1507003211169-0a1dd7228f2d", 200),
    quote:
      "Transparent pricing, no hidden fees, and they handled my trade-in valuation fairly. Exactly what a luxury car purchase should feel like.",
    rating: 5,
    relatedCarSlug: "bmw-m8-competition-2024",
    isFeatured: false,
  },
  {
    id: "testimonial-5",
    authorName: "Isabelle Duarte",
    authorTitle: "Verified Buyer — Mercedes-AMG GT 63",
    avatarUrl: unsplash("1500648767791-00dcc994a43e", 200),
    quote:
      "Every question I had was answered same-day, including a full inspection report before I even flew in to see the car in person.",
    rating: 5,
    relatedCarSlug: "mercedes-amg-gt63-2024",
    isFeatured: false,
  },
  {
    id: "testimonial-6",
    authorName: "Thomas Reyes",
    authorTitle: "Verified Buyer — Audi RS Q8",
    avatarUrl: unsplash("1438761681033-6461ffad8d80", 200),
    quote:
      "This is the dealership experience every luxury buyer deserves and almost never gets. Effortless from start to finish.",
    rating: 4,
    relatedCarSlug: "audi-rsq8-2024",
    isFeatured: false,
  },
];

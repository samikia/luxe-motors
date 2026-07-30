import { testimonials as mockTestimonials } from "@/data/testimonials.mock";
import type { Testimonial } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getTestimonials(): Promise<Testimonial[]> {
  await simulateNetworkDelay();
  return mockTestimonials;
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  await simulateNetworkDelay();
  return mockTestimonials.filter((t) => t.isFeatured).slice(0, limit);
}

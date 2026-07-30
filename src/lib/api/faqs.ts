import { faqs as mockFaqs } from "@/data/faqs.mock";
import type { FAQ, FAQCategory } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

export async function getFAQs(category?: FAQCategory): Promise<FAQ[]> {
  await simulateNetworkDelay();
  const items = category ? mockFaqs.filter((f) => f.category === category) : mockFaqs;
  return [...items].sort((a, b) => a.order - b.order);
}

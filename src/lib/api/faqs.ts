import type { FAQ, FAQCategory } from "@/types";
import { strapiFind } from "./shared/strapi-client";

interface StrapiFAQ {
  documentId: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

function flattenStrapiFAQ(entity: StrapiFAQ): FAQ {
  return {
    id: entity.documentId,
    question: entity.question,
    answer: entity.answer,
    category: entity.category,
    order: entity.order,
  };
}

export async function getFAQs(category?: FAQCategory): Promise<FAQ[]> {
  const params = new URLSearchParams({ "sort[0]": "order:asc" });
  if (category) params.set("filters[category][$eq]", category);
  const json = await strapiFind<StrapiFAQ>(`/api/faqs?${params}`);
  return json.data.map(flattenStrapiFAQ);
}

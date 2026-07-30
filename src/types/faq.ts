export type FAQCategory = "general" | "financing" | "reservation" | "service";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

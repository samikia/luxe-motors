export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  description?: string;
  heroImageUrl?: string;
  isFeatured: boolean;
  order: number;
}

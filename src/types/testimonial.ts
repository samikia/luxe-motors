export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string;
  avatarUrl?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relatedCarSlug?: string;
  isFeatured: boolean;
}

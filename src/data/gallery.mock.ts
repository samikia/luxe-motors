import type { GalleryImage } from "@/types";
import { unsplash } from "./shared/unsplash";

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    url: unsplash("1631295868223-63265b40d9e4", 1600),
    alt: "Luxe Motors showroom floor at dusk",
    category: "showroom",
    order: 1,
  },
  {
    id: "gallery-2",
    url: unsplash("1580414057403-c5f451f30e1c", 1600),
    alt: "Rows of luxury cars inside the showroom",
    category: "showroom",
    order: 2,
  },
  {
    id: "gallery-3",
    url: unsplash("1552519507-da3b142c6e3d", 1600),
    alt: "Hand-stitched leather interior detail",
    category: "car-detail",
    order: 3,
  },
  {
    id: "gallery-4",
    url: unsplash("1493238792000-8113da705763", 1600),
    alt: "Close-up of a sport steering wheel",
    category: "car-detail",
    order: 4,
    relatedCarSlug: "porsche-911-turbo-s-2025",
  },
  {
    id: "gallery-5",
    url: unsplash("1571607388263-1044f9ea01dd", 1600),
    alt: "Detail shot of a forged alloy wheel",
    category: "car-detail",
    order: 5,
  },
  {
    id: "gallery-6",
    url: unsplash("1494972308805-463bc619d34e", 1600),
    alt: "Coastal road at golden hour",
    category: "lifestyle",
    order: 6,
  },
  {
    id: "gallery-7",
    url: unsplash("1553440569-bcc63803a83d", 1600),
    alt: "Client vehicle delivery on the open road",
    category: "lifestyle",
    order: 7,
  },
  {
    id: "gallery-8",
    url: unsplash("1542282088-fe8426682b8f", 1600),
    alt: "Detailing technician finishing a paint correction",
    category: "event",
    order: 8,
  },
  {
    id: "gallery-9",
    url: unsplash("1617531653332-bd46c24f2068", 1600),
    alt: "Guests at a private Luxe Motors collector preview",
    category: "event",
    order: 9,
  },
];

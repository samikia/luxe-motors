export interface AboutImage {
  id: string;
  url: string;
  alt: string;
}

export interface AboutUs {
  text: string;
  images: AboutImage[];
}

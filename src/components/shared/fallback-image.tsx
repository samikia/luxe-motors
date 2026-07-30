"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_SRC = "/images/placeholder.svg";

/**
 * Wraps next/image with an onError fallback. Hotlinked mock imagery (and,
 * later, Strapi media) can occasionally 404 or fail upstream — this keeps
 * that from ever surfacing as a broken-image icon in the UI.
 */
export function FallbackImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      src={failed ? FALLBACK_SRC : src}
      onError={() => setFailed(true)}
    />
  );
}

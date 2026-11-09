import type { PaginationMeta } from "@/types";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export class StrapiRequestError extends Error {
  constructor(
    public status: number,
    public path: string,
    public body: unknown,
  ) {
    super(`Strapi request to ${path} failed with ${status}`);
  }
}

export interface StrapiPaginationMeta {
  pagination: PaginationMeta;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiPaginationMeta;
}

interface StrapiSingleResponse<T> {
  data: T | null;
}

async function strapiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers: {
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new StrapiRequestError(res.status, path, body);
  }

  return res.json();
}

export function strapiFind<T>(path: string): Promise<StrapiListResponse<T>> {
  return strapiFetch(path);
}

export function strapiFindOne<T>(path: string): Promise<StrapiSingleResponse<T>> {
  return strapiFetch(path);
}

export function strapiCreate<T>(path: string, data: unknown): Promise<StrapiSingleResponse<T>> {
  return strapiFetch(path, { method: "POST", body: JSON.stringify({ data }) });
}

export function mapStrapiMeta(meta: StrapiPaginationMeta): PaginationMeta {
  return meta.pagination;
}

/** Prefixes relative media URLs (local upload provider returns `/uploads/...`) with the Strapi origin. */
export function strapiMediaUrl(file: { url: string } | null | undefined): string | undefined {
  if (!file?.url) return undefined;
  return file.url.startsWith("http") ? file.url : `${STRAPI_URL}${file.url}`;
}

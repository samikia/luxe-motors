import type { PaginatedResult } from "@/types";

export function paginate<T>(items: T[], page = 1, pageSize = 12): PaginatedResult<T> {
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return {
    data,
    meta: {
      page,
      pageSize,
      pageCount: Math.max(1, Math.ceil(items.length / pageSize)),
      total: items.length,
    },
  };
}

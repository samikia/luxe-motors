export type StrapiOperator =
  | "$eq"
  | "$ne"
  | "$gt"
  | "$gte"
  | "$lt"
  | "$lte"
  | "$in"
  | "$contains";

export interface StrapiFilterClause {
  field: string;
  operator: StrapiOperator;
  value: string | number | (string | number)[];
}

/**
 * Converts internal filter clauses into Strapi's
 * `filters[field][$operator]=value` query-string shape.
 *
 * Not called against a real API yet, but every `lib/api/*` function that
 * accepts filters builds its clauses through this helper today, so the
 * future Strapi-backed version only has to swap in-memory filtering for
 * `fetch(`${STRAPI_URL}/api/cars?${toStrapiSearchParams(clauses)}`)`.
 */
export function toStrapiSearchParams(clauses: StrapiFilterClause[]): URLSearchParams {
  const params = new URLSearchParams();
  for (const { field, operator, value } of clauses) {
    const key = `filters[${field}][${operator}]`;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }
  return params;
}

/**
 * BTC 15m up/down market: slug and token IDs from Gamma API.
 * Slug = btc-updown-15m-{timestamp}; Gamma for token IDs.
 */
const GAMMA_API_BASE = "https://gamma-api.polymarket.com";

/** Slug for current 15m window (e.g. btc-updown-15m-1738641600). */
export function slugForCurrent15m(market: string = "btc"): string {
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMilliseconds(0);
  const m = d.getMinutes();
  const slotMin = Math.floor(m / 15) * 15;
  d.setMinutes(slotMin, 0, 0);
  const timestamp = Math.floor(d.getTime() / 1000);
  return `${market}-updown-15m-${timestamp}`;
}

function parseJsonArray<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

export interface TokenIds {
  upTokenId: string;
  downTokenId: string;
  conditionId: string;
}

/** Fetch Up/Down token IDs and conditionId for a slug from Gamma API. */
export async function getTokenIdsForSlug(slug: string): Promise<TokenIds> {
  const url = `${GAMMA_API_BASE}/markets/slug/${slug}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Gamma API ${res.status} ${res.statusText} for slug=${slug}`);
  }
  const data = (await res.json()) as {
    outcomes?: unknown;
    clobTokenIds?: unknown;
    conditionId?: string;
  };
  const outcomes = parseJsonArray<string>(data.outcomes);
  const tokenIds = parseJsonArray<string>(data.clobTokenIds);
  const conditionId = typeof data.conditionId === "string" ? data.conditionId : "";
  const upIdx = outcomes.indexOf("Up");
  const downIdx = outcomes.indexOf("Down");
  if (upIdx < 0 || downIdx < 0) {
    throw new Error(
      `Missing Up/Down outcomes for slug=${slug} (outcomes: ${JSON.stringify(outcomes)})`
    );
  }
  if (!tokenIds[upIdx] || !tokenIds[downIdx]) {
    throw new Error(`Missing token ids for slug=${slug}`);
  }
  return {
    upTokenId: tokenIds[upIdx],
    downTokenId: tokenIds[downIdx],
    conditionId,
  };
}

let tokenIdsCache: ({ slug: string } & TokenIds) | null = null;

export async function getTokenIdsForSlugCached(slug: string): Promise<TokenIds> {
  const c = tokenIdsCache;
  if (c && c.slug === slug) {
    return { upTokenId: c.upTokenId, downTokenId: c.downTokenId, conditionId: c.conditionId };
  }
  const fresh = await getTokenIdsForSlug(slug);
  tokenIdsCache = { slug, ...fresh };
  return fresh;
}

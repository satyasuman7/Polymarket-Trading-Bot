/**
 * Polymarket API client - slug-based, getCurrentOrNextEvent for auto market switch.
 */

const GAMMA_EVENTS_URL = "https://gamma-api.polymarket.com/events";
const CLOB_BOOK_URL = "https://clob.polymarket.com/book";
const CLOB_MIDPOINTS_URL = "https://clob.polymarket.com/midpoints";

import type { GammaEvent, MarketInfo } from "../types";

export interface OrderBook {
  bids: Array<{ price: string; size: string }>;
  asks: Array<{ price: string; size: string }>;
}

export class PolymarketClient {
  /**
   * Get current or next market from slug prefix and window seconds.
   * When current market ends, returns next window so we auto-switch.
   */
  async getCurrentOrNextEvent(slugPrefix: string, windowSeconds: number): Promise<{
    event: GammaEvent;
    slug: string;
    windowTs: number;
  } | null> {
    if (!slugPrefix?.trim()) return null;

    const now = Math.floor(Date.now() / 1000);
    const currentWindowTs = Math.floor(now / windowSeconds) * windowSeconds;

    for (let offset = 0; offset < 2; offset++) {
      const windowTs = currentWindowTs + offset * windowSeconds;
      const slug = `${slugPrefix.trim()}-${windowTs}`;
      const event = await this.getEventBySlug(slug);
      if (!event) continue;

      const marketInfo = this.getMarketInfoFromEvent(event);
      if (!marketInfo?.upTokenId || !marketInfo?.downTokenId) continue;

      return { event, slug, windowTs };
    }
    return null;
  }

  async getEventBySlug(slug: string): Promise<GammaEvent | null> {
    try {
      const pathRes = await fetch(
        `${GAMMA_EVENTS_URL}/slug/${encodeURIComponent(slug)}`,
        { headers: { Accept: "application/json", "User-Agent": "PolymarketWinBot/1.0" } }
      );
      if (pathRes.ok) {
        const data = (await pathRes.json()) as unknown;
        if (data && typeof data === "object" && (data as GammaEvent).slug != null)
          return data as GammaEvent;
      }
      const queryRes = await fetch(
        `${GAMMA_EVENTS_URL}?slug=${encodeURIComponent(slug)}`,
        { headers: { Accept: "application/json", "User-Agent": "PolymarketWinBot/1.0" } }
      );
      if (!queryRes.ok) return null;
      const data = await queryRes.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch {
      return null;
    }
  }

  getMarketInfoFromEvent(event: GammaEvent): MarketInfo | null {
    const markets = event.markets || [];
    if (markets.length === 0 || !markets[0].conditionId) return null;

    const m = markets[0];
    const conditionId = m.conditionId!;
    const startTime = m.eventStartTime
      ? Math.floor(new Date(m.eventStartTime).getTime() / 1000)
      : m.startDate
        ? Math.floor(new Date(m.startDate).getTime() / 1000)
        : event.startDate
          ? Math.floor(new Date(event.startDate).getTime() / 1000)
          : Math.floor(Date.now() / 1000);

    let endTime = startTime + 24 * 60 * 60;
    if (m.endDate && typeof m.endDate === "string") {
      endTime = Math.floor(new Date(m.endDate).getTime() / 1000);
    }
    const now = Math.floor(Date.now() / 1000);

    let upTokenId: string | null = null;
    let downTokenId: string | null = null;
    const clobTokenIds = (m as { clobTokenIds?: string | string[] }).clobTokenIds;
    if (clobTokenIds) {
      const ids = typeof clobTokenIds === "string"
        ? (() => {
            try {
              return JSON.parse(clobTokenIds) as string[];
            } catch {
              return clobTokenIds.split(",").map((s: string) => s.trim());
            }
          })()
        : clobTokenIds.map((x) => String(x));
      upTokenId = ids[0] || null;
      downTokenId = ids[1] || null;
    }

    return {
      conditionId,
      eventSlug: event.slug || "",
      startTime,
      endTime,
      isActive: now < endTime,
      upTokenId,
      downTokenId,
    };
  }

  async getOrderBook(tokenId: string): Promise<OrderBook | null> {
    try {
      const url = `${CLOB_BOOK_URL}?token_id=${encodeURIComponent(tokenId)}`;
      const res = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": "PolymarketWinBot/1.0" },
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { bids?: unknown[]; asks?: unknown[]; error?: string };
      if (data.error) return null;
      return {
        bids: (data.bids || []) as Array<{ price: string; size: string }>,
        asks: (data.asks || []) as Array<{ price: string; size: string }>,
      };
    } catch {
      return null;
    }
  }
}

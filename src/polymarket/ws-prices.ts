/**
 * Polymarket CLOB WebSocket market channel: subscribe to token IDs,
 * track best_ask per asset, and invoke callback on book / best_bid_ask.
 */
import WebSocket from "ws";
import {
  WS_MARKET_URL,
  PING_INTERVAL_MS,
} from "../config.js";

export interface BestAskUpdate {
  assetId: string;
  bestAsk: number;
  bestBid: number;
  eventType: "book" | "best_bid_ask" | "price_change";
}

function parsePrice(s: string | undefined): number {
  if (s == null || s === "") return NaN;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
}

/** From book.asks (array of { price, size }) get best (lowest) ask. */
function bestAskFromBook(asks: Array<{ price?: string; size?: string }> | undefined): number {
  if (!Array.isArray(asks) || asks.length === 0) return NaN;
  let best = Infinity;
  for (const level of asks) {
    const p = parsePrice(level.price);
    if (Number.isFinite(p) && p < best) best = p;
  }
  return best === Infinity ? NaN : best;
}

function bestBidFromBook(bids: Array<{ price?: string; size?: string }> | undefined): number {
  if (!Array.isArray(bids) || bids.length === 0) return NaN;
  let best = -Infinity;
  for (const level of bids) {
    const p = parsePrice(level.price);
    if (Number.isFinite(p) && p > best) best = p;
  }
  return best === -Infinity ? NaN : best;
}

export interface MarketWsClientOptions {
  assetIds: string[];
  onBestAsk: (update: BestAskUpdate) => void;
  onError?: (err: Error) => void;
  onClose?: () => void;
}

/**
 * Connect to Polymarket market WebSocket, subscribe to assets_ids,
 * enable best_bid_ask. On book / best_bid_ask / price_change, compute
 * best ask and call onBestAsk.
 */
export function createMarketWsClient(options: MarketWsClientOptions): {
  connect: () => void;
  close: () => void;
} {
  const { assetIds, onBestAsk, onError, onClose } = options;
  let ws: WebSocket | null = null;
  let pingTimer: ReturnType<typeof setInterval> | null = null;

  function stopPing(): void {
    if (pingTimer != null) {
      clearInterval(pingTimer);
      pingTimer = null;
    }
  }

  function connect(): void {
    if (ws != null) return;
    const url = WS_MARKET_URL;
    ws = new WebSocket(url);

    ws.on("open", () => {
      const sub = {
        assets_ids: assetIds,
        type: "market",
        custom_feature_enabled: true,
      };
      ws!.send(JSON.stringify(sub));
      pingTimer = setInterval(() => {
        if (ws?.readyState === WebSocket.OPEN) ws.send("PING");
      }, PING_INTERVAL_MS);
    });

    ws.on("message", (data: WebSocket.RawData) => {
      const raw = typeof data === "string" ? data : data.toString("utf8");
      if (raw === "PONG") return;
      try {
        const msg = JSON.parse(raw) as {
          event_type?: string;
          asset_id?: string;
          best_ask?: string;
          best_bid?: string;
          asks?: Array<{ price?: string; size?: string }>;
          bids?: Array<{ price?: string; size?: string }>;
          price_changes?: Array<{
            asset_id?: string;
            best_ask?: string;
            best_bid?: string;
          }>;
        };
        const eventType = msg.event_type;

        if (eventType === "book" && msg.asset_id) {
          const bestAsk = bestAskFromBook(msg.asks);
          const bestBid = bestBidFromBook(msg.bids);
          if (Number.isFinite(bestAsk)) {
            onBestAsk({
              assetId: msg.asset_id,
              bestAsk,
              bestBid: Number.isFinite(bestBid) ? bestBid : 0,
              eventType: "book",
            });
          }
          return;
        }

        if (eventType === "best_bid_ask" && msg.asset_id) {
          const bestAsk = parsePrice(msg.best_ask);
          const bestBid = parsePrice(msg.best_bid);
          if (Number.isFinite(bestAsk)) {
            onBestAsk({
              assetId: msg.asset_id,
              bestAsk,
              bestBid: Number.isFinite(bestBid) ? bestBid : 0,
              eventType: "best_bid_ask",
            });
          }
          return;
        }

        if (eventType === "price_change" && Array.isArray(msg.price_changes)) {
          for (const pc of msg.price_changes) {
            const assetId = pc.asset_id;
            const bestAsk = parsePrice(pc.best_ask);
            const bestBid = parsePrice(pc.best_bid);
            if (assetId && Number.isFinite(bestAsk)) {
              onBestAsk({
                assetId,
                bestAsk,
                bestBid: Number.isFinite(bestBid) ? bestBid : 0,
                eventType: "price_change",
              });
            }
          }
        }
      } catch {
        // ignore parse errors
      }
    });

    ws.on("error", (err: Error) => {
      onError?.(err);
    });

    ws.on("close", () => {
      stopPing();
      ws = null;
      onClose?.();
    });
  }

  function close(): void {
    stopPing();
    if (ws != null) {
      ws.close();
      ws = null;
    }
  }

  return { connect, close };
}

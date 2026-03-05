/**
 * Realtime market price via WebSocket (best bid/ask). Used for market order price and triggers.
 */

import WebSocket from "ws";
import { logger, shortId } from "../logger";

const WS_URL = process.env.REALTIME_PRICE_WS_URL || "wss://ws-subscriptions-clob.polymarket.com/ws/market";
const PING_MS = parseInt(process.env.WS_PING_MS || "8000", 10);
const PONG_TIMEOUT_MS = parseInt(process.env.WS_PONG_TIMEOUT_MS || "12000", 10);
const RECONNECT_INITIAL_MS = parseInt(process.env.WS_RECONNECT_INITIAL_MS || "5000", 10);
const RECONNECT_MAX_MS = parseInt(process.env.WS_RECONNECT_MAX_MS || "30000", 10);
const PONG_CHECK_MS = parseInt(process.env.WS_PONG_CHECK_MS || "5000", 10);
const STALE_MS = 30_000;

interface TokenQuote {
  bestBid: number;
  bestAsk: number;
  mid: number;
  ts: number;
}

export type OnPriceUpdateCallback = (
  upTokenId: string,
  downTokenId: string,
  upPrice: number,
  downPrice: number
) => void;

export class RealtimePriceService {
  private ws: InstanceType<typeof WebSocket> | null = null;
  private tokenIds: string[] = [];
  private upTokenId: string | null = null;
  private downTokenId: string | null = null;
  private currentConditionId: string | null = null;
  private cache = new Map<string, TokenQuote>();
  private lastPong = 0;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private pongTimer: ReturnType<typeof setInterval> | null = null;
  private resolveReady: (() => void) | null = null;
  private ready = new Promise<void>((r) => {
    this.resolveReady = r;
  });
  private isShutdown = false;
  private reconnectTimerId: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private onPriceUpdate: OnPriceUpdateCallback | null = null;

  setOnPriceUpdate(cb: OnPriceUpdateCallback | null): void {
    this.onPriceUpdate = cb;
  }

  subscribe(conditionId: string, upTokenId: string, downTokenId: string): void {
    if (
      this.currentConditionId === conditionId &&
      this.upTokenId === upTokenId &&
      this.downTokenId === downTokenId
    ) {
      return;
    }
    this.unsubscribe(this.currentConditionId ?? "");
    this.currentConditionId = conditionId;
    this.upTokenId = upTokenId;
    this.downTokenId = downTokenId;
    this.tokenIds = [upTokenId, downTokenId];
    this.cache.clear();
    if (this.reconnectTimerId) {
      clearTimeout(this.reconnectTimerId);
      this.reconnectTimerId = null;
    }
    this.reconnectAttempts = 0;
    logger.info(`Price WS subscribe ${shortId(conditionId)}`);
    this.connect();
  }

  unsubscribe(conditionId: string): void {
    if (this.currentConditionId !== conditionId) return;
    this.currentConditionId = null;
    this.upTokenId = null;
    this.downTokenId = null;
    this.tokenIds = [];
    this.cache.clear();
    if (this.reconnectTimerId) {
      clearTimeout(this.reconnectTimerId);
      this.reconnectTimerId = null;
    }
    this.close();
    this.reconnectAttempts = 0;
    logger.info(`Price WS unsubscribe ${shortId(conditionId)}`);
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  getQuote(tokenId: string): TokenQuote | null {
    const q = this.cache.get(tokenId) ?? null;
    if (!q) return null;
    if (!this.isConnected() && Date.now() - q.ts > STALE_MS) return null;
    return q;
  }

  getBestBid(tokenId: string): number | null {
    const q = this.getQuote(tokenId);
    return q && q.bestBid > 0 ? q.bestBid : null;
  }

  getBestAsk(tokenId: string): number | null {
    const q = this.getQuote(tokenId);
    return q && q.bestAsk > 0 ? q.bestAsk : null;
  }

  getMid(tokenId: string): number | null {
    const q = this.getQuote(tokenId);
    return q ? q.mid : null;
  }

  getPrice(tokenId: string): number | null {
    const ask = this.getBestAsk(tokenId);
    if (ask != null) return ask;
    return this.getMid(tokenId);
  }

  getCachedPrices(): { upPrice: number; downPrice: number } | null {
    if (!this.upTokenId || !this.downTokenId) return null;
    const up = this.getPrice(this.upTokenId);
    const down = this.getPrice(this.downTokenId);
    if (up == null || down == null) return null;
    return { upPrice: up, downPrice: down };
  }

  async whenReady(): Promise<void> {
    return this.ready;
  }

  shutdown(): void {
    this.isShutdown = true;
    if (this.reconnectTimerId) {
      clearTimeout(this.reconnectTimerId);
      this.reconnectTimerId = null;
    }
    this.onPriceUpdate = null;
    this.unsubscribe(this.currentConditionId ?? "");
  }

  private notifyPriceUpdate(): void {
    if (!this.onPriceUpdate || !this.upTokenId || !this.downTokenId) return;
    const upPrice = this.getPrice(this.upTokenId);
    const downPrice = this.getPrice(this.downTokenId);
    if (upPrice == null || downPrice == null) return;
    this.onPriceUpdate(this.upTokenId, this.downTokenId, upPrice, downPrice);
  }

  private scheduleReconnect(): void {
    if (this.isShutdown || this.tokenIds.length === 0) return;
    if (this.reconnectTimerId) return;
    const delay = Math.min(
      RECONNECT_INITIAL_MS * Math.pow(2, this.reconnectAttempts),
      RECONNECT_MAX_MS
    );
    this.reconnectAttempts++;
    logger.info(`Price WS reconnect #${this.reconnectAttempts} in ${delay}ms`);
    this.reconnectTimerId = setTimeout(() => {
      this.reconnectTimerId = null;
      this.connect();
    }, delay);
  }

  private connect(): void {
    this.close();
    if (this.isShutdown || this.tokenIds.length === 0) return;
    this.ws = new WebSocket(WS_URL);
    this.ws.on("open", () => {
      this.lastPong = Date.now();
      this.reconnectAttempts = 0;
      this.ws!.send(
        JSON.stringify({
          assets_ids: this.tokenIds,
          type: "market",
          custom_feature_enabled: true,
        })
      );
      this.resolveReady?.();
      logger.connect("Price WS");
      this.pingTimer = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: "ping" }));
        }
      }, PING_MS);
      this.pongTimer = setInterval(() => {
        if (Date.now() - this.lastPong > PONG_TIMEOUT_MS) {
          this.close();
          this.scheduleReconnect();
        }
      }, PONG_CHECK_MS);
    });
    this.ws.on("message", (data: Buffer) => {
      try {
        const msg = JSON.parse(data.toString()) as Record<string, unknown>;
        if (msg.type === "pong") {
          this.lastPong = Date.now();
          return;
        }
        const eventType = msg.event_type as string | undefined;
        const assetId = msg.asset_id != null ? String(msg.asset_id) : null;
        if (!assetId) return;
        if (eventType === "best_bid_ask") {
          const bestBid = parseFloat(String(msg.best_bid ?? 0)) || 0;
          const bestAsk = parseFloat(String(msg.best_ask ?? 0)) || 0;
          const mid = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : bestAsk || bestBid;
          this.cache.set(assetId, { bestBid, bestAsk, mid, ts: Date.now() });
          this.notifyPriceUpdate();
          return;
        }
        if (eventType === "price_change" && Array.isArray(msg.price_changes)) {
          for (const pc of msg.price_changes as Array<{ asset_id?: string; best_bid?: number; best_ask?: number }>) {
            const aid = pc.asset_id != null ? String(pc.asset_id) : null;
            if (!aid) continue;
            const bestBid = Number(pc.best_bid ?? 0) || 0;
            const bestAsk = Number(pc.best_ask ?? 0) || 0;
            const mid = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : bestAsk || bestBid;
            this.cache.set(aid, { bestBid, bestAsk, mid, ts: Date.now() });
          }
          this.notifyPriceUpdate();
        }
      } catch {
        // skip
      }
    });
    this.ws.on("close", () => {
      this.close();
      this.scheduleReconnect();
    });
    this.ws.on("error", () => {
      this.close();
      this.scheduleReconnect();
    });
  }

  private close(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    if (this.pongTimer) {
      clearInterval(this.pongTimer);
      this.pongTimer = null;
    }
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws.close();
      this.ws = null;
    }
  }
}

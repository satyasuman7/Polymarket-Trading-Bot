import type { SignedOrder } from "@polymarket/order-utils";
import { OrderType } from "./types.ts";
import type { NewOrder, OrderBookSummary, TickSize } from "./types.ts";
export declare function orderToJson<T extends OrderType>(order: SignedOrder, owner: string, orderType: T, deferExec?: boolean, postOnly?: boolean): NewOrder<T>;
export declare const roundNormal: (num: number, decimals: number) => number;
export declare const roundDown: (num: number, decimals: number) => number;
export declare const roundUp: (num: number, decimals: number) => number;
export declare const decimalPlaces: (num: number) => number;
/**
 * Calculates the hash for the given orderbook
 * @param orderbook
 * @returns
 */
export declare const generateOrderBookSummaryHash: (orderbook: OrderBookSummary) => Promise<string>;
export declare const isTickSizeSmaller: (a: TickSize, b: TickSize) => boolean;
export declare const priceValid: (price: number, tickSize: TickSize) => boolean;

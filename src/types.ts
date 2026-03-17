export interface GammaEvent {
  id: string;
  slug: string;
  title: string;
  startDate?: string;
  endDate?: string;
  markets?: Array<{
    id: string;
    conditionId?: string;
    eventStartTime?: string;
    startDate?: string;
    clobTokenIds?: string | string[];
    endDate?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export interface MarketInfo {
  conditionId: string;
  eventSlug: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  upTokenId: string | null;
  downTokenId: string | null;
}

export interface WinBuyDoc {
  conditionId: string;
  eventSlug: string;
  side: "Up" | "Down";
  tokenId: string;
  price: number;
  amountUsd: number;
  shares: number;
  boughtAt: number;
}

export interface WinSellDoc {
  conditionId: string;
  eventSlug: string;
  side: "Up" | "Down";
  tokenId: string;
  shares: number;
  price: number;
  reason: "profit_lock" | "stop_loss";
  soldAt: number;
}

export interface RedeemRecordDoc {
  conditionId: string;
  eventSlug: string | null;
  redeemedAt: number;
  tokensRedeemed: number;
  payoutUsd: number;
}

export interface WinPosition {
  conditionId: string;
  side: "Up" | "Down";
  tokenId: string;
  buyPrice: number;
  shares: number;
  boughtAt: number;
}

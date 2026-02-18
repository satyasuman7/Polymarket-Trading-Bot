import { PolymarketAPIClient, PolymarketOrder } from './api-client';
import { PositionDiff } from './position-monitor';
import { logger } from '../utils/logger';
import { ethers } from 'ethers';

export interface TradeResult {
  success: boolean;
  orderId?: string;
  error?: string;
  market: string;
  outcome: string;
  side: 'buy' | 'sell';
  size: number;
  price: number;
}

export class TradeExecutor {
  private apiClient: PolymarketAPIClient;
  private wallet: ethers.Wallet;
  private maxPositionLimit: number;
  private minTradeSize: number;
  private blacklist: Set<string> = new Set();

  constructor(
    apiClient: PolymarketAPIClient,
    privateKey: string,
    maxPositionLimit: number = 0.2,
    minTradeSize: number = 1
  ) {
    this.apiClient = apiClient;
    this.wallet = new ethers.Wallet(privateKey);
    this.maxPositionLimit = maxPositionLimit;
    this.minTradeSize = minTradeSize;
  }

  /**
   * Execute trades based on position differences
   */
  async executeTrades(diffs: PositionDiff[]): Promise<TradeResult[]> {
    const results: TradeResult[] = [];

    for (const diff of diffs) {
      // Skip blacklisted markets
      if (this.blacklist.has(diff.market)) {
        logger.info({ market: diff.market }, 'Skipping blacklisted market');
        continue;
      }

      // Check position limit
      if (diff.difference * diff.price > this.maxPositionLimit) {
        logger.warn(
          {
            market: diff.market,
            value: diff.difference * diff.price,
            limit: this.maxPositionLimit,
          },
          'Trade exceeds position limit, skipping'
        );
        continue;
      }

      // Check minimum trade size
      if (diff.difference < this.minTradeSize) {
        logger.debug(
          { market: diff.market, size: diff.difference },
          'Trade size below minimum, skipping'
        );
        continue;
      }

      try {
        const result = await this.executeTrade(diff);
        results.push(result);

        if (result.success) {
          logger.info(
            {
              market: diff.market,
              outcome: diff.outcome,
              side: diff.action,
              size: diff.difference,
              price: diff.price,
            },
            'Trade executed successfully'
          );
        } else {
          logger.error(
            {
              market: diff.market,
              outcome: diff.outcome,
              error: result.error,
            },
            'Trade execution failed'
          );
        }

        // Add delay between trades to avoid rate limiting
        await this.sleep(1000);
      } catch (error: any) {
        logger.error(
          { error: error.message, market: diff.market, outcome: diff.outcome },
          'Error executing trade'
        );
        results.push({
          success: false,
          error: error.message,
          market: diff.market,
          outcome: diff.outcome,
          side: diff.action,
          size: diff.difference,
          price: diff.price,
        });
      }
    }

    return results;
  }

  /**
   * Execute a single trade
   */
  private async executeTrade(diff: PositionDiff): Promise<TradeResult> {
    try {
      // Get current market price
      const marketPrice = await this.apiClient.getMarketPrice(diff.market, diff.outcome);
      const tradePrice = marketPrice > 0 ? marketPrice : diff.price;

      // Create signature for the order
      const signature = await this.createOrderSignature(
        diff.market,
        diff.outcome,
        diff.action,
        tradePrice,
        diff.difference
      );

      let orderId: string | undefined;

      if (diff.action === 'buy') {
        const result = await this.apiClient.placeBuyOrder(
          diff.market,
          diff.outcome,
          tradePrice,
          diff.difference,
          signature
        );
        orderId = result.orderId || result.id;
      } else {
        const result = await this.apiClient.placeSellOrder(
          diff.market,
          diff.outcome,
          tradePrice,
          diff.difference,
          signature
        );
        orderId = result.orderId || result.id;
      }

      return {
        success: true,
        orderId,
        market: diff.market,
        outcome: diff.outcome,
        side: diff.action,
        size: diff.difference,
        price: tradePrice,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        market: diff.market,
        outcome: diff.outcome,
        side: diff.action,
        size: diff.difference,
        price: diff.price,
      };
    }
  }

  /**
   * Create order signature
   */
  private async createOrderSignature(
    market: string,
    outcome: string,
    side: 'buy' | 'sell',
    price: number,
    size: number
  ): Promise<string> {
    // Create a message to sign
    const message = JSON.stringify({
      market,
      outcome,
      side,
      price: price.toString(),
      size: size.toString(),
      timestamp: Date.now(),
    });

    // Sign the message
    const signature = await this.wallet.signMessage(message);
    return signature;
  }

  /**
   * Add market to blacklist
   */
  addToBlacklist(marketId: string): void {
    this.blacklist.add(marketId);
    logger.info({ market: marketId }, 'Added market to blacklist');
  }

  /**
   * Remove market from blacklist
   */
  removeFromBlacklist(marketId: string): void {
    this.blacklist.delete(marketId);
    logger.info({ market: marketId }, 'Removed market from blacklist');
  }

  /**
   * Get blacklist
   */
  getBlacklist(): string[] {
    return Array.from(this.blacklist);
  }

  /**
   * Set max position limit
   */
  setMaxPositionLimit(limit: number): void {
    this.maxPositionLimit = limit;
    logger.info({ limit }, 'Updated max position limit');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

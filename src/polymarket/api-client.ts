import axios, { AxiosInstance } from 'axios';
import { logger } from '../utils/logger';

export interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  description: string;
  endDate: string;
  resolutionSource: string;
  marketMakerAddress: string;
  image: string;
  icon: string;
  active: boolean;
  archived: boolean;
  liquidity: number;
  volume: number;
  endDate_iso: string;
  startDate_iso: string;
  outcomes: string[];
  outcomePrices: { [key: string]: number };
  createdAt: string;
  new: boolean;
  featured: boolean;
  featuredSlug: string;
  groupItemTitle: string;
  groupItemTitleShort: string;
  conditionId: string;
  questionId: string;
  liquidityNum: number;
  volumeNum: number;
}

export interface PolymarketPosition {
  market: string;
  outcome: string;
  shares: number;
  price: number;
  value: number;
  timestamp: number;
}

export interface PolymarketOrder {
  market: string;
  outcome: string;
  side: 'buy' | 'sell';
  price: number;
  size: number;
  orderId?: string;
}

export interface UserPositions {
  [marketId: string]: {
    [outcome: string]: PolymarketPosition;
  };
}

export class PolymarketAPIClient {
  private clobHttpUrl: string;
  private clobWsUrl: string;
  private gammaApiUrl: string;
  private httpClient: AxiosInstance;

  constructor(
    clobHttpUrl: string,
    clobWsUrl: string,
    gammaApiUrl: string
  ) {
    this.clobHttpUrl = clobHttpUrl.replace(/\/$/, '');
    this.clobWsUrl = clobWsUrl;
    this.gammaApiUrl = gammaApiUrl.replace(/\/$/, '');
    
    this.httpClient = axios.create({
      baseURL: this.clobHttpUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get user positions from Polymarket
   */
  async getUserPositions(userAddress: string): Promise<UserPositions> {
    try {
      const response = await this.httpClient.get(`/users/${userAddress}/positions`);
      return this.parsePositions(response.data);
    } catch (error: any) {
      logger.error({ error: error.message }, 'Failed to fetch user positions');
      throw error;
    }
  }

  /**
   * Get market information
   */
  async getMarket(marketId: string): Promise<PolymarketMarket> {
    try {
      const response = await axios.get(`${this.gammaApiUrl}/markets/${marketId}`);
      return response.data;
    } catch (error: any) {
      logger.error({ error: error.message, marketId }, 'Failed to fetch market');
      throw error;
    }
  }

  /**
   * Get market orderbook
   */
  async getOrderbook(marketId: string, outcome: string) {
    try {
      const tokenId = `${marketId}-${outcome}`;
      const response = await this.httpClient.get(`/book?token_id=${tokenId}`);
      return response.data;
    } catch (error: any) {
      logger.error({ error: error.message, marketId, outcome }, 'Failed to fetch orderbook');
      throw error;
    }
  }

  /**
   * Get market price
   */
  async getMarketPrice(marketId: string, outcome: string): Promise<number> {
    try {
      const orderbook = await this.getOrderbook(marketId, outcome);
      if (orderbook.bids && orderbook.bids.length > 0) {
        return parseFloat(orderbook.bids[0].price);
      }
      if (orderbook.asks && orderbook.asks.length > 0) {
        return parseFloat(orderbook.asks[0].price);
      }
      return 0;
    } catch (error: any) {
      logger.error({ error: error.message, marketId, outcome }, 'Failed to get market price');
      return 0;
    }
  }

  /**
   * Place a buy order
   */
  async placeBuyOrder(
    marketId: string,
    outcome: string,
    price: number,
    size: number,
    signature: string
  ): Promise<any> {
    try {
      const tokenId = `${marketId}-${outcome}`;
      const response = await this.httpClient.post('/orders', {
        token_id: tokenId,
        side: 'buy',
        price: price.toString(),
        size: size.toString(),
        signature,
      });
      return response.data;
    } catch (error: any) {
      logger.error({ error: error.message, marketId, outcome }, 'Failed to place buy order');
      throw error;
    }
  }

  /**
   * Place a sell order
   */
  async placeSellOrder(
    marketId: string,
    outcome: string,
    price: number,
    size: number,
    signature: string
  ): Promise<any> {
    try {
      const tokenId = `${marketId}-${outcome}`;
      const response = await this.httpClient.post('/orders', {
        token_id: tokenId,
        side: 'sell',
        price: price.toString(),
        size: size.toString(),
        signature,
      });
      return response.data;
    } catch (error: any) {
      logger.error({ error: error.message, marketId, outcome }, 'Failed to place sell order');
      throw error;
    }
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, signature: string): Promise<any> {
    try {
      const response = await this.httpClient.delete(`/orders/${orderId}`, {
        data: { signature },
      });
      return response.data;
    } catch (error: any) {
      logger.error({ error: error.message, orderId }, 'Failed to cancel order');
      throw error;
    }
  }

  /**
   * Get user's open orders
   */
  async getOpenOrders(userAddress: string): Promise<any[]> {
    try {
      const response = await this.httpClient.get(`/users/${userAddress}/orders`);
      return response.data || [];
    } catch (error: any) {
      logger.error({ error: error.message, userAddress }, 'Failed to fetch open orders');
      return [];
    }
  }

  /**
   * Parse positions from API response
   */
  private parsePositions(data: any): UserPositions {
    const positions: UserPositions = {};

    if (Array.isArray(data)) {
      data.forEach((position: any) => {
        const marketId = position.market || position.conditionId;
        const outcome = position.outcome || position.outcomeName;
        
        if (!positions[marketId]) {
          positions[marketId] = {};
        }

        positions[marketId][outcome] = {
          market: marketId,
          outcome,
          shares: parseFloat(position.shares || position.balance || '0'),
          price: parseFloat(position.price || '0'),
          value: parseFloat(position.value || position.usdValue || '0'),
          timestamp: position.timestamp || Date.now(),
        };
      });
    }

    return positions;
  }

  /**
   * Get all active markets
   */
  async getActiveMarkets(limit: number = 100): Promise<PolymarketMarket[]> {
    try {
      const response = await axios.get(`${this.gammaApiUrl}/markets`, {
        params: {
          active: true,
          limit,
        },
      });
      return response.data || [];
    } catch (error: any) {
      logger.error({ error: error.message }, 'Failed to fetch active markets');
      return [];
    }
  }
}

import { PolymarketAPIClient, UserPositions, PolymarketPosition } from './api-client';
import { logger } from '../utils/logger';

export interface PositionDiff {
  market: string;
  outcome: string;
  action: 'buy' | 'sell' | 'none';
  targetShares: number;
  currentShares: number;
  difference: number;
  price: number;
}

export class PositionMonitor {
  private apiClient: PolymarketAPIClient;
  private targetUserAddress: string;
  private myUserAddress: string;
  private currentPositions: UserPositions = {};
  private targetPositions: UserPositions = {};
  private pollingInterval: number;
  private isMonitoring: boolean = false;

  constructor(
    apiClient: PolymarketAPIClient,
    targetUserAddress: string,
    myUserAddress: string,
    pollingInterval: number = 4000
  ) {
    this.apiClient = apiClient;
    this.targetUserAddress = targetUserAddress;
    this.myUserAddress = myUserAddress;
    this.pollingInterval = pollingInterval;
  }

  /**
   * Start monitoring target user positions
   */
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      logger.warn('Position monitoring is already running');
      return;
    }

    this.isMonitoring = true;
    logger.info({ targetUser: this.targetUserAddress }, 'Starting position monitoring');

    // Initial fetch
    await this.updatePositions();

    // Start polling
    this.poll();
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    logger.info('Stopped position monitoring');
  }

  /**
   * Poll for position updates
   */
  private async poll(): Promise<void> {
    while (this.isMonitoring) {
      try {
        await this.updatePositions();
        await this.sleep(this.pollingInterval);
      } catch (error: any) {
        logger.error({ error: error.message }, 'Error during position polling');
        await this.sleep(this.pollingInterval);
      }
    }
  }

  /**
   * Update both target and current positions
   */
  async updatePositions(): Promise<void> {
    try {
      const [targetPos, currentPos] = await Promise.all([
        this.apiClient.getUserPositions(this.targetUserAddress),
        this.apiClient.getUserPositions(this.myUserAddress),
      ]);

      this.targetPositions = targetPos;
      this.currentPositions = currentPos;

      logger.debug(
        {
          targetPositions: Object.keys(targetPos).length,
          currentPositions: Object.keys(currentPos).length,
        },
        'Positions updated'
      );
    } catch (error: any) {
      logger.error({ error: error.message }, 'Failed to update positions');
      throw error;
    }
  }

  /**
   * Calculate position differences between target and current
   */
  calculatePositionDiffs(): PositionDiff[] {
    const diffs: PositionDiff[] = [];

    // Check all target positions
    for (const [marketId, outcomes] of Object.entries(this.targetPositions)) {
      for (const [outcome, targetPos] of Object.entries(outcomes)) {
        const currentPos = this.currentPositions[marketId]?.[outcome];
        const currentShares = currentPos?.shares || 0;
        const targetShares = targetPos.shares;
        const difference = targetShares - currentShares;

        if (Math.abs(difference) > 0.01) {
          // Only include if difference is significant (> 0.01 shares)
          diffs.push({
            market: marketId,
            outcome,
            action: difference > 0 ? 'buy' : 'sell',
            targetShares,
            currentShares,
            difference: Math.abs(difference),
            price: targetPos.price || 0,
          });
        }
      }
    }

    // Check for positions we have but target doesn't (should sell)
    for (const [marketId, outcomes] of Object.entries(this.currentPositions)) {
      for (const [outcome, currentPos] of Object.entries(outcomes)) {
        if (currentPos.shares > 0.01) {
          const targetPos = this.targetPositions[marketId]?.[outcome];
          if (!targetPos || targetPos.shares < 0.01) {
            // Target doesn't have this position, we should sell
            diffs.push({
              market: marketId,
              outcome,
              action: 'sell',
              targetShares: 0,
              currentShares: currentPos.shares,
              difference: currentPos.shares,
              price: currentPos.price || 0,
            });
          }
        }
      }
    }

    return diffs;
  }

  /**
   * Get current positions
   */
  getCurrentPositions(): UserPositions {
    return { ...this.currentPositions };
  }

  /**
   * Get target positions
   */
  getTargetPositions(): UserPositions {
    return { ...this.targetPositions };
  }

  /**
   * Check if monitoring is active
   */
  isActive(): boolean {
    return this.isMonitoring;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

import { PolymarketAPIClient } from './api-client';
import { PositionMonitor } from './position-monitor';
import { TradeExecutor } from './trade-executor';
import { logger } from '../utils/logger';
import { retrieveEnvVariable } from '../utils/utils';

export interface BotConfig {
  targetUserAddress: string;
  myUserAddress: string;
  privateKey: string;
  clobHttpUrl: string;
  clobWsUrl: string;
  gammaApiUrl: string;
  pollingInterval: number;
  maxPositionLimit: number;
  minTradeSize: number;
  autoRedeem: boolean;
  redeemInterval: number;
}

export class PolymarketCopyTradingBot {
  private apiClient: PolymarketAPIClient;
  private positionMonitor: PositionMonitor;
  private tradeExecutor: TradeExecutor;
  private config: BotConfig;
  private isRunning: boolean = false;
  private redeemIntervalId?: NodeJS.Timeout;

  constructor(config: BotConfig) {
    this.config = config;

    // Initialize API client
    this.apiClient = new PolymarketAPIClient(
      config.clobHttpUrl,
      config.clobWsUrl,
      config.gammaApiUrl
    );

    // Initialize position monitor
    this.positionMonitor = new PositionMonitor(
      this.apiClient,
      config.targetUserAddress,
      config.myUserAddress,
      config.pollingInterval
    );

    // Initialize trade executor
    this.tradeExecutor = new TradeExecutor(
      this.apiClient,
      config.privateKey,
      config.maxPositionLimit,
      config.minTradeSize
    );
  }

  /**
   * Start the bot
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Bot is already running');
      return;
    }

    logger.info('Starting Polymarket Copy Trading Bot');
    this.isRunning = true;

    try {
      // Start position monitoring
      await this.positionMonitor.startMonitoring();

      // Start trade execution loop
      this.startTradeExecutionLoop();

      // Start auto-redeem if enabled
      if (this.config.autoRedeem) {
        this.startAutoRedeem();
      }

      logger.info('Bot started successfully');
    } catch (error: any) {
      logger.error({ error: error.message }, 'Failed to start bot');
      this.isRunning = false;
      throw error;
    }
  }

  /**
   * Stop the bot
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.warn('Bot is not running');
      return;
    }

    logger.info('Stopping Polymarket Copy Trading Bot');
    this.isRunning = false;

    // Stop position monitoring
    this.positionMonitor.stopMonitoring();

    // Stop auto-redeem
    if (this.redeemIntervalId) {
      clearInterval(this.redeemIntervalId);
    }

    logger.info('Bot stopped');
  }

  /**
   * Start trade execution loop
   */
  private startTradeExecutionLoop(): void {
    const executeTrades = async () => {
      if (!this.isRunning) return;

      try {
        // Calculate position differences
        const diffs = this.positionMonitor.calculatePositionDiffs();

        if (diffs.length > 0) {
          logger.info({ count: diffs.length }, 'Found position differences, executing trades');

          // Execute trades
          const results = await this.tradeExecutor.executeTrades(diffs);

          // Log results
          const successCount = results.filter((r) => r.success).length;
          const failCount = results.filter((r) => !r.success).length;

          logger.info(
            {
              total: results.length,
              success: successCount,
              failed: failCount,
            },
            'Trade execution completed'
          );
        } else {
          logger.debug('No position differences found');
        }
      } catch (error: any) {
        logger.error({ error: error.message }, 'Error in trade execution loop');
      }
    };

    // Execute immediately
    executeTrades();

    // Then execute at polling interval
    setInterval(executeTrades, this.config.pollingInterval);
  }

  /**
   * Start auto-redeem for resolved positions
   */
  private startAutoRedeem(): void {
    const redeemPositions = async () => {
      if (!this.isRunning) return;

      try {
        logger.info('Checking for resolved positions to redeem');
        // TODO: Implement position redemption logic
        // This would check for resolved markets and redeem positions
      } catch (error: any) {
        logger.error({ error: error.message }, 'Error during auto-redeem');
      }
    };

    // Execute immediately
    redeemPositions();

    // Then execute at redeem interval
    this.redeemIntervalId = setInterval(redeemPositions, this.config.redeemInterval);
  }

  /**
   * Get bot status
   */
  getStatus(): {
    isRunning: boolean;
    targetUser: string;
    myUser: string;
    currentPositions: number;
    targetPositions: number;
  } {
    const currentPos = this.positionMonitor.getCurrentPositions();
    const targetPos = this.positionMonitor.getTargetPositions();

    return {
      isRunning: this.isRunning,
      targetUser: this.config.targetUserAddress,
      myUser: this.config.myUserAddress,
      currentPositions: Object.keys(currentPos).length,
      targetPositions: Object.keys(targetPos).length,
    };
  }

  /**
   * Get position monitor instance
   */
  getPositionMonitor(): PositionMonitor {
    return this.positionMonitor;
  }

  /**
   * Get trade executor instance
   */
  getTradeExecutor(): TradeExecutor {
    return this.tradeExecutor;
  }
}

/**
 * Create bot from environment variables
 */
export function createBotFromEnv(): PolymarketCopyTradingBot {
  const config: BotConfig = {
    targetUserAddress: retrieveEnvVariable('TARGET_USER_ADDRESS', logger),
    myUserAddress: retrieveEnvVariable('MY_USER_ADDRESS', logger),
    privateKey: retrieveEnvVariable('PRIVATE_KEY', logger),
    clobHttpUrl: retrieveEnvVariable('CLOB_HTTP_URL', logger),
    clobWsUrl: retrieveEnvVariable('CLOB_WS_URL', logger),
    gammaApiUrl: retrieveEnvVariable('GAMMA_API_URL', logger),
    pollingInterval: parseInt(retrieveEnvVariable('POLLING_INTERVAL', logger) || '4000'),
    maxPositionLimit: parseFloat(retrieveEnvVariable('MAX_POSITION_LIMIT', logger) || '0.2'),
    minTradeSize: parseFloat(retrieveEnvVariable('MIN_TRADE_SIZE', logger) || '1'),
    autoRedeem: retrieveEnvVariable('AUTO_REDEEM', logger) === 'true',
    redeemInterval: parseInt(retrieveEnvVariable('REDEEM_INTERVAL', logger) || '7200000'), // 2 hours
  };

  return new PolymarketCopyTradingBot(config);
}

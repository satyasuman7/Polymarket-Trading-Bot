import { createBotFromEnv } from './polymarket/bot';
import { logger } from './utils/logger';
import dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
const relativeDotenvPath = '../.env';
const absoluteDotenvPath = path.resolve(__dirname, relativeDotenvPath);
dotenv.config({
  path: absoluteDotenvPath,
});

async function main() {
  try {
    logger.info('Initializing Polymarket Copy Trading Bot...');

    // Create bot from environment variables
    const bot = createBotFromEnv();

    // Start the bot
    await bot.start();

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      await bot.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      await bot.stop();
      process.exit(0);
    });

    // Log status periodically
    setInterval(() => {
      const status = bot.getStatus();
      logger.info(status, 'Bot status');
    }, 60000); // Every minute

  } catch (error: any) {
    logger.error({ error: error.message }, 'Failed to start bot');
    process.exit(1);
  }
}

// Run the bot
main().catch((error) => {
  logger.error({ error: error.message }, 'Unhandled error');
  process.exit(1);
});

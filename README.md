# Polymarket Copy Trading Bot

This is an automated copy trading bot for Polymarket that monitors target traders and automatically replicates their positions in real-time. The bot continuously tracks the target trader's positions and executes buy/sell orders to match their portfolio, enabling you to follow successful traders automatically.

## Functionality

1. **Real-time Position Monitoring** - Continuously monitors target trader positions every 4 seconds (configurable)
2. **Automatic Trade Execution** - Automatically places buy/sell orders to match target portfolio
3. **Position Difference Detection** - Compares target positions with your current positions
4. **Risk Management** - Applies position limits and minimum trade size constraints
5. **Auto Redeem** - Optionally redeems resolved positions automatically
6. **Blacklist Support** - Exclude specific markets from trading
7. **Comprehensive Logging** - Detailed logging for monitoring and debugging

## Directory Structure

```
Polymarket-Copytrading-Bot/
├── src/
│   ├── polymarket/           # Polymarket bot core modules
│   │   ├── api-client.ts     # Polymarket API client for fetching data and placing orders
│   │   ├── position-monitor.ts # Monitors target trader positions
│   │   ├── trade-executor.ts  # Executes trades based on position differences
│   │   ├── bot.ts            # Main bot orchestrator
│   │   └── index.ts          # Module exports
│   ├── constants/            # Configuration constants
│   │   ├── constants.ts      # Environment variables and connection setup
│   │   └── index.ts          # Constants exports
│   ├── utils/                # Utility functions
│   │   ├── logger.ts         # Logging configuration
│   │   ├── utils.ts          # Helper functions
│   │   └── index.ts          # Utils exports
│   ├── main.ts               # Application entry point
│   ├── buy.ts                # Buy example (legacy)
│   ├── sell.ts               # Sell example (legacy)
│   ├── pumpswap.ts           # PumpSwap SDK (legacy)
│   ├── pool.ts               # Pool utilities (legacy)
│   ├── IDL/                  # Anchor IDL definitions (legacy)
│   ├── jito/                 # Jito bundle utilities (legacy)
│   └── nozomi/               # Nozomi transaction submission (legacy)
├── .env.example              # Environment variables template
├── package.json              # Node.js dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.base.json        # Base TypeScript configuration
├── README.md                 # This file
└── README-example.md         # Example README reference

```

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Polygon wallet with USDC balance
- Private key of your trading wallet
- Target trader's wallet address to copy

## How to run it

```bash
# Clone the repository
git clone <repository-url>
cd Polymarket-Copytrading-Bot

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and fill in your settings
cp .env.example .env

# Edit .env file with your configuration:
# - TARGET_USER_ADDRESS: Address of the trader you want to copy
# - MY_USER_ADDRESS: Your wallet address
# - PRIVATE_KEY: Your wallet's private key
# - API endpoints (already configured by default)

# Start the application
npm run start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for template):

### Required Variables

- `TARGET_USER_ADDRESS` - Ethereum/Polygon address of the trader you want to copy
- `MY_USER_ADDRESS` - Your wallet address (the bot will trade from this address)
- `PRIVATE_KEY` - Private key of your trading wallet (without 0x prefix)
- `CLOB_HTTP_URL` - Polymarket CLOB HTTP API endpoint (default: https://clob.polymarket.com/)
- `CLOB_WS_URL` - Polymarket CLOB WebSocket endpoint (default: wss://ws-subscriptions-clob.polymarket.com/ws)
- `GAMMA_API_URL` - Polymarket Gamma API endpoint (default: https://gamma-api.polymarket.com)

### Optional Configuration

- `POLLING_INTERVAL` - Polling interval in milliseconds (default: 4000 = 4 seconds)
- `MAX_POSITION_LIMIT` - Maximum position limit in USD (default: 0.2 = $0.20)
- `MIN_TRADE_SIZE` - Minimum trade size in shares (default: 1)
- `AUTO_REDEEM` - Enable auto-redeem for resolved positions (default: false)
- `REDEEM_INTERVAL` - Redeem interval in milliseconds (default: 7200000 = 2 hours)
- `LOG_LEVEL` - Logging level (default: info)

## Features

### Position Monitoring

The bot continuously monitors the target trader's positions by polling the Polymarket API at configurable intervals. It compares the target positions with your current positions and identifies differences.

### Trade Execution

When position differences are detected, the bot automatically:
1. Calculates the required trade size
2. Checks position limits and minimum trade size
3. Gets current market prices
4. Places buy or sell orders to match the target portfolio
5. Logs all trade executions

### Risk Management

- **Position Limits**: Maximum position value per trade (configurable)
- **Minimum Trade Size**: Minimum number of shares to trade (configurable)
- **Blacklist**: Exclude specific markets from trading
- **Error Handling**: Comprehensive error handling and retry logic

### Logging

The bot uses structured logging with the following levels:
- `info`: General information and status updates
- `warn`: Warnings and non-critical issues
- `error`: Errors and failures
- `debug`: Detailed debugging information

## Contact Information
- Telegram: https://t.me/DevCutup
- Whatsapp: https://wa.me/13137423660
- Twitter: https://x.com/devcutup

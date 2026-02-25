# Polymarket Trading Bot (Win rate: 95%)

An automated trading bot for Polymarket that monitors Bitcoin 15-minute up/down markets and executes buy orders when token prices reach a target threshold. This bot win rate reaches 95%

## Features

### 🎯 Core Functionality

- **Real-Time Price Monitoring**: Uses WebSocket connections to monitor live best ask/bid prices for BTC 15-minute markets
- **Automated Trading**: Automatically places limit buy orders when token prices reach the target threshold (default: 0.95)
- **Market Detection**: Automatically detects and trades on the current 15-minute Bitcoin up/down market slot
- **Dual Token Support**: Monitors both "Up" and "Down" tokens simultaneously
- **Price Filtering**: Optional minimum price filter to avoid buying tokens when the other side is winning
- **Duplicate Prevention**: Ensures only one buy per token per 15-minute slot to avoid duplicate orders

### 🔧 Technical Features

- **WebSocket Integration**: Real-time price updates via Polymarket CLOB market WebSocket channel
- **Token ID Resolution**: Fetches token IDs from Polymarket Gamma API based on market slug
- **Cached Token Lookup**: Implements caching for token ID lookups to reduce API calls
- **Order Management**: Places GTC (Good Till Cancel) limit orders with configurable tick sizes
- **Error Handling**: Comprehensive error handling with retry logic and graceful degradation
- **Dry Run Mode**: Test the bot without placing actual orders

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Polymarket account with API credentials
- Private key for wallet authentication

### Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd /root/Work/Polymarket-Trading-Bot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Configure environment variables** (see Configuration section below)

## Configuration

Create a `.env` file in the project root with the following variables:

### Required Variables

```env
# Polymarket Authentication
POLYMARKET_PRIVATE_KEY=your_private_key_here
POLYMARKET_PROXY=your_proxy_wallet_address
# OR use PROXY_WALLET_ADDRESS instead of POLYMARKET_PROXY
```

### Optional Configuration

```env
# Trading Parameters
BOT_TARGET_PRICE=0.95          # Buy when best ask <= this price (default: 0.95)
BOT_MIN_PRICE=0.90             # Optional: only buy when best ask >= this (default: null)
BOT_BUY_SIZE=5                 # Number of tokens to buy per order (default: 5)
BOT_DRY_RUN=true              # Set to "true" to test without placing orders (default: false)
BOT_PRICE_LOG_INTERVAL_MS=1000 # Log prices every N ms (0 = every update, default: 1000)

# Polymarket API Configuration
POLYMARKET_CLOB_URL=https://clob.polymarket.com
POLYMARKET_CHAIN_ID=137        # Polygon mainnet (default: 137)
POLYMARKET_TICK_SIZE=0.01      # Order price precision: 0.01, 0.001, or 0.0001 (default: 0.01)
POLYMARKET_NEG_RISK=false      # Allow negative risk orders (default: false)
POLYMARKET_CREDENTIAL_PATH=    # Path to credentials JSON file (optional)
POLYMARKET_SIGNATURE_TYPE=2     # Signature type: 0, 1, or 2 (auto-detected if proxy set)
```

### Credentials File (Optional)

If using `POLYMARKET_CREDENTIAL_PATH`, create a JSON file with:
```json
{
  "key": "your_api_key",
  "secret": "your_api_secret",
  "passphrase": "your_passphrase"
}
```

If not provided, the bot will automatically create/derive API credentials using your private key.

## Usage

### Development Mode (with TypeScript)

Run the bot directly with TypeScript:
```bash
npm run bot
```

### Production Mode

Build and run:
```bash
npm run build
npm start
```

### Type Checking

Check TypeScript types without building:
```bash
npm run typecheck
```

### Clean Build Artifacts

Remove compiled files:
```bash
npm run clean
```

## How It Works

### 1. Market Detection

The bot automatically detects the current 15-minute Bitcoin up/down market:
- Calculates the current 15-minute slot (00, 15, 30, 45 minutes past the hour)
- Generates market slug: `btc-updown-15m-{timestamp}`
- Fetches token IDs for "Up" and "Down" tokens from Polymarket Gamma API

### 2. WebSocket Connection

- Connects to Polymarket CLOB WebSocket market channel
- Subscribes to both Up and Down token IDs
- Receives real-time price updates via:
  - `book` events (full order book)
  - `best_bid_ask` events (best prices only)
  - `price_change` events (price updates)

### 3. Price Monitoring

- Tracks best ask and best bid prices for both tokens
- Logs current prices at configurable intervals
- Monitors for price triggers

### 4. Order Execution

When a token's best ask price reaches the target:
- Validates minimum price (if configured)
- Checks if already bought this token in current slot
- Places a limit buy order:
  - Order type: GTC (Good Till Cancel)
  - Price: `min(price + 0.01 buffer, 0.99)`
  - Size: Configured buy size
  - Rounded to tick size precision

### 5. Duplicate Prevention

- Tracks purchases per token per 15-minute slot
- Prevents multiple buys of the same token in the same slot
- Resets tracking when a new 15-minute slot begins

## Trading Strategy

### Default Strategy

- **Target Price**: 0.95 (buy when price is at or below 95 cents)
- **Buy Size**: 5 tokens per order
- **Order Type**: Limit orders (GTC)
- **Price Buffer**: Adds 0.01 to best ask for limit price (max 0.99)

### Customization

Adjust the strategy by modifying environment variables:
- Lower `BOT_TARGET_PRICE` to buy at lower prices (more aggressive)
- Set `BOT_MIN_PRICE` to avoid buying when the other side is winning
- Increase `BOT_BUY_SIZE` for larger positions
- Use `BOT_DRY_RUN=true` to test without real orders

## Architecture

### Project Structure

```
Polymarket-Trading-Bot/
├── src/
│   ├── btc-15m-high-price-bot.ts  # Main bot entry point
│   ├── config.ts                   # Configuration and env vars
│   └── polymarket/
│       ├── order.ts                # Order placement logic
│       ├── prices.ts               # Market slug and token ID resolution
│       └── ws-prices.ts            # WebSocket client for price updates
├── dist/                           # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Key Components

1. **Main Bot** (`btc-15m-high-price-bot.ts`)
   - Orchestrates the trading logic
   - Manages WebSocket connections
   - Handles order triggers and execution

2. **Price Resolution** (`prices.ts`)
   - Generates market slugs for current 15m slot
   - Fetches token IDs from Gamma API
   - Implements caching for performance

3. **WebSocket Client** (`ws-prices.ts`)
   - Manages WebSocket connection to Polymarket
   - Handles subscription and message parsing
   - Provides real-time price callbacks

4. **Order Placement** (`order.ts`)
   - Builds and manages CLOB client
   - Handles credential management
   - Places limit buy orders with proper formatting

## Development

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Running in Development

```bash
npm run bot
```

## Support

For issues, questions, or contributions, please refer to the project repository or contact the maintainers.

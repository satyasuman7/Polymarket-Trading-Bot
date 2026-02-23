# Polymarket Gabagool Trading Bot

A production-grade hedged arbitrage trading bot for Polymarket's 15-minute binary markets. This bot implements the "Gabagool" strategy, which maintains hedged positions by buying both YES and NO tokens at favorable prices to capture arbitrage opportunities while minimizing directional risk.

## 🎯 Overview

This bot automatically trades Polymarket's 15-minute binary markets (e.g., "BTC Up/Down 15m") using a sophisticated hedging strategy. It monitors multiple markets concurrently, enters positions when prices drop below thresholds, maintains balanced hedges, and automatically redeems winning positions when markets resolve.

### Key Features

- **Hedged Arbitrage Strategy**: Buys both YES and NO tokens to maintain risk-neutral positions
- **Multi-Market Support**: Trades multiple markets concurrently (BTC, ETH, SOL, etc.)
- **Automated Entry/Exit**: Flexible entry with strict alternation for hedging
- **Dynamic Thresholds**: Calculates optimal entry prices based on previous fills
- **State Persistence**: Maintains trading state across restarts
- **Automated Redemption**: Automatically redeems winning positions from resolved markets
- **Risk Management**: SumAvg guard, position limits, drawdown protection
- **Performance Optimized**: Fire-and-forget orders, adaptive polling, debounced state saves

## 🏗️ Architecture

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Language**: TypeScript 5.9+ (strict mode)
- **Blockchain**: Polygon (Ethereum-compatible L2)
- **APIs**: 
  - Polymarket CLOB Client (`@polymarket/clob-client`) - Order execution
  - Polymarket Gamma API - Market data and token IDs
- **Web3**: Ethers.js v6 for blockchain interactions
- **Logging**: Custom structured logger with file output

### System Flow

```
Market Price Polling → Entry Detection → Buy Execution → State Update
                                                              ↓
Hedge Completion → Position Redemption → PnL Recording
```

## 📦 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **TypeScript** 5.9+
- **Polygon wallet** with USDC for trading
- **Private key** for wallet authentication

### Setup

1. **Clone or navigate to the project**
   ```bash
   cd Polymarket-Trading-Bot-Gabagool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Wallet Configuration (REQUIRED)
   PRIVATE_KEY=your_private_key_here
   
   # Market Selection
   COPYTRADE_MARKETS=btc,eth,sol  # Comma-separated markets
   
   # Entry Parameters
   COPYTRADE_THRESHOLD=0.499  # Initial entry threshold
   REVERSAL_DELTA=0.020  # Price reversal delta
   
   # Position Sizing
   MAX_BUYS_PER_SIDE=4  # Maximum buys per side
   COPYTRADE_SHARES=5  # Shares per buy
   COPYTRADE_MAX_SUM_AVG=0.98  # Maximum sumAvg for profitability
   
   # Order Execution
   COPYTRADE_TICK_SIZE=0.01
   COPYTRADE_PRICE_BUFFER=0.03  # 3 cents buffer
   COPYTRADE_FIRE_AND_FORGET=true
   
   # Performance
   COPYTRADE_POLL_MS=200  # Base polling interval
   COPYTRADE_ADAPTIVE_POLLING=true
   
   # Risk Management
   COPYTRADE_MAX_DRAWDOWN_PERCENT=0  # 0 = disabled
   COPYTRADE_MIN_BALANCE_USDC=2
   
   # Bot Control
   BOT_MIN_USDC_BALANCE=1
   COPYTRADE_WAIT_FOR_NEXT_MARKET_START=true
   
   # API Configuration
   CHAIN_ID=137  # Polygon mainnet
   CLOB_API_URL=https://clob.polymarket.com
   
   # Logging
   LOG_DIR=logs
   LOG_FILE_PREFIX=bot
   DEBUG=false
   ```

4. **Initialize credentials**
   On first run, the bot will automatically create API credentials using your `PRIVATE_KEY`.
   Credentials are saved to `src/data/credential.json`.

## ⚙️ Configuration

### Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PRIVATE_KEY` | string | **required** | Private key of trading wallet |
| `COPYTRADE_MARKETS` | string | `btc` | Comma-separated markets (e.g., "btc,eth,sol") |
| `COPYTRADE_THRESHOLD` | number | `0.499` | Initial entry threshold |
| `REVERSAL_DELTA` | number | `0.020` | Price reversal delta for buy triggers |
| `MAX_BUYS_PER_SIDE` | number | `4` | Maximum buys per side |
| `COPYTRADE_SHARES` | number | `5` | Shares per buy |
| `COPYTRADE_MAX_SUM_AVG` | number | `0.98` | Maximum sumAvg to maintain profit |
| `COPYTRADE_TICK_SIZE` | string | `0.01` | Price precision |
| `COPYTRADE_PRICE_BUFFER` | number | `0.03` | Price buffer in cents |
| `COPYTRADE_FIRE_AND_FORGET` | boolean | `true` | Don't wait for order confirmation |
| `COPYTRADE_POLL_MS` | number | `200` | Base polling interval (ms) |
| `COPYTRADE_ADAPTIVE_POLLING` | boolean | `true` | Enable adaptive polling |
| `COPYTRADE_MAX_DRAWDOWN_PERCENT` | number | `0` | Stop if losses exceed % (0 = disabled) |
| `COPYTRADE_MIN_BALANCE_USDC` | number | `2` | Minimum balance before stopping |
| `BOT_MIN_USDC_BALANCE` | number | `1` | Minimum USDC balance to start |
| `CHAIN_ID` | number | `137` | Blockchain chain ID (137 = Polygon) |
| `DEBUG` | boolean | `false` | Enable debug logging |

### Trading Strategy Parameters

- **Threshold**: Initial entry price threshold. Bot enters when either YES or NO drops below this value.
- **Reversal Delta**: Price movement required to trigger a reversal-based buy (default: 0.020 = 2 cents).
- **Max Buys Per Side**: Maximum number of buy orders per side (YES/NO) before hedge completes.
- **Shares Per Side**: Number of shares to buy per order.
- **Max SumAvg**: Maximum acceptable sum of average costs (avgYES + avgNO). Values < 1.0 are profitable.

## 🚀 Usage

### Starting the Bot

```bash
# Start trading bot
npm start

# Or using ts-node directly
ts-node src/index.ts
```

The bot will:
1. Initialize API credentials
2. Approve USDC allowances
3. Wait for minimum balance
4. Optionally wait for next 15-minute market boundary
5. Start trading loop with adaptive polling

### Automated Redemption

Run the redemption worker separately to automatically redeem winning positions:

```bash
# Run redemption worker (continuous loop)
ts-node src/redeem-holdings.ts

# Run once
ts-node src/redeem-holdings.ts --once

# Dry run
ts-node src/redeem-holdings.ts --dry-run
```

### Manual Redemption

```bash
# Check and redeem from holdings
ts-node src/auto-redeem.ts

# Check specific market
ts-node src/auto-redeem.ts --check <conditionId>

# Redeem from API
ts-node src/auto-redeem.ts --api --max 500
```

### Balance Logging

```bash
# Log balance periodically
npm run balance:log

# Run once
ts-node src/balance-logger.ts --once
```

## 🔧 Technical Details

### Trading Strategy

#### 1. Entry Strategy (Flexible Entry)
- After hedge completion, bot resets and waits for new entry
- **First buy**: Selects whichever token (YES/NO) drops below `COPYTRADE_THRESHOLD`
- Flexible entry allows better timing by choosing the better entry point

#### 2. Hedging Strategy (Strict Alternation)
- After first buy, bot **always alternates** to the opposite side
- Maintains hedge balance by buying both sides
- Tracks lowest price seen (`tempPrice`) for each token

#### 3. Buy Triggers

**a) Depth-Based Buy (Immediate)**
- Triggers when price drops 5% below `tempPrice`
- Catches deep discounts immediately

**b) Second Side Buy (Immediate)**
- After first buy, calculates dynamic threshold: `1 - firstBuyPrice + boost`
- Buys second side immediately when price ≤ `(dynamicThreshold - buffer)`
- No reversal wait - immediate execution for speed

**c) Reversal-Based Buy (Traditional)**
- Triggers when price reverses: `price > (tempPrice + REVERSAL_DELTA)`
- Only used if immediate buys didn't trigger

#### 4. Profitability Guard (sumAvg)
- Calculates weighted average cost: `avgYES + avgNO = sumAvg`
- Only allows buys if `sumAvg <= COPYTRADE_MAX_SUM_AVG` (default: 0.98)
- **FIXED**: Now properly prevents unprofitable trades by returning null when sumAvg would exceed limit

#### 5. Position Limits
- Maximum buys per side: `MAX_BUYS_PER_SIDE` (default: 4)
- Shares per buy: `COPYTRADE_SHARES` (default: 5)
- Total max positions: `4 YES buys × 5 shares + 4 NO buys × 5 shares = 40 shares total`

#### 6. Hedge Completion
- Hedge completes when **both sides** reach `MAX_BUYS_PER_SIDE`
- Bot resets tracking state and waits for next entry opportunity

### State Management

The bot maintains two types of state:

1. **Persistent State** (`src/data/copytrade-state.json`):
   - Tracks positions per market slug
   - Records quantities, costs, buy counts, averages
   - Includes metadata (conditionId, slug, market, upIdx, downIdx)
   - **FIXED**: Data directory is now automatically created if it doesn't exist

2. **In-Memory Tracking** (resets on restart):
   - Tracks current token being monitored
   - Tracks lowest price seen (`tempPrice`)
   - Tracks hedge status and buy attempts

### Performance Optimizations

- **Debounced State Saving**: Batches rapid state updates (50ms debounce)
- **Fire-and-Forget Orders**: Don't wait for order confirmation (faster execution)
- **Adaptive Polling**: Speeds up when opportunities detected, slows down when idle
- **Stale Order Cancellation**: Cancels orders older than 30 seconds
- **Dynamic Price Buffer**: Adjusts buffer based on sumAvg (more aggressive when needed)

### Security Features

- **Credential Management**: Secure API key storage in `src/data/credential.json`
- **Allowance Control**: Automatic USDC approval management
- **Balance Validation**: Pre-order balance checks prevent over-trading
- **Error Handling**: Comprehensive error handling with graceful degradation
- **Private Key Security**: Uses environment variables (never hardcoded)

## 📁 Project Structure

```
Polymarket-Trading-Bot-Gabagool/
├── src/
│   ├── index.ts                 # Main bot entry point
│   ├── auto-redeem.ts           # Automated redemption script
│   ├── redeem.ts                # Manual redemption script
│   ├── redeem-holdings.ts       # Redemption worker (records PnL)
│   ├── balance-logger.ts        # Periodic balance logging
│   ├── data/                    # Data storage (auto-created)
│   │   ├── credential.json      # API credentials (auto-generated)
│   │   ├── copytrade-state.json # Trading state
│   │   └── token-holding.json  # Token holdings database
│   ├── order-builder/           # Trading strategy implementation
│   │   ├── copytrade.ts        # Main bot logic (CopytradeArbBot class)
│   │   ├── gabagool.ts         # Compatibility shim (re-exports copytrade)
│   │   ├── helpers.ts          # Order conversion utilities
│   │   └── types.ts            # Type definitions
│   ├── config/                  # Configuration management
│   │   └── index.ts            # Config loader
│   ├── providers/               # API clients
│   │   ├── clobclient.ts       # CLOB API client
│   │   └── rpcProvider.ts      # RPC provider
│   ├── security/                # Security utilities
│   │   ├── allowance.ts        # Token approval management
│   │   └── createCredential.ts # Credential generation
│   └── utils/                   # Utility functions
│       ├── balance.ts          # Balance checking
│       ├── holdings.ts         # Holdings management (FIXED: auto-creates data dir)
│       ├── redeem.ts           # Redemption logic
│       ├── logger.ts           # Logging utility
│       └── console-file.ts     # File logging setup
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Integration

### Polymarket CLOB Client

The bot uses the official `@polymarket/clob-client` for order execution:

```typescript
import { ClobClient, OrderType, Side } from "@polymarket/clob-client";

const client = await getClobClient();
const response = await this.client.createAndPostOrder(
    userOrder,
    { tickSize, negRisk },
    OrderType.GTC
);
```

### Gamma API

Fetches market data and token IDs:

```typescript
const url = `https://gamma-api.polymarket.com/markets/slug/${slug}`;
const data = await response.json();
const { outcomes, clobTokenIds, conditionId } = data;
```

## 📊 Monitoring & Logging

The bot provides comprehensive logging:

- **Trade Execution**: Logs all buy orders with details
- **State Updates**: Records position changes and averages
- **Redemption Activity**: Tracks redemption operations
- **Error Handling**: Detailed error messages with stack traces
- **Balance Updates**: Displays wallet balances after operations
- **Metrics**: Hourly summary of bot performance

Log files:
- `logs/bot-{date}.log` - All console output (stdout/stderr)
- `logs/pnl.log` - Realized PnL log (append-only)
- `logs/balance.log` - Periodic balance snapshots

Log levels:
- `success`: Successful operations (green)
- `info`: General operational messages (cyan)
- `warning`: Non-critical issues (yellow)
- `error`: Errors requiring attention (red)
- `debug`: Debug messages (magenta, only if `DEBUG=true`)

## 🐛 Bug Fixes Summary

### Fixed Issues

1. **Critical: Unprofitable Trade Prevention** (copytrade.ts)
   - **Issue**: Bot would continue executing orders even when `projectedSumAvg > maxSumAvg`
   - **Fix**: Uncommented `return null;` to properly prevent unprofitable trades
   - **Impact**: Prevents losses from trades that would exceed profitability threshold

2. **Type Safety Improvements** (copytrade.ts)
   - **Issue**: Multiple `@ts-ignore` comments and `as any` casts
   - **Fix**: 
     - Properly typed `normalizeState` function parameter
     - Fixed order property access with proper type checking
     - Improved error handling types
     - Fixed `cancelOrder` call type safety
   - **Impact**: Better type safety, fewer runtime errors

3. **Directory Creation** (holdings.ts, copytrade.ts)
   - **Issue**: Data directory might not exist, causing file write failures
   - **Fix**: 
     - Added `ensureDataDirectory()` function in holdings.ts
     - Added directory check in `saveState()` function
   - **Impact**: Prevents file write errors on first run

4. **API Response Typing** (copytrade.ts)
   - **Issue**: API response typed as `any`
   - **Fix**: Properly typed Gamma API response structure
   - **Impact**: Better type safety and error detection

## ⚠️ Risk Considerations

1. **Market Risk**: Hedging strategy reduces directional risk but doesn't eliminate it
2. **Liquidity Risk**: Orders may not fill completely, especially during volatility
3. **Slippage**: Market orders execute at current market price (may differ from expected)
4. **Gas Costs**: Each transaction incurs Polygon gas fees
5. **API Limits**: Rate limiting may affect order execution
6. **Timing Risk**: 15-minute markets have fixed resolution times
7. **sumAvg Risk**: If sumAvg exceeds 0.98, positions may be unprofitable (now properly guarded)
8. **State Persistence**: Bot state saved to disk (risk of corruption/loss)

**Recommendations**:
- Start with small position sizes
- Monitor sumAvg regularly
- Keep sufficient USDC balance for trading
- Run redemption worker separately
- Review logs regularly for errors
- Test with small amounts before scaling

## 🛠️ Development

### Building

```bash
# Type checking
npm run build

# Run in development
npm start
```

### Testing

```bash
# Test redemption (dry run)
ts-node src/redeem-holdings.ts --dry-run

# Test specific market
ts-node src/auto-redeem.ts --check <conditionId>
```

## 📝 License

ISC

## 🤝 Contributing

Contributions welcome! Please ensure:
- Code follows TypeScript best practices
- All functions are properly typed
- Error handling is comprehensive
- Logging is informative
- Documentation is updated

## 📞 Support

For issues, questions, or contributions:
- Review existing documentation
- Check Polymarket API documentation
- Review logs for error messages

---

**Disclaimer**: This software is provided as-is. Trading cryptocurrencies and prediction markets carries significant risk. Use at your own discretion and never trade more than you can afford to lose.

**Version**: 1.0.0 (Fixed and Improved)
**Last Updated**: 2024

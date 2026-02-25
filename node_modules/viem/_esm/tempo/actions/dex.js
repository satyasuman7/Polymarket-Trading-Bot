import * as Hash from 'ox/Hash';
import * as Hex from 'ox/Hex';
import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { readContract, } from '../../actions/public/readContract.js';
import { watchContractEvent, } from '../../actions/public/watchContractEvent.js';
import { writeContract, } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
/**
 * Buys a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.buy(client, {
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 *   amountOut: parseUnits('100', 6),
 *   maxAmountIn: parseUnits('105', 6),
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function buy(client, parameters) {
    return buy.inner(writeContract, client, parameters);
}
(function (buy) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { tokenIn, tokenOut, amountOut, maxAmountIn, ...rest } = parameters;
        const call = buy.call({ tokenIn, tokenOut, amountOut, maxAmountIn });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    buy.inner = inner;
    /**
     * Defines a call to the `swapExactAmountOut` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, parseUnits, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.buy.call({
     *       tokenIn: '0x20c0...beef',
     *       tokenOut: '0x20c0...babe',
     *       amountOut: parseUnits('100', 6),
     *       maxAmountIn: parseUnits('105', 6),
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { tokenIn, tokenOut, amountOut, maxAmountIn } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'swapExactAmountOut',
            args: [tokenIn, tokenOut, amountOut, maxAmountIn],
        });
    }
    buy.call = call;
})(buy || (buy = {}));
/**
 * Buys a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.buySync(client, {
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 *   amountOut: parseUnits('100', 6),
 *   maxAmountIn: parseUnits('105', 6),
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function buySync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await buy.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
/**
 * Cancels an order from the orderbook.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.cancel(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function cancel(client, parameters) {
    return cancel.inner(writeContract, client, parameters);
}
(function (cancel) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { orderId, ...rest } = parameters;
        const call = cancel.call({ orderId });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    cancel.inner = inner;
    /**
     * Defines a call to the `cancel` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.cancel.call({
     *       orderId: 123n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { orderId } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'cancel',
            args: [orderId],
        });
    }
    cancel.call = call;
    /**
     * Extracts the `OrderCancelled` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderCancelled` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderCancelled',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderCancelled` event not found.');
        return log;
    }
    cancel.extractEvent = extractEvent;
})(cancel || (cancel = {}));
/**
 * Cancels an order from the orderbook.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.cancelSync(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function cancelSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await cancel.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = cancel.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Cancels a stale order from the orderbook.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.cancelStale(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function cancelStale(client, parameters) {
    return cancelStale.inner(writeContract, client, parameters);
}
(function (cancelStale) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { orderId, ...rest } = parameters;
        const call = cancelStale.call({ orderId });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    cancelStale.inner = inner;
    /**
     * Defines a call to the `cancelStaleOrder` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.cancelStale.call({
     *       orderId: 123n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { orderId } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'cancelStaleOrder',
            args: [orderId],
        });
    }
    cancelStale.call = call;
    /**
     * Extracts the `OrderCancelled` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderCancelled` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderCancelled',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderCancelled` event not found.');
        return log;
    }
    cancelStale.extractEvent = extractEvent;
})(cancelStale || (cancelStale = {}));
/**
 * Cancels a stale order from the orderbook and waits for confirmation.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.cancelStaleSync(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function cancelStaleSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await cancelStale.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = cancelStale.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Creates a new trading pair on the DEX.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.createPair(client, {
 *   base: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function createPair(client, parameters) {
    return createPair.inner(writeContract, client, parameters);
}
(function (createPair) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { base, ...rest } = parameters;
        const call = createPair.call({ base });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    createPair.inner = inner;
    /**
     * Defines a call to the `createPair` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.createPair.call({
     *       base: '0x20c0...beef',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { base } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'createPair',
            args: [base],
        });
    }
    createPair.call = call;
    /**
     * Extracts the `PairCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PairCreated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'PairCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`PairCreated` event not found.');
        return log;
    }
    createPair.extractEvent = extractEvent;
})(createPair || (createPair = {}));
/**
 * Creates a new trading pair on the DEX.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.createPairSync(client, {
 *   base: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function createPairSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await createPair.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = createPair.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Gets a user's token balance on the DEX.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const balance = await Actions.dex.getBalance(client, {
 *   account: '0x...',
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The user's token balance on the DEX.
 */
export async function getBalance(client, parameters) {
    const { account: acc = client.account, token, ...rest } = parameters;
    const address = acc ? parseAccount(acc).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...rest,
        ...getBalance.call({ account: address, token }),
    });
}
(function (getBalance) {
    /**
     * Defines a call to the `balanceOf` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, token } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [account, token],
            functionName: 'balanceOf',
        });
    }
    getBalance.call = call;
})(getBalance || (getBalance = {}));
/**
 * Gets the quote for buying a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const amountIn = await Actions.dex.getBuyQuote(client, {
 *   amountOut: parseUnits('100', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The amount of tokenIn needed to buy the specified amountOut.
 */
export async function getBuyQuote(client, parameters) {
    const { tokenIn, tokenOut, amountOut, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getBuyQuote.call({ tokenIn, tokenOut, amountOut }),
    });
}
(function (getBuyQuote) {
    /**
     * Defines a call to the `quoteSwapExactAmountOut` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { tokenIn, tokenOut, amountOut } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [tokenIn, tokenOut, amountOut],
            functionName: 'quoteSwapExactAmountOut',
        });
    }
    getBuyQuote.call = call;
})(getBuyQuote || (getBuyQuote = {}));
/**
 * Gets an order's details from the orderbook.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const order = await Actions.dex.getOrder(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The order details.
 */
export async function getOrder(client, parameters) {
    const { orderId, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getOrder.call({ orderId }),
    });
}
(function (getOrder) {
    /**
     * Defines a call to the `getOrder` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { orderId } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [orderId],
            functionName: 'getOrder',
        });
    }
    getOrder.call = call;
})(getOrder || (getOrder = {}));
/**
 * Gets orderbook information for a trading pair.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const book = await Actions.dex.getOrderbook(client, {
 *   base: '0x20c...11',
 *   quote: '0x20c...20',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The orderbook information.
 */
export async function getOrderbook(client, parameters) {
    const { base, quote, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getOrderbook.call({ base, quote }),
    });
}
(function (getOrderbook) {
    /**
     * Defines a call to the `books` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { base, quote } = args;
        const pairKey = getPairKey(base, quote);
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [pairKey],
            functionName: 'books',
        });
    }
    getOrderbook.call = call;
})(getOrderbook || (getOrderbook = {}));
/**
 * Gets the price level information at a specific tick.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions, Tick } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const level = await Actions.dex.getTickLevel(client, {
 *   base: '0x20c...11',
 *   tick: Tick.fromPrice('1.001'),
 *   isBid: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The price level information.
 */
export async function getTickLevel(client, parameters) {
    const { base, tick, isBid, ...rest } = parameters;
    const [head, tail, totalLiquidity] = await readContract(client, {
        ...rest,
        ...getTickLevel.call({ base, tick, isBid }),
    });
    return { head, tail, totalLiquidity };
}
(function (getTickLevel) {
    /**
     * Defines a call to the `getTickLevel` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { base, tick, isBid } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [base, tick, isBid],
            functionName: 'getTickLevel',
        });
    }
    getTickLevel.call = call;
})(getTickLevel || (getTickLevel = {}));
/**
 * Gets the quote for selling a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const amountOut = await Actions.dex.getSellQuote(client, {
 *   amountIn: parseUnits('100', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The amount of tokenOut received for selling the specified amountIn.
 */
export async function getSellQuote(client, parameters) {
    const { tokenIn, tokenOut, amountIn, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getSellQuote.call({ tokenIn, tokenOut, amountIn }),
    });
}
(function (getSellQuote) {
    /**
     * Defines a call to the `quoteSwapExactAmountIn` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { tokenIn, tokenOut, amountIn } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [tokenIn, tokenOut, amountIn],
            functionName: 'quoteSwapExactAmountIn',
        });
    }
    getSellQuote.call = call;
})(getSellQuote || (getSellQuote = {}));
/**
 * Places a limit order on the orderbook.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions, Tick } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.place(client, {
 *   amount: parseUnits('100', 6),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function place(client, parameters) {
    return place.inner(writeContract, client, parameters);
}
(function (place) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { amount, token, type, tick, ...rest } = parameters;
        const call = place.call({ amount, token, type, tick });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    place.inner = inner;
    /**
     * Defines a call to the `place` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, parseUnits, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions, Tick } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.place.call({
     *       amount: parseUnits('100', 6),
     *       tick: Tick.fromPrice('0.99'),
     *       token: '0x20c0...beef',
     *       type: 'buy',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, amount, type, tick } = args;
        const isBid = type === 'buy';
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'place',
            args: [token, amount, isBid, tick],
        });
    }
    place.call = call;
    /**
     * Extracts the `OrderPlaced` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderPlaced` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderPlaced',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderPlaced` event not found.');
        return log;
    }
    place.extractEvent = extractEvent;
})(place || (place = {}));
/**
 * Places a flip order that automatically flips when filled.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions, Tick } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.placeFlip(client, {
 *   amount: parseUnits('100', 6),
 *   flipTick: Tick.fromPrice('1.01'),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function placeFlip(client, parameters) {
    return placeFlip.inner(writeContract, client, parameters);
}
(function (placeFlip) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { amount, flipTick, tick, token, type, ...rest } = parameters;
        const call = placeFlip.call({ amount, flipTick, tick, token, type });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    placeFlip.inner = inner;
    /**
     * Defines a call to the `placeFlip` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, parseUnits, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions, Tick } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.placeFlip.call({
     *       amount: parseUnits('100', 6),
     *       flipTick: Tick.fromPrice('1.01'),
     *       tick: Tick.fromPrice('0.99'),
     *       token: '0x20c0...beef',
     *       type: 'buy',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, amount, type, tick, flipTick } = args;
        const isBid = type === 'buy';
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'placeFlip',
            args: [token, amount, isBid, tick, flipTick],
        });
    }
    placeFlip.call = call;
    /**
     * Extracts the `OrderPlaced` event (with `isFlipOrder: true`) from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderPlaced` event for a flip order.
     */
    function extractEvent(logs) {
        const parsedLogs = parseEventLogs({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderPlaced',
            strict: true,
        });
        const log = parsedLogs.find((l) => l.args.isFlipOrder);
        if (!log)
            throw new Error('`OrderPlaced` event (flip order) not found.');
        return log;
    }
    placeFlip.extractEvent = extractEvent;
})(placeFlip || (placeFlip = {}));
/**
 * Places a flip order that automatically flips when filled.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions, Tick } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.placeFlipSync(client, {
 *   amount: parseUnits('100', 6),
 *   flipTick: Tick.fromPrice('1.01'),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function placeFlipSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await placeFlip.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = placeFlip.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Places a limit order on the orderbook.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions, Tick } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.placeSync(client, {
 *   amount: parseUnits('100', 6),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function placeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await place.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = place.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Sells a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.sell(client, {
 *   amountIn: parseUnits('100', 6),
 *   minAmountOut: parseUnits('95', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function sell(client, parameters) {
    return sell.inner(writeContract, client, parameters);
}
(function (sell) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { tokenIn, tokenOut, amountIn, minAmountOut, ...rest } = parameters;
        const call = sell.call({ tokenIn, tokenOut, amountIn, minAmountOut });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    sell.inner = inner;
    /**
     * Defines a call to the `swapExactAmountIn` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, parseUnits, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.sell.call({
     *       amountIn: parseUnits('100', 6),
     *       minAmountOut: parseUnits('95', 6),
     *       tokenIn: '0x20c0...beef',
     *       tokenOut: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { tokenIn, tokenOut, amountIn, minAmountOut } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'swapExactAmountIn',
            args: [tokenIn, tokenOut, amountIn, minAmountOut],
        });
    }
    sell.call = call;
})(sell || (sell = {}));
/**
 * Sells a specific amount of tokens.
 *
 * @example
 * ```ts
 * import { createClient, http, parseUnits } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.sellSync(client, {
 *   amountIn: parseUnits('100', 6),
 *   minAmountOut: parseUnits('95', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function sellSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await sell.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
/**
 * Watches for flip order placed events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = Actions.dex.watchFlipOrderPlaced(client, {
 *   onFlipOrderPlaced: (args, log) => {
 *     console.log('Flip order placed:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchFlipOrderPlaced(client, parameters) {
    const { onFlipOrderPlaced, maker, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderPlaced',
        args: {
            ...(maker !== undefined && { maker }),
            ...(token !== undefined && { token }),
        },
        onLogs: (logs) => {
            for (const log of logs) {
                if (log.args.isFlipOrder)
                    onFlipOrderPlaced(log.args, log);
            }
        },
        strict: true,
    });
}
/**
 * Watches for order cancelled events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = Actions.dex.watchOrderCancelled(client, {
 *   onOrderCancelled: (args, log) => {
 *     console.log('Order cancelled:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderCancelled(client, parameters) {
    const { onOrderCancelled, orderId, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderCancelled',
        args: orderId !== undefined ? { orderId } : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onOrderCancelled(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for order filled events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = Actions.dex.watchOrderFilled(client, {
 *   onOrderFilled: (args, log) => {
 *     console.log('Order filled:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderFilled(client, parameters) {
    const { onOrderFilled, maker, taker, orderId, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderFilled',
        args: {
            ...(orderId !== undefined && { orderId }),
            ...(maker !== undefined && { maker }),
            ...(taker !== undefined && { taker }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onOrderFilled(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for order placed events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = Actions.dex.watchOrderPlaced(client, {
 *   onOrderPlaced: (args, log) => {
 *     console.log('Order placed:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderPlaced(client, parameters) {
    const { onOrderPlaced, maker, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderPlaced',
        args: {
            ...(maker !== undefined && { maker }),
            ...(token !== undefined && { token }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onOrderPlaced(log.args, log);
        },
        strict: true,
    });
}
/**
 * Withdraws tokens from the DEX to the caller's wallet.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.dex.withdraw(client, {
 *   amount: 100n,
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function withdraw(client, parameters) {
    return withdraw.inner(writeContract, client, parameters);
}
(function (withdraw) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, amount, ...rest } = parameters;
        const call = withdraw.call({ token, amount });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    withdraw.inner = inner;
    /**
     * Defines a call to the `withdraw` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, parseUnits, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.dex.withdraw.call({
     *       amount: parseUnits('100', 6),
     *       token: '0x20c0...beef',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, amount } = args;
        return defineCall({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'withdraw',
            args: [token, amount],
        });
    }
    withdraw.call = call;
})(withdraw || (withdraw = {}));
/**
 * Withdraws tokens from the DEX to the caller's wallet.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.dex.withdrawSync(client, {
 *   amount: 100n,
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function withdrawSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await withdraw.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
function getPairKey(base, quote) {
    return Hash.keccak256(Hex.concat(base, quote));
}
//# sourceMappingURL=dex.js.map
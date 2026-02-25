import { PoolId, TokenId } from 'ox/tempo';
import { multicall } from '../../actions/public/multicall.js';
import { readContract } from '../../actions/public/readContract.js';
import { watchContractEvent } from '../../actions/public/watchContractEvent.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
/**
 * Gets the reserves for a liquidity pool.
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
 * const pool = await Actions.amm.getPool(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The pool reserves.
 */
export async function getPool(client, parameters) {
    const { userToken, validatorToken, ...rest } = parameters;
    const [pool, totalSupply] = await multicall(client, {
        ...rest,
        contracts: getPool.calls({ userToken, validatorToken }),
        allowFailure: false,
        deployless: true,
    });
    return {
        reserveUserToken: pool.reserveUserToken,
        reserveValidatorToken: pool.reserveValidatorToken,
        totalSupply,
    };
}
(function (getPool) {
    /**
     * Defines calls to the `getPool` and `totalSupply` functions.
     *
     * @param args - Arguments.
     * @returns The calls.
     */
    function calls(args) {
        const { userToken, validatorToken } = args;
        return [
            defineCall({
                address: Addresses.feeManager,
                abi: Abis.feeAmm,
                args: [TokenId.toAddress(userToken), TokenId.toAddress(validatorToken)],
                functionName: 'getPool',
            }),
            defineCall({
                address: Addresses.feeManager,
                abi: Abis.feeAmm,
                args: [PoolId.from({ userToken, validatorToken })],
                functionName: 'totalSupply',
            }),
        ];
    }
    getPool.calls = calls;
})(getPool || (getPool = {}));
/**
 * Gets the LP token balance for an account in a specific pool.
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
 * const poolId = await Actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const balance = await Actions.amm.getLiquidityBalance(client, {
 *   poolId,
 *   address: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The LP token balance.
 */
export async function getLiquidityBalance(client, parameters) {
    const { address, poolId, userToken, validatorToken, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getLiquidityBalance.call({
            address,
            poolId,
            userToken,
            validatorToken,
        }),
    });
}
(function (getLiquidityBalance) {
    /**
     * Defines a call to the `liquidityBalances` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { address } = args;
        const poolId = (() => {
            if ('poolId' in args && args.poolId)
                return args.poolId;
            if ('userToken' in args && 'validatorToken' in args)
                return PoolId.from({
                    userToken: args.userToken,
                    validatorToken: args.validatorToken,
                });
            throw new Error('`poolId`, or `userToken` and `validatorToken` must be provided.');
        })();
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeAmm,
            args: [poolId, address],
            functionName: 'liquidityBalances',
        });
    }
    getLiquidityBalance.call = call;
})(getLiquidityBalance || (getLiquidityBalance = {}));
/**
 * Performs a rebalance swap from validator token to user token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.amm.rebalanceSwap(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function rebalanceSwap(client, parameters) {
    return rebalanceSwap.inner(writeContract, client, parameters);
}
(function (rebalanceSwap) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { userToken, validatorToken, amountOut, to, ...rest } = parameters;
        const call = rebalanceSwap.call({
            userToken,
            validatorToken,
            amountOut,
            to,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    rebalanceSwap.inner = inner;
    /**
     * Defines a call to the `rebalanceSwap` function.
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
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { userToken, validatorToken, amountOut, to } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeAmm,
            functionName: 'rebalanceSwap',
            args: [
                TokenId.toAddress(userToken),
                TokenId.toAddress(validatorToken),
                amountOut,
                to,
            ],
        });
    }
    rebalanceSwap.call = call;
    /**
     * Extracts the `RebalanceSwap` event from logs.
     *
     * @param logs - The logs.
     * @returns The `RebalanceSwap` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.feeAmm,
            logs,
            eventName: 'RebalanceSwap',
            strict: true,
        });
        if (!log)
            throw new Error('`RebalanceSwap` event not found.');
        return log;
    }
    rebalanceSwap.extractEvent = extractEvent;
})(rebalanceSwap || (rebalanceSwap = {}));
/**
 * Performs a rebalance swap from validator token to user token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.amm.rebalanceSwapSync(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function rebalanceSwapSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await rebalanceSwap.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = rebalanceSwap.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Adds liquidity to a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.amm.mint(client, {
 *   userTokenAddress: '0x20c0...beef',
 *   validatorTokenAddress: '0x20c0...babe',
 *   validatorTokenAmount: 100n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function mint(client, parameters) {
    return mint.inner(writeContract, client, parameters);
}
(function (mint) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { to, userTokenAddress, validatorTokenAddress, validatorTokenAmount, ...rest } = parameters;
        const call = mint.call({
            to,
            userTokenAddress,
            validatorTokenAddress,
            validatorTokenAmount,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    mint.inner = inner;
    /**
     * Defines a call to the `mint` function.
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
     *     actions.amm.mint.call({
     *       userTokenAddress: '0x20c0...beef',
     *       validatorTokenAddress: '0x20c0...babe',
     *       validatorTokenAmount: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.mint.call({
     *       userTokenAddress: '0x20c0...babe',
     *       validatorTokenAddress: '0x20c0...babe',
     *       validatorTokenAmount: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { to, userTokenAddress, validatorTokenAddress, validatorTokenAmount, } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeAmm,
            functionName: 'mint',
            args: [
                TokenId.toAddress(userTokenAddress),
                TokenId.toAddress(validatorTokenAddress),
                validatorTokenAmount,
                to,
            ],
        });
    }
    mint.call = call;
    /**
     * Extracts the `Mint` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Mint` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.feeAmm,
            logs,
            eventName: 'Mint',
            strict: true,
        });
        if (!log)
            throw new Error('`Mint` event not found.');
        return log;
    }
    mint.extractEvent = extractEvent;
})(mint || (mint = {}));
/**
 * Adds liquidity to a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.amm.mint(client, {
 *   userTokenAddress: '0x20c0...beef',
 *   validatorTokenAddress: '0x20c0...babe',
 *   validatorTokenAmount: 100n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function mintSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await mint.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = mint.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Removes liquidity from a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hash = await Actions.amm.burn(client, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burn(client, parameters) {
    return burn.inner(writeContract, client, parameters);
}
(function (burn) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { liquidity, to, userToken, validatorToken, ...rest } = parameters;
        const call = burn.call({ liquidity, to, userToken, validatorToken });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    burn.inner = inner;
    /**
     * Defines a call to the `burn` function.
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
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { liquidity, to, userToken, validatorToken } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeAmm,
            functionName: 'burn',
            args: [
                TokenId.toAddress(userToken),
                TokenId.toAddress(validatorToken),
                liquidity,
                to,
            ],
        });
    }
    burn.call = call;
    /**
     * Extracts the `Burn` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Burn` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.feeAmm,
            logs,
            eventName: 'Burn',
            strict: true,
        });
        if (!log)
            throw new Error('`Burn` event not found.');
        return log;
    }
    burn.extractEvent = extractEvent;
})(burn || (burn = {}));
/**
 * Removes liquidity from a pool.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.amm.burnSync(client, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function burnSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await burn.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = burn.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Watches for rebalance swap events.
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
 * const unwatch = actions.amm.watchRebalanceSwap(client, {
 *   onRebalanceSwap: (args, log) => {
 *     console.log('Rebalance swap:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRebalanceSwap(client, parameters) {
    const { onRebalanceSwap, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeAmm,
        eventName: 'RebalanceSwap',
        args: userToken !== undefined && validatorToken !== undefined
            ? {
                userToken: TokenId.toAddress(userToken),
                validatorToken: TokenId.toAddress(validatorToken),
            }
            : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onRebalanceSwap(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for liquidity mint events.
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
 * const unwatch = actions.amm.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Liquidity added:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchMint(client, parameters) {
    const { onMint, to, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeAmm,
        eventName: 'Mint',
        args: {
            to,
            ...(userToken !== undefined && {
                userToken: TokenId.toAddress(userToken),
            }),
            ...(validatorToken !== undefined && {
                validatorToken: TokenId.toAddress(validatorToken),
            }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onMint(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for liquidity burn events.
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
 * const unwatch = actions.amm.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Liquidity removed:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBurn(client, parameters) {
    const { onBurn, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeAmm,
        eventName: 'Burn',
        args: userToken !== undefined && validatorToken !== undefined
            ? {
                userToken: TokenId.toAddress(userToken),
                validatorToken: TokenId.toAddress(validatorToken),
            }
            : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onBurn(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=amm.js.map
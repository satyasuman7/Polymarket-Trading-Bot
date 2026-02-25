import type { Address } from 'abitype';
import { type ReadContractReturnType } from '../../actions/public/readContract.js';
import { type WatchContractEventParameters } from '../../actions/public/watchContractEvent.js';
import { type WriteContractReturnType, writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { BaseErrorType } from '../../errors/base.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractAbiItem, GetEventArgs } from '../../types/contract.js';
import type { Log as viem_Log } from '../../types/log.js';
import type { Compute, UnionOmit } from '../../types/utils.js';
import * as Abis from '../Abis.js';
import type { GetAccountParameter, ReadParameters, WriteParameters } from '../internal/types.js';
import type { TransactionReceipt } from '../Transaction.js';
/**
 * Order type for limit orders.
 */
type OrderType = 'buy' | 'sell';
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
export declare function buy<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: buy.Parameters<chain, account>): Promise<buy.ReturnValue>;
export declare namespace buy {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokenOut to buy. */
        amountOut: bigint;
        /** Maximum amount of tokenIn to spend. */
        maxAmountIn: bigint;
        /** Address of the token to spend. */
        tokenIn: Address;
        /** Address of the token to buy. */
        tokenOut: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: buy.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "swapExactAmountOut";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "tokenIn";
            }, {
                readonly type: "address";
                readonly name: "tokenOut";
            }, {
                readonly type: "uint128";
                readonly name: "amountOut";
            }, {
                readonly type: "uint128";
                readonly name: "maxAmountIn";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "amountIn";
            }];
        }];
        functionName: "swapExactAmountOut";
    } & {
        args: readonly [tokenIn: `0x${string}`, tokenOut: `0x${string}`, amountOut: bigint, maxAmountIn: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function buySync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: buySync.Parameters<chain, account>): Promise<buySync.ReturnValue>;
export declare namespace buySync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = buy.Parameters<chain, account>;
    type Args = buy.Args;
    type ReturnValue = Compute<{
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function cancel<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: cancel.Parameters<chain, account>): Promise<cancel.ReturnValue>;
export declare namespace cancel {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Order ID to cancel. */
        orderId: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: cancel.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "cancel";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "cancel";
    } & {
        args: readonly [orderId: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `OrderCancelled` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderCancelled` event.
     */
    function extractEvent(logs: viem_Log[]): viem_Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createPair";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
        }];
    }, {
        readonly name: "place";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "placeFlip";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "cancel";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "cancelStaleOrder";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "swapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }, {
            readonly type: "uint128";
            readonly name: "minAmountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "swapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }, {
            readonly type: "uint128";
            readonly name: "maxAmountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "quoteSwapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "quoteSwapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "withdraw";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getOrder";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }, {
                readonly type: "address";
                readonly name: "maker";
            }, {
                readonly type: "bytes32";
                readonly name: "bookKey";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "uint128";
                readonly name: "remaining";
            }, {
                readonly type: "uint128";
                readonly name: "prev";
            }, {
                readonly type: "uint128";
                readonly name: "next";
            }, {
                readonly type: "bool";
                readonly name: "isFlip";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
        }];
    }, {
        readonly name: "getTickLevel";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "head";
        }, {
            readonly type: "uint128";
            readonly name: "tail";
        }, {
            readonly type: "uint128";
            readonly name: "totalLiquidity";
        }];
    }, {
        readonly name: "pairKey";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenA";
        }, {
            readonly type: "address";
            readonly name: "tokenB";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "nextOrderId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "books";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "pairKey";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "address";
                readonly name: "quote";
            }, {
                readonly type: "int16";
                readonly name: "bestBidTick";
            }, {
                readonly type: "int16";
                readonly name: "bestAskTick";
            }];
        }];
    }, {
        readonly name: "MIN_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "MAX_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "TICK_SPACING";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "PRICE_SCALE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MIN_ORDER_AMOUNT";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "MIN_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MAX_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "tickToPrice";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
    }, {
        readonly name: "priceToTick";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
        readonly outputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "PairCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "base";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "quote";
            readonly indexed: true;
        }];
    }, {
        readonly name: "OrderPlaced";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isFlipOrder";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }, {
        readonly name: "OrderFilled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "taker";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amountFilled";
        }, {
            readonly type: "bool";
            readonly name: "partialFill";
        }];
    }, {
        readonly name: "OrderCancelled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IdenticalTokens";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TickOutOfBounds";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "InvalidTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidFlipTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientOutput";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "MaxInputExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "BelowMinimumOrderSize";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "amount";
        }];
    }, {
        readonly name: "InvalidBaseToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderNotStale";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "OrderCancelled">;
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
 * const result = await Actions.dex.cancelSync(client, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function cancelSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: cancelSync.Parameters<chain, account>): Promise<cancelSync.ReturnValue>;
export declare namespace cancelSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = cancel.Parameters<chain, account>;
    type Args = cancel.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.stablecoinDex, 'OrderCancelled', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function cancelStale<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: cancelStale.Parameters<chain, account>): Promise<cancelStale.ReturnValue>;
export declare namespace cancelStale {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Order ID to cancel. */
        orderId: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: cancelStale.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "cancelStaleOrder";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "cancelStaleOrder";
    } & {
        args: readonly [orderId: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `OrderCancelled` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderCancelled` event.
     */
    function extractEvent(logs: viem_Log[]): viem_Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createPair";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
        }];
    }, {
        readonly name: "place";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "placeFlip";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "cancel";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "cancelStaleOrder";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "swapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }, {
            readonly type: "uint128";
            readonly name: "minAmountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "swapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }, {
            readonly type: "uint128";
            readonly name: "maxAmountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "quoteSwapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "quoteSwapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "withdraw";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getOrder";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }, {
                readonly type: "address";
                readonly name: "maker";
            }, {
                readonly type: "bytes32";
                readonly name: "bookKey";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "uint128";
                readonly name: "remaining";
            }, {
                readonly type: "uint128";
                readonly name: "prev";
            }, {
                readonly type: "uint128";
                readonly name: "next";
            }, {
                readonly type: "bool";
                readonly name: "isFlip";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
        }];
    }, {
        readonly name: "getTickLevel";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "head";
        }, {
            readonly type: "uint128";
            readonly name: "tail";
        }, {
            readonly type: "uint128";
            readonly name: "totalLiquidity";
        }];
    }, {
        readonly name: "pairKey";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenA";
        }, {
            readonly type: "address";
            readonly name: "tokenB";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "nextOrderId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "books";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "pairKey";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "address";
                readonly name: "quote";
            }, {
                readonly type: "int16";
                readonly name: "bestBidTick";
            }, {
                readonly type: "int16";
                readonly name: "bestAskTick";
            }];
        }];
    }, {
        readonly name: "MIN_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "MAX_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "TICK_SPACING";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "PRICE_SCALE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MIN_ORDER_AMOUNT";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "MIN_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MAX_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "tickToPrice";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
    }, {
        readonly name: "priceToTick";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
        readonly outputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "PairCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "base";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "quote";
            readonly indexed: true;
        }];
    }, {
        readonly name: "OrderPlaced";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isFlipOrder";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }, {
        readonly name: "OrderFilled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "taker";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amountFilled";
        }, {
            readonly type: "bool";
            readonly name: "partialFill";
        }];
    }, {
        readonly name: "OrderCancelled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IdenticalTokens";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TickOutOfBounds";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "InvalidTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidFlipTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientOutput";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "MaxInputExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "BelowMinimumOrderSize";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "amount";
        }];
    }, {
        readonly name: "InvalidBaseToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderNotStale";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "OrderCancelled">;
}
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
export declare function cancelStaleSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: cancelStaleSync.Parameters<chain, account>): Promise<cancelStaleSync.ReturnValue>;
export declare namespace cancelStaleSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = cancelStale.Parameters<chain, account>;
    type Args = cancelStale.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.stablecoinDex, 'OrderCancelled', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function createPair<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: createPair.Parameters<chain, account>): Promise<createPair.ReturnValue>;
export declare namespace createPair {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address of the base token for the pair. */
        base: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: createPair.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "createPair";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "base";
            }];
            readonly outputs: readonly [{
                readonly type: "bytes32";
                readonly name: "key";
            }];
        }];
        functionName: "createPair";
    } & {
        args: readonly [base: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `PairCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PairCreated` event.
     */
    function extractEvent(logs: viem_Log[]): viem_Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createPair";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
        }];
    }, {
        readonly name: "place";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "placeFlip";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "cancel";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "cancelStaleOrder";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "swapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }, {
            readonly type: "uint128";
            readonly name: "minAmountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "swapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }, {
            readonly type: "uint128";
            readonly name: "maxAmountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "quoteSwapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "quoteSwapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "withdraw";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getOrder";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }, {
                readonly type: "address";
                readonly name: "maker";
            }, {
                readonly type: "bytes32";
                readonly name: "bookKey";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "uint128";
                readonly name: "remaining";
            }, {
                readonly type: "uint128";
                readonly name: "prev";
            }, {
                readonly type: "uint128";
                readonly name: "next";
            }, {
                readonly type: "bool";
                readonly name: "isFlip";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
        }];
    }, {
        readonly name: "getTickLevel";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "head";
        }, {
            readonly type: "uint128";
            readonly name: "tail";
        }, {
            readonly type: "uint128";
            readonly name: "totalLiquidity";
        }];
    }, {
        readonly name: "pairKey";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenA";
        }, {
            readonly type: "address";
            readonly name: "tokenB";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "nextOrderId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "books";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "pairKey";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "address";
                readonly name: "quote";
            }, {
                readonly type: "int16";
                readonly name: "bestBidTick";
            }, {
                readonly type: "int16";
                readonly name: "bestAskTick";
            }];
        }];
    }, {
        readonly name: "MIN_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "MAX_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "TICK_SPACING";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "PRICE_SCALE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MIN_ORDER_AMOUNT";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "MIN_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MAX_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "tickToPrice";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
    }, {
        readonly name: "priceToTick";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
        readonly outputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "PairCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "base";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "quote";
            readonly indexed: true;
        }];
    }, {
        readonly name: "OrderPlaced";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isFlipOrder";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }, {
        readonly name: "OrderFilled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "taker";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amountFilled";
        }, {
            readonly type: "bool";
            readonly name: "partialFill";
        }];
    }, {
        readonly name: "OrderCancelled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IdenticalTokens";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TickOutOfBounds";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "InvalidTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidFlipTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientOutput";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "MaxInputExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "BelowMinimumOrderSize";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "amount";
        }];
    }, {
        readonly name: "InvalidBaseToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderNotStale";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "PairCreated">;
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
 * const result = await Actions.dex.createPairSync(client, {
 *   base: '0x20c...11',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function createPairSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: createPairSync.Parameters<chain, account>): Promise<createPairSync.ReturnValue>;
export declare namespace createPairSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = createPair.Parameters<chain, account>;
    type Args = createPair.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.stablecoinDex, 'PairCreated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function getBalance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getBalance.Parameters<account>): Promise<getBalance.ReturnValue>;
export declare namespace getBalance {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account> & Args;
    type Args = {
        /** Address of the account. */
        account: Address;
        /** Address of the token. */
        token: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.stablecoinDex, 'balanceOf', never>;
    /**
     * Defines a call to the `balanceOf` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "balanceOf";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "user";
            }, {
                readonly type: "address";
                readonly name: "token";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
            }];
        }];
        functionName: "balanceOf";
    } & {
        args: readonly [user: `0x${string}`, token: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function getBuyQuote<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getBuyQuote.Parameters): Promise<getBuyQuote.ReturnValue>;
export declare namespace getBuyQuote {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Amount of tokenOut to buy. */
        amountOut: bigint;
        /** Address of the token to spend. */
        tokenIn: Address;
        /** Address of the token to buy. */
        tokenOut: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.stablecoinDex, 'quoteSwapExactAmountOut', never>;
    /**
     * Defines a call to the `quoteSwapExactAmountOut` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "quoteSwapExactAmountOut";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "tokenIn";
            }, {
                readonly type: "address";
                readonly name: "tokenOut";
            }, {
                readonly type: "uint128";
                readonly name: "amountOut";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "amountIn";
            }];
        }];
        functionName: "quoteSwapExactAmountOut";
    } & {
        args: readonly [tokenIn: `0x${string}`, tokenOut: `0x${string}`, amountOut: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function getOrder<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getOrder.Parameters): Promise<getOrder.ReturnValue>;
export declare namespace getOrder {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Order ID to query. */
        orderId: bigint;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.stablecoinDex, 'getOrder', never>;
    /**
     * Defines a call to the `getOrder` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "getOrder";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }];
            readonly outputs: readonly [{
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "uint128";
                    readonly name: "orderId";
                }, {
                    readonly type: "address";
                    readonly name: "maker";
                }, {
                    readonly type: "bytes32";
                    readonly name: "bookKey";
                }, {
                    readonly type: "bool";
                    readonly name: "isBid";
                }, {
                    readonly type: "int16";
                    readonly name: "tick";
                }, {
                    readonly type: "uint128";
                    readonly name: "amount";
                }, {
                    readonly type: "uint128";
                    readonly name: "remaining";
                }, {
                    readonly type: "uint128";
                    readonly name: "prev";
                }, {
                    readonly type: "uint128";
                    readonly name: "next";
                }, {
                    readonly type: "bool";
                    readonly name: "isFlip";
                }, {
                    readonly type: "int16";
                    readonly name: "flipTick";
                }];
            }];
        }];
        functionName: "getOrder";
    } & {
        args: readonly [orderId: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function getOrderbook<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getOrderbook.Parameters): Promise<getOrderbook.ReturnValue>;
export declare namespace getOrderbook {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address of the base token. */
        base: Address;
        /** Address of the quote token. */
        quote: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.stablecoinDex, 'books', never>;
    /**
     * Defines a call to the `books` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "books";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "pairKey";
            }];
            readonly outputs: readonly [{
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "address";
                    readonly name: "base";
                }, {
                    readonly type: "address";
                    readonly name: "quote";
                }, {
                    readonly type: "int16";
                    readonly name: "bestBidTick";
                }, {
                    readonly type: "int16";
                    readonly name: "bestAskTick";
                }];
            }];
        }];
        functionName: "books";
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function getTickLevel<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getTickLevel.Parameters): Promise<getTickLevel.ReturnValue>;
export declare namespace getTickLevel {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address of the base token. */
        base: Address;
        /** Whether to query the bid side (true) or ask side (false). */
        isBid: boolean;
        /** Price tick to query. */
        tick: number;
    };
    type ReturnValue = {
        /** Order ID of the first order at this tick (0 if empty) */
        head: bigint;
        /** Order ID of the last order at this tick (0 if empty) */
        tail: bigint;
        /** Total liquidity available at this tick level */
        totalLiquidity: bigint;
    };
    /**
     * Defines a call to the `getTickLevel` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "getTickLevel";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "head";
            }, {
                readonly type: "uint128";
                readonly name: "tail";
            }, {
                readonly type: "uint128";
                readonly name: "totalLiquidity";
            }];
        }];
        functionName: "getTickLevel";
    } & {
        args: readonly [base: `0x${string}`, tick: number, boolean];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
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
export declare function getSellQuote<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getSellQuote.Parameters): Promise<getSellQuote.ReturnValue>;
export declare namespace getSellQuote {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Amount of tokenIn to sell. */
        amountIn: bigint;
        /** Address of the token to sell. */
        tokenIn: Address;
        /** Address of the token to receive. */
        tokenOut: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.stablecoinDex, 'quoteSwapExactAmountIn', never>;
    /**
     * Defines a call to the `quoteSwapExactAmountIn` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "quoteSwapExactAmountIn";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "tokenIn";
            }, {
                readonly type: "address";
                readonly name: "tokenOut";
            }, {
                readonly type: "uint128";
                readonly name: "amountIn";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "amountOut";
            }];
        }];
        functionName: "quoteSwapExactAmountIn";
    } & {
        args: readonly [tokenIn: `0x${string}`, tokenOut: `0x${string}`, amountIn: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
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
export declare function place<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: place.Parameters<chain, account>): Promise<place.ReturnValue>;
export declare namespace place {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to place in the order. */
        amount: bigint;
        /** Price tick for the order. */
        tick: number;
        /** Address of the base token. */
        token: Address;
        /** Order type - 'buy' to buy the token, 'sell' to sell it. */
        type: OrderType;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: place.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "place";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }];
        }];
        functionName: "place";
    } & {
        args: readonly [token: `0x${string}`, amount: bigint, boolean, tick: number];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `OrderPlaced` event from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderPlaced` event.
     */
    function extractEvent(logs: viem_Log[]): viem_Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createPair";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
        }];
    }, {
        readonly name: "place";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "placeFlip";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "cancel";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "cancelStaleOrder";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "swapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }, {
            readonly type: "uint128";
            readonly name: "minAmountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "swapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }, {
            readonly type: "uint128";
            readonly name: "maxAmountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "quoteSwapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "quoteSwapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "withdraw";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getOrder";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }, {
                readonly type: "address";
                readonly name: "maker";
            }, {
                readonly type: "bytes32";
                readonly name: "bookKey";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "uint128";
                readonly name: "remaining";
            }, {
                readonly type: "uint128";
                readonly name: "prev";
            }, {
                readonly type: "uint128";
                readonly name: "next";
            }, {
                readonly type: "bool";
                readonly name: "isFlip";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
        }];
    }, {
        readonly name: "getTickLevel";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "head";
        }, {
            readonly type: "uint128";
            readonly name: "tail";
        }, {
            readonly type: "uint128";
            readonly name: "totalLiquidity";
        }];
    }, {
        readonly name: "pairKey";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenA";
        }, {
            readonly type: "address";
            readonly name: "tokenB";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "nextOrderId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "books";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "pairKey";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "address";
                readonly name: "quote";
            }, {
                readonly type: "int16";
                readonly name: "bestBidTick";
            }, {
                readonly type: "int16";
                readonly name: "bestAskTick";
            }];
        }];
    }, {
        readonly name: "MIN_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "MAX_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "TICK_SPACING";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "PRICE_SCALE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MIN_ORDER_AMOUNT";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "MIN_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MAX_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "tickToPrice";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
    }, {
        readonly name: "priceToTick";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
        readonly outputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "PairCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "base";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "quote";
            readonly indexed: true;
        }];
    }, {
        readonly name: "OrderPlaced";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isFlipOrder";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }, {
        readonly name: "OrderFilled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "taker";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amountFilled";
        }, {
            readonly type: "bool";
            readonly name: "partialFill";
        }];
    }, {
        readonly name: "OrderCancelled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IdenticalTokens";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TickOutOfBounds";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "InvalidTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidFlipTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientOutput";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "MaxInputExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "BelowMinimumOrderSize";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "amount";
        }];
    }, {
        readonly name: "InvalidBaseToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderNotStale";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "OrderPlaced">;
}
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
export declare function placeFlip<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: placeFlip.Parameters<chain, account>): Promise<placeFlip.ReturnValue>;
export declare namespace placeFlip {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to place in the order. */
        amount: bigint;
        /** Target tick to flip to when order is filled. */
        flipTick: number;
        /** Price tick for the order. */
        tick: number;
        /** Address of the base token. */
        token: Address;
        /** Order type - 'buy' to buy the token, 'sell' to sell it. */
        type: OrderType;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: placeFlip.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "placeFlip";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }];
        }];
        functionName: "placeFlip";
    } & {
        args: readonly [token: `0x${string}`, amount: bigint, boolean, tick: number, number];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `OrderPlaced` event (with `isFlipOrder: true`) from logs.
     *
     * @param logs - The logs.
     * @returns The `OrderPlaced` event for a flip order.
     */
    function extractEvent(logs: viem_Log[]): viem_Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createPair";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
        }];
    }, {
        readonly name: "place";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "placeFlip";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
    }, {
        readonly name: "cancel";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "cancelStaleOrder";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "swapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }, {
            readonly type: "uint128";
            readonly name: "minAmountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "swapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }, {
            readonly type: "uint128";
            readonly name: "maxAmountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "quoteSwapExactAmountIn";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "quoteSwapExactAmountOut";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenIn";
        }, {
            readonly type: "address";
            readonly name: "tokenOut";
        }, {
            readonly type: "uint128";
            readonly name: "amountOut";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "withdraw";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getOrder";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "orderId";
            }, {
                readonly type: "address";
                readonly name: "maker";
            }, {
                readonly type: "bytes32";
                readonly name: "bookKey";
            }, {
                readonly type: "bool";
                readonly name: "isBid";
            }, {
                readonly type: "int16";
                readonly name: "tick";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }, {
                readonly type: "uint128";
                readonly name: "remaining";
            }, {
                readonly type: "uint128";
                readonly name: "prev";
            }, {
                readonly type: "uint128";
                readonly name: "next";
            }, {
                readonly type: "bool";
                readonly name: "isFlip";
            }, {
                readonly type: "int16";
                readonly name: "flipTick";
            }];
        }];
    }, {
        readonly name: "getTickLevel";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
            readonly name: "head";
        }, {
            readonly type: "uint128";
            readonly name: "tail";
        }, {
            readonly type: "uint128";
            readonly name: "totalLiquidity";
        }];
    }, {
        readonly name: "pairKey";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "tokenA";
        }, {
            readonly type: "address";
            readonly name: "tokenB";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "nextOrderId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "books";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "pairKey";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "base";
            }, {
                readonly type: "address";
                readonly name: "quote";
            }, {
                readonly type: "int16";
                readonly name: "bestBidTick";
            }, {
                readonly type: "int16";
                readonly name: "bestAskTick";
            }];
        }];
    }, {
        readonly name: "MIN_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "MAX_TICK";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "TICK_SPACING";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "int16";
        }];
    }, {
        readonly name: "PRICE_SCALE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MIN_ORDER_AMOUNT";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "MIN_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "MAX_PRICE";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint32";
        }];
    }, {
        readonly name: "tickToPrice";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
        readonly outputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
    }, {
        readonly name: "priceToTick";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "uint32";
            readonly name: "price";
        }];
        readonly outputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "PairCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "key";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "base";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "quote";
            readonly indexed: true;
        }];
    }, {
        readonly name: "OrderPlaced";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "bool";
            readonly name: "isFlipOrder";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }, {
        readonly name: "OrderFilled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "maker";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "taker";
            readonly indexed: true;
        }, {
            readonly type: "uint128";
            readonly name: "amountFilled";
        }, {
            readonly type: "bool";
            readonly name: "partialFill";
        }];
    }, {
        readonly name: "OrderCancelled";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PairAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IdenticalTokens";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TickOutOfBounds";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "int16";
            readonly name: "tick";
        }];
    }, {
        readonly name: "InvalidTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidFlipTick";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientOutput";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "MaxInputExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "BelowMinimumOrderSize";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint128";
            readonly name: "amount";
        }];
    }, {
        readonly name: "InvalidBaseToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OrderNotStale";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "OrderPlaced">;
}
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
export declare function placeFlipSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: placeFlipSync.Parameters<chain, account>): Promise<placeFlipSync.ReturnValue>;
export declare namespace placeFlipSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = placeFlip.Parameters<chain, account>;
    type Args = placeFlip.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.stablecoinDex, 'OrderPlaced', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function placeSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: placeSync.Parameters<chain, account>): Promise<placeSync.ReturnValue>;
export declare namespace placeSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = place.Parameters<chain, account>;
    type Args = place.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.stablecoinDex, 'OrderPlaced', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function sell<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: sell.Parameters<chain, account>): Promise<sell.ReturnValue>;
export declare namespace sell {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokenIn to sell. */
        amountIn: bigint;
        /** Minimum amount of tokenOut to receive. */
        minAmountOut: bigint;
        /** Address of the token to sell. */
        tokenIn: Address;
        /** Address of the token to receive. */
        tokenOut: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: sell.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "swapExactAmountIn";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "tokenIn";
            }, {
                readonly type: "address";
                readonly name: "tokenOut";
            }, {
                readonly type: "uint128";
                readonly name: "amountIn";
            }, {
                readonly type: "uint128";
                readonly name: "minAmountOut";
            }];
            readonly outputs: readonly [{
                readonly type: "uint128";
                readonly name: "amountOut";
            }];
        }];
        functionName: "swapExactAmountIn";
    } & {
        args: readonly [tokenIn: `0x${string}`, tokenOut: `0x${string}`, amountIn: bigint, minAmountOut: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
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
export declare function sellSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: sellSync.Parameters<chain, account>): Promise<sellSync.ReturnValue>;
export declare namespace sellSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = sell.Parameters<chain, account>;
    type Args = sell.Args;
    type ReturnValue = Compute<{
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
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
export declare function watchFlipOrderPlaced<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchFlipOrderPlaced.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchFlipOrderPlaced {
    type Args = GetEventArgs<typeof Abis.stablecoinDex, 'OrderPlaced', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.stablecoinDex, 'OrderPlaced'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.stablecoinDex, 'OrderPlaced', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Address of the maker to filter events. */
        maker?: Address | undefined;
        /** Callback to invoke when a flip order is placed. */
        onFlipOrderPlaced: (args: Args, log: Log) => void;
        /** Address of the token to filter events. */
        token?: Address | undefined;
    };
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
export declare function watchOrderCancelled<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchOrderCancelled.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchOrderCancelled {
    type Args = GetEventArgs<typeof Abis.stablecoinDex, 'OrderCancelled', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.stablecoinDex, 'OrderCancelled'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.stablecoinDex, 'OrderCancelled', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when an order is cancelled. */
        onOrderCancelled: (args: Args, log: Log) => void;
        /** Order ID to filter events. */
        orderId?: bigint | undefined;
    };
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
export declare function watchOrderFilled<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchOrderFilled.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchOrderFilled {
    type Args = GetEventArgs<typeof Abis.stablecoinDex, 'OrderFilled', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.stablecoinDex, 'OrderFilled'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.stablecoinDex, 'OrderFilled', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Address of the maker to filter events. */
        maker?: Address | undefined;
        /** Callback to invoke when an order is filled. */
        onOrderFilled: (args: Args, log: Log) => void;
        /** Order ID to filter events. */
        orderId?: bigint | undefined;
        /** Address of the taker to filter events. */
        taker?: Address | undefined;
    };
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
export declare function watchOrderPlaced<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchOrderPlaced.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchOrderPlaced {
    type Args = GetEventArgs<typeof Abis.stablecoinDex, 'OrderPlaced', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.stablecoinDex, 'OrderPlaced'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.stablecoinDex, 'OrderPlaced', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Address of the maker to filter events. */
        maker?: Address | undefined;
        /** Callback to invoke when an order is placed. */
        onOrderPlaced: (args: Args, log: Log) => void;
        /** Address of the token to filter events. */
        token?: Address | undefined;
    };
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
export declare function withdraw<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: withdraw.Parameters<chain, account>): Promise<withdraw.ReturnValue>;
export declare namespace withdraw {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount to withdraw. */
        amount: bigint;
        /** Address of the token to withdraw. */
        token: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: withdraw.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "withdraw";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint128";
                readonly name: "amount";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "withdraw";
    } & {
        args: readonly [token: `0x${string}`, amount: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
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
export declare function withdrawSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: withdrawSync.Parameters<chain, account>): Promise<withdrawSync.ReturnValue>;
export declare namespace withdrawSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = withdraw.Parameters<chain, account>;
    type Args = withdraw.Args;
    type ReturnValue = Compute<{
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
export {};
//# sourceMappingURL=dex.d.ts.map
import type { Address } from 'abitype';
import { TokenId } from 'ox/tempo';
import type { Account } from '../../accounts/types.js';
import type { MulticallParameters } from '../../actions/public/multicall.js';
import type { ReadContractReturnType } from '../../actions/public/readContract.js';
import type { WatchContractEventParameters } from '../../actions/public/watchContractEvent.js';
import type { WriteContractReturnType } from '../../actions/wallet/writeContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractAbiItem, GetEventArgs } from '../../types/contract.js';
import type { Log, Log as viem_Log } from '../../types/log.js';
import type { Hex } from '../../types/misc.js';
import type { TransactionReceipt } from '../../types/transaction.js';
import type { Compute, OneOf, UnionOmit } from '../../types/utils.js';
import * as Abis from '../Abis.js';
import type { ReadParameters, WriteParameters } from '../internal/types.js';
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
export declare function getPool<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getPool.Parameters): Promise<getPool.ReturnValue>;
export declare namespace getPool {
    type Parameters = UnionOmit<MulticallParameters, 'allowFailure' | 'contracts' | 'deployless'> & Args;
    type Args = {
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = Compute<{
        /** Reserve of user token. */
        reserveUserToken: bigint;
        /** Reserve of validator token. */
        reserveValidatorToken: bigint;
        /** Total supply of LP tokens. */
        totalSupply: bigint;
    }>;
    /**
     * Defines calls to the `getPool` and `totalSupply` functions.
     *
     * @param args - Arguments.
     * @returns The calls.
     */
    function calls(args: Args): readonly [{
        abi: [{
            readonly name: "getPool";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "userToken";
            }, {
                readonly type: "address";
                readonly name: "validatorToken";
            }];
            readonly outputs: readonly [{
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "uint128";
                    readonly name: "reserveUserToken";
                }, {
                    readonly type: "uint128";
                    readonly name: "reserveValidatorToken";
                }];
            }];
        }];
        functionName: "getPool";
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    }, {
        abi: [{
            readonly name: "totalSupply";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "poolId";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
            }];
        }];
        functionName: "totalSupply";
    } & {
        args: readonly [poolId: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    }];
}
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
export declare function getLiquidityBalance<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getLiquidityBalance.Parameters): Promise<getLiquidityBalance.ReturnValue>;
export declare namespace getLiquidityBalance {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Address to check balance for. */
        address: Address;
    } & OneOf<{
        /** Pool ID. */
        poolId: Hex;
    } | {
        /** User token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    }>;
    type ReturnValue = ReadContractReturnType<typeof Abis.feeAmm, 'liquidityBalances', never>;
    /**
     * Defines a call to the `liquidityBalances` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "liquidityBalances";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "poolId";
            }, {
                readonly type: "address";
                readonly name: "user";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
            }];
        }];
        functionName: "liquidityBalances";
    } & {
        args: readonly [poolId: `0x${string}`, user: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
}
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
export declare function rebalanceSwap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: rebalanceSwap.Parameters<chain, account>): Promise<rebalanceSwap.ReturnValue>;
export declare namespace rebalanceSwap {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of user token to receive. */
        amountOut: bigint;
        /** Address to send the user token to. */
        to: Address;
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: rebalanceSwap.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "rebalanceSwap";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "userToken";
            }, {
                readonly type: "address";
                readonly name: "validatorToken";
            }, {
                readonly type: "uint256";
                readonly name: "amountOut";
            }, {
                readonly type: "address";
                readonly name: "to";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
                readonly name: "amountIn";
            }];
        }];
        functionName: "rebalanceSwap";
    } & {
        args: readonly [`0x${string}`, `0x${string}`, amountOut: bigint, to: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `RebalanceSwap` event from logs.
     *
     * @param logs - The logs.
     * @returns The `RebalanceSwap` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "M";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "N";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "SCALE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "MIN_LIQUIDITY";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getPoolId";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "getPool";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "pools";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "liquidityBalances";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "rebalanceSwap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
    }, {
        readonly name: "RebalanceSwap";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "swapper";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountIn";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "IdenticalAddresses";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientReserves";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "DivisionByZero";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSwapCalculation";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "RebalanceSwap">;
}
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
export declare function rebalanceSwapSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: rebalanceSwapSync.Parameters<chain, account>): Promise<rebalanceSwapSync.ReturnValue>;
export declare namespace rebalanceSwapSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = rebalanceSwap.Parameters<chain, account>;
    type Args = rebalanceSwap.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.feeAmm, 'RebalanceSwap', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
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
export declare function mint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<mint.ReturnValue>;
export declare namespace mint {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address to mint LP tokens to. */
        to: Address;
        /** User token address. */
        userTokenAddress: TokenId.TokenIdOrAddress;
        /** Validator token address. */
        validatorTokenAddress: TokenId.TokenIdOrAddress;
        /** Amount of validator token to add. */
        validatorTokenAmount: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "mint";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "userToken";
            }, {
                readonly type: "address";
                readonly name: "validatorToken";
            }, {
                readonly type: "uint256";
                readonly name: "amountValidatorToken";
            }, {
                readonly type: "address";
                readonly name: "to";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
                readonly name: "liquidity";
            }];
        }];
        functionName: "mint";
    } & {
        args: readonly [`0x${string}`, `0x${string}`, bigint, to: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `Mint` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Mint` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "M";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "N";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "SCALE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "MIN_LIQUIDITY";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getPoolId";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "getPool";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "pools";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "liquidityBalances";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "rebalanceSwap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
    }, {
        readonly name: "RebalanceSwap";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "swapper";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountIn";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "IdenticalAddresses";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientReserves";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "DivisionByZero";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSwapCalculation";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Mint">;
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
 * @returns The transaction receipt and event data.
 */
export declare function mintSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mintSync.Parameters<chain, account>): Promise<mintSync.ReturnValue>;
export declare namespace mintSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = mint.Parameters<chain, account>;
    type Args = mint.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.feeAmm, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
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
export declare function burn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<burn.ReturnValue>;
export declare namespace burn {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of LP tokens to burn. */
        liquidity: bigint;
        /** Address to send tokens to. */
        to: Address;
        /** Address or ID of the user token. */
        userToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the validator token. */
        validatorToken: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<ReturnType<action>>;
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
    function call(args: Args): {
        abi: [{
            readonly name: "burn";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "userToken";
            }, {
                readonly type: "address";
                readonly name: "validatorToken";
            }, {
                readonly type: "uint256";
                readonly name: "liquidity";
            }, {
                readonly type: "address";
                readonly name: "to";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
                readonly name: "amountUserToken";
            }, {
                readonly type: "uint256";
                readonly name: "amountValidatorToken";
            }];
        }];
        functionName: "burn";
    } & {
        args: readonly [`0x${string}`, `0x${string}`, liquidity: bigint, to: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: Hex;
        to: Address;
    };
    /**
     * Extracts the `Burn` event from logs.
     *
     * @param logs - The logs.
     * @returns The `Burn` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "M";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "N";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "SCALE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "MIN_LIQUIDITY";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getPoolId";
        readonly type: "function";
        readonly stateMutability: "pure";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "getPool";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "pools";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint128";
                readonly name: "reserveUserToken";
            }, {
                readonly type: "uint128";
                readonly name: "reserveValidatorToken";
            }];
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "liquidityBalances";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "poolId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "rebalanceSwap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
            readonly name: "amountIn";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountUserToken";
        }, {
            readonly type: "uint256";
            readonly name: "amountValidatorToken";
        }, {
            readonly type: "uint256";
            readonly name: "liquidity";
        }, {
            readonly type: "address";
            readonly name: "to";
        }];
    }, {
        readonly name: "RebalanceSwap";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "userToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "validatorToken";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "swapper";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amountIn";
        }, {
            readonly type: "uint256";
            readonly name: "amountOut";
        }];
    }, {
        readonly name: "IdenticalAddresses";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientReserves";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "DivisionByZero";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSwapCalculation";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Burn">;
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
export declare function burnSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnSync.Parameters<chain, account>): Promise<burnSync.ReturnValue>;
export declare namespace burnSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = burn.Parameters<chain, account>;
    type Args = burn.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.feeAmm, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
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
export declare function watchRebalanceSwap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchRebalanceSwap.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchRebalanceSwap {
    type Args = GetEventArgs<typeof Abis.feeAmm, 'RebalanceSwap', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.feeAmm, 'RebalanceSwap'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.feeAmm, 'RebalanceSwap', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a rebalance swap occurs. */
        onRebalanceSwap: (args: Args, log: Log) => void;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
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
export declare function watchMint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchMint.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchMint {
    type Args = GetEventArgs<typeof Abis.feeAmm, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.feeAmm, 'Mint'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.feeAmm, 'Mint', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when liquidity is added. */
        onMint: (args: Args, log: Log) => void;
        /** Address of the sender to filter events. */
        sender?: Address | undefined;
        /** Address of the recipient to filter events. */
        to?: Address | undefined;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
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
export declare function watchBurn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBurn.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchBurn {
    type Args = GetEventArgs<typeof Abis.feeAmm, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.feeAmm, 'Burn'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.feeAmm, 'Burn', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when liquidity is removed. */
        onBurn: (args: Args, log: Log) => void;
        /** Address or ID of the user token to filter events. */
        userToken?: TokenId.TokenIdOrAddress | undefined;
        /** Address or ID of the validator token to filter events. */
        validatorToken?: TokenId.TokenIdOrAddress | undefined;
    };
}
//# sourceMappingURL=amm.d.ts.map
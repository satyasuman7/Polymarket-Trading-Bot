import type { Address } from 'abitype';
import { TokenId } from 'ox/tempo';
import type { Account } from '../../accounts/types.js';
import type { WatchContractEventParameters } from '../../actions/public/watchContractEvent.js';
import type { WriteContractReturnType } from '../../actions/wallet/writeContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { BaseErrorType } from '../../errors/base.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractAbiItem, GetEventArgs } from '../../types/contract.js';
import type { Log, Log as viem_Log } from '../../types/log.js';
import type { Compute, UnionOmit } from '../../types/utils.js';
import * as Abis from '../Abis.js';
import type { GetAccountParameter, ReadParameters, WriteParameters } from '../internal/types.js';
import type { TransactionReceipt } from '../Transaction.js';
/**
 * Gets the user's default fee token.
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
 * const { address, id } = await Actions.fee.getUserToken(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function getUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, ...parameters: account extends Account ? [getUserToken.Parameters<account>] | [] : [getUserToken.Parameters<account>]): Promise<getUserToken.ReturnValue>;
export declare namespace getUserToken {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account>;
    type Args = {
        /** Account address. */
        account: Address;
    };
    type ReturnValue = Compute<{
        address: Address;
        id: bigint;
    } | null>;
    /**
     * Defines a call to the `userTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "userTokens";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "user";
            }];
            readonly outputs: readonly [{
                readonly type: "address";
            }];
        }];
        functionName: "userTokens";
    } & {
        args: readonly [user: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Sets the user's default fee token.
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
 * const hash = await Actions.fee.setUserToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setUserToken.Parameters<chain, account>): Promise<setUserToken.ReturnValue>;
export declare namespace setUserToken {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setUserToken.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setUserToken` function.
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
     *     actions.fee.setUserToken.call({
     *       token: '0x20c0...beef',
     *     }),
     *     actions.fee.setUserToken.call({
     *       token: '0x20c0...babe',
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
            readonly name: "setUserToken";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "token";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setUserToken";
    } & {
        args: readonly [token: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "userTokens";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "validatorTokens";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "setUserToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setValidatorToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "distributeFees";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "collectedFees";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "UserTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }];
    }, {
        readonly name: "ValidatorTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }];
    }, {
        readonly name: "FeesDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "OnlyValidator";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OnlySystemContract";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PoolDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientFeeTokenBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InternalError";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "CannotChangeWithinBlock";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "CannotChangeWithPendingFees";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TokenPolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "UserTokenSet">;
}
/**
 * Sets the user's default fee token.
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
 * const result = await Actions.fee.setUserTokenSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setUserTokenSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setUserTokenSync.Parameters<chain, account>): Promise<setUserTokenSync.ReturnValue>;
export declare namespace setUserTokenSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setUserToken.Parameters<chain, account>;
    type Args = setUserToken.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.feeManager, 'UserTokenSet', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Watches for user token set events.
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
 * const unwatch = actions.fee.watchSetUserToken(client, {
 *   onUserTokenSet: (args, log) => {
 *     console.log('User token set:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchSetUserToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchSetUserToken.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchSetUserToken {
    type Args = GetEventArgs<typeof Abis.feeManager, 'UserTokenSet', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.feeManager, 'UserTokenSet'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.feeManager, 'UserTokenSet', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a user token is set. */
        onUserTokenSet: (args: Args, log: Log) => void;
    };
}
/**
 * Gets the validator's preferred fee token.
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
 * const { address, id } = await Actions.fee.getValidatorToken(client, {
 *   validator: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The validator's preferred fee token, or null if not set.
 */
export declare function getValidatorToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getValidatorToken.Parameters): Promise<getValidatorToken.ReturnValue>;
export declare namespace getValidatorToken {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Validator address. */
        validator: Address;
    };
    type ReturnValue = Compute<{
        address: Address;
        id: bigint;
    } | null>;
    /**
     * Defines a call to the `validatorTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "validatorTokens";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "validator";
            }];
            readonly outputs: readonly [{
                readonly type: "address";
            }];
        }];
        functionName: "validatorTokens";
    } & {
        args: readonly [validator: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Sets the validator's preferred fee token.
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
 * const hash = await Actions.fee.setValidatorToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setValidatorToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setValidatorToken.Parameters<chain, account>): Promise<setValidatorToken.ReturnValue>;
export declare namespace setValidatorToken {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setValidatorToken.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setValidatorToken` function.
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
     *     actions.fee.setValidatorToken.call({
     *       token: '0x20c0...beef',
     *     }),
     *     actions.fee.setValidatorToken.call({
     *       token: '0x20c0...babe',
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
            readonly name: "setValidatorToken";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "token";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setValidatorToken";
    } & {
        args: readonly [token: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "userTokens";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "validatorTokens";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "setUserToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setValidatorToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "distributeFees";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "collectedFees";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "UserTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "user";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }];
    }, {
        readonly name: "ValidatorTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }];
    }, {
        readonly name: "FeesDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "validator";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "OnlyValidator";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "OnlySystemContract";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PoolDoesNotExist";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InsufficientFeeTokenBalance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InternalError";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "CannotChangeWithinBlock";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "CannotChangeWithPendingFees";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TokenPolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "ValidatorTokenSet">;
}
/**
 * Sets the validator's preferred fee token.
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
 * const result = await Actions.fee.setValidatorTokenSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setValidatorTokenSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setValidatorTokenSync.Parameters<chain, account>): Promise<setValidatorTokenSync.ReturnValue>;
export declare namespace setValidatorTokenSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setValidatorToken.Parameters<chain, account>;
    type Args = setValidatorToken.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.feeManager, 'ValidatorTokenSet', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Watches for validator token set events.
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
 * const unwatch = actions.fee.watchSetValidatorToken(client, {
 *   onValidatorTokenSet: (args, log) => {
 *     console.log('Validator token set:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchSetValidatorToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchSetValidatorToken.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchSetValidatorToken {
    type Args = GetEventArgs<typeof Abis.feeManager, 'ValidatorTokenSet', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.feeManager, 'ValidatorTokenSet'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.feeManager, 'ValidatorTokenSet', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a validator token is set. */
        onValidatorTokenSet: (args: Args, log: Log) => void;
    };
}
//# sourceMappingURL=fee.d.ts.map
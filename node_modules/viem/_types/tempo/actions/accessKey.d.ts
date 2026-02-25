import type { Address } from 'abitype';
import type { Account } from '../../accounts/types.js';
import type { ReadContractReturnType } from '../../actions/public/readContract.js';
import { sendTransaction } from '../../actions/wallet/sendTransaction.js';
import { sendTransactionSync } from '../../actions/wallet/sendTransactionSync.js';
import type { WriteContractReturnType } from '../../actions/wallet/writeContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { BaseErrorType } from '../../errors/base.js';
import type { Chain } from '../../types/chain.js';
import type { GetEventArgs } from '../../types/contract.js';
import type { Log } from '../../types/log.js';
import type { Compute } from '../../types/utils.js';
import * as Abis from '../Abis.js';
import type { AccessKeyAccount, RootAccount } from '../Account.js';
import { signKeyAuthorization } from '../Account.js';
import type { GetAccountParameter, ReadParameters, WriteParameters } from '../internal/types.js';
import type { TransactionReceipt } from '../Transaction.js';
/**
 * Authorizes an access key by signing a key authorization and sending a transaction.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions, Account } from 'viem/tempo'
 * import { generatePrivateKey } from 'viem/accounts'
 *
 * const account = Account.from({ privateKey: '0x...' })
 * const client = createClient({
 *   account,
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const accessKey = Account.fromP256(generatePrivateKey(), {
 *   access: account,
 * })
 *
 * const hash = await Actions.accessKey.authorize(client, {
 *   accessKey,
 *   expiry: Math.floor((Date.now() + 30_000) / 1000),
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function authorize<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: authorize.Parameters<chain, account>): Promise<authorize.ReturnValue>;
export declare namespace authorize {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The access key to authorize. */
        accessKey: Pick<AccessKeyAccount, 'accessKeyAddress' | 'keyType'>;
        /** Unix timestamp when the key expires. */
        expiry?: number | undefined;
        /** Spending limits per token. */
        limits?: {
            token: Address;
            limit: bigint;
        }[] | undefined;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof sendTransaction | typeof sendTransactionSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: authorize.Parameters<chain, account>): Promise<ReturnType<action>>;
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "authorizeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }, {
            readonly type: "bool";
            readonly name: "enforceLimits";
        }, {
            readonly type: "tuple[]";
            readonly name: "limits";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "updateSpendingLimit";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "signatureType";
            }, {
                readonly type: "address";
                readonly name: "keyId";
            }, {
                readonly type: "uint64";
                readonly name: "expiry";
            }, {
                readonly type: "bool";
                readonly name: "enforceLimits";
            }, {
                readonly type: "bool";
                readonly name: "isRevoked";
            }];
        }];
    }, {
        readonly name: "getRemainingLimit";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getTransactionKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "KeyAuthorized";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }];
    }, {
        readonly name: "KeyRevoked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SpendingLimitUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
    }, {
        readonly name: "UnauthorizedCaller";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyExpired";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SpendingLimitExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSignatureType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ZeroPublicKey";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ExpiryInPast";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyRevoked";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "KeyAuthorized">;
}
/**
 * Authorizes an access key and waits for the transaction receipt.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions, Account } from 'viem/tempo'
 * import { generatePrivateKey } from 'viem/accounts'
 *
 * const account = Account.from({ privateKey: '0x...' })
 * const client = createClient({
 *   account,
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const accessKey = Account.fromP256(generatePrivateKey(), {
 *   access: account,
 * })
 *
 * const { receipt, ...result } = await Actions.accessKey.authorizeSync(client, {
 *   accessKey,
 *   expiry: Math.floor((Date.now() + 30_000) / 1000),
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function authorizeSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: authorizeSync.Parameters<chain, account>): Promise<authorizeSync.ReturnValue>;
export declare namespace authorizeSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = authorize.Parameters<chain, account>;
    type Args = authorize.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.accountKeychain, 'KeyAuthorized', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Revokes an authorized access key.
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
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const hash = await Actions.accessKey.revoke(client, {
 *   accessKey: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function revoke<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: revoke.Parameters<chain, account>): Promise<revoke.ReturnValue>;
export declare namespace revoke {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The access key to revoke. */
        accessKey: Address | AccessKeyAccount;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: revoke.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `revokeKey` function.
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
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const hash = await client.sendTransaction({
     *   calls: [
     *     Actions.accessKey.revoke.call({ accessKey: '0x...' }),
     *   ],
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "revokeKey";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "keyId";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "revokeKey";
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "authorizeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }, {
            readonly type: "bool";
            readonly name: "enforceLimits";
        }, {
            readonly type: "tuple[]";
            readonly name: "limits";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "updateSpendingLimit";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "signatureType";
            }, {
                readonly type: "address";
                readonly name: "keyId";
            }, {
                readonly type: "uint64";
                readonly name: "expiry";
            }, {
                readonly type: "bool";
                readonly name: "enforceLimits";
            }, {
                readonly type: "bool";
                readonly name: "isRevoked";
            }];
        }];
    }, {
        readonly name: "getRemainingLimit";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getTransactionKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "KeyAuthorized";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }];
    }, {
        readonly name: "KeyRevoked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SpendingLimitUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
    }, {
        readonly name: "UnauthorizedCaller";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyExpired";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SpendingLimitExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSignatureType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ZeroPublicKey";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ExpiryInPast";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyRevoked";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "KeyRevoked">;
}
/**
 * Revokes an authorized access key and waits for the transaction receipt.
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
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const result = await Actions.accessKey.revokeSync(client, {
 *   accessKey: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function revokeSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: revokeSync.Parameters<chain, account>): Promise<revokeSync.ReturnValue>;
export declare namespace revokeSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = revoke.Parameters<chain, account>;
    type Args = revoke.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.accountKeychain, 'KeyRevoked', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Updates the spending limit for a specific token on an authorized access key.
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
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const hash = await Actions.accessKey.updateLimit(client, {
 *   accessKey: '0x...',
 *   token: '0x...',
 *   limit: 1000000000000000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function updateLimit<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: updateLimit.Parameters<chain, account>): Promise<updateLimit.ReturnValue>;
export declare namespace updateLimit {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The access key to update. */
        accessKey: Address | AccessKeyAccount;
        /** The token address. */
        token: Address;
        /** The new spending limit. */
        limit: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: updateLimit.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `updateSpendingLimit` function.
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
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const hash = await client.sendTransaction({
     *   calls: [
     *     Actions.accessKey.updateLimit.call({
     *       accessKey: '0x...',
     *       token: '0x...',
     *       limit: 1000000000000000000n,
     *     }),
     *   ],
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "updateSpendingLimit";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "keyId";
            }, {
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint256";
                readonly name: "newLimit";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "updateSpendingLimit";
    } & {
        args: readonly [`0x${string}`, token: `0x${string}`, newLimit: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "authorizeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }, {
            readonly type: "bool";
            readonly name: "enforceLimits";
        }, {
            readonly type: "tuple[]";
            readonly name: "limits";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "token";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeKey";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "updateSpendingLimit";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "signatureType";
            }, {
                readonly type: "address";
                readonly name: "keyId";
            }, {
                readonly type: "uint64";
                readonly name: "expiry";
            }, {
                readonly type: "bool";
                readonly name: "enforceLimits";
            }, {
                readonly type: "bool";
                readonly name: "isRevoked";
            }];
        }];
    }, {
        readonly name: "getRemainingLimit";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "getTransactionKey";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "KeyAuthorized";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }];
    }, {
        readonly name: "KeyRevoked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SpendingLimitUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "publicKey";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newLimit";
        }];
    }, {
        readonly name: "UnauthorizedCaller";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyExpired";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SpendingLimitExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSignatureType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ZeroPublicKey";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ExpiryInPast";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "KeyAlreadyRevoked";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "SpendingLimitUpdated">;
}
/**
 * Updates the spending limit and waits for the transaction receipt.
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
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const result = await Actions.accessKey.updateLimitSync(client, {
 *   accessKey: '0x...',
 *   token: '0x...',
 *   limit: 1000000000000000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function updateLimitSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: updateLimitSync.Parameters<chain, account>): Promise<updateLimitSync.ReturnValue>;
export declare namespace updateLimitSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = updateLimit.Parameters<chain, account>;
    type Args = updateLimit.Args;
    type ReturnValue = {
        /** The account that owns the key. */
        account: Address;
        /** The access key address. */
        publicKey: Address;
        /** The token address. */
        token: Address;
        /** The new spending limit. */
        limit: bigint;
        /** The transaction receipt. */
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Gets access key information.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const key = await Actions.accessKey.getMetadata(client, {
 *   account: '0x...',
 *   accessKey: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The key information.
 */
export declare function getMetadata<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getMetadata.Parameters<account>): Promise<getMetadata.ReturnValue>;
export declare namespace getMetadata {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account> & Pick<Args, 'accessKey'>;
    type Args = {
        /** Account address. */
        account: Address;
        /** The access key. */
        accessKey: Address | AccessKeyAccount;
    };
    type ReturnValue = {
        /** The access key address. */
        address: Address;
        /** The key type. */
        keyType: 'secp256k1' | 'p256' | 'webAuthn';
        /** The expiry timestamp. */
        expiry: bigint;
        /** The spending policy. */
        spendPolicy: 'limited' | 'unlimited';
        /** Whether the key is revoked. */
        isRevoked: boolean;
    };
    /**
     * Defines a call to the `getKey` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "getKey";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "account";
            }, {
                readonly type: "address";
                readonly name: "keyId";
            }];
            readonly outputs: readonly [{
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "uint8";
                    readonly name: "signatureType";
                }, {
                    readonly type: "address";
                    readonly name: "keyId";
                }, {
                    readonly type: "uint64";
                    readonly name: "expiry";
                }, {
                    readonly type: "bool";
                    readonly name: "enforceLimits";
                }, {
                    readonly type: "bool";
                    readonly name: "isRevoked";
                }];
            }];
        }];
        functionName: "getKey";
    } & {
        args: readonly [account: `0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets the remaining spending limit for a key-token pair.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const remaining = await Actions.accessKey.getRemainingLimit(client, {
 *   account: '0x...',
 *   accessKey: '0x...',
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The remaining spending amount.
 */
export declare function getRemainingLimit<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getRemainingLimit.Parameters<account>): Promise<getRemainingLimit.ReturnValue>;
export declare namespace getRemainingLimit {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account> & Pick<Args, 'accessKey' | 'token'>;
    type Args = {
        /** Account address. */
        account: Address;
        /** The access key. */
        accessKey: Address | AccessKeyAccount;
        /** The token address. */
        token: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.accountKeychain, 'getRemainingLimit', never>;
    /**
     * Defines a call to the `getRemainingLimit` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "getRemainingLimit";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "account";
            }, {
                readonly type: "address";
                readonly name: "keyId";
            }, {
                readonly type: "address";
                readonly name: "token";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
            }];
        }];
        functionName: "getRemainingLimit";
    } & {
        args: readonly [account: `0x${string}`, `0x${string}`, token: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Signs a key authorization for an access key.
 *
 * @example
 * ```ts
 * import { generatePrivateKey } from 'viem/accounts'
 * import { Account, Actions } from 'viem/tempo'
 *
 * const account = Account.from({ privateKey: '0x...' })
 * const accessKey = Account.fromP256(generatePrivateKey(), {
 *   access: account,
 * })
 *
 * const keyAuthorization = await Actions.accessKey.signAuthorization(
 *   account,
 *   {
 *     accessKey,
 *     expiry: Math.floor((Date.now() + 30_000) / 1000),
 *   },
 * )
 * ```
 *
 * @param account - The root account signing the authorization.
 * @param parameters - Parameters.
 * @returns The signed key authorization.
 */
export declare function signAuthorization(account: RootAccount, parameters: signAuthorization.Parameters): Promise<signAuthorization.ReturnValue>;
export declare namespace signAuthorization {
    type Parameters = {
        /** The access key to authorize. */
        accessKey: Pick<AccessKeyAccount, 'accessKeyAddress' | 'keyType'>;
        /** Unix timestamp when the key expires. */
        expiry?: number | undefined;
        /** Spending limits per token. */
        limits?: {
            token: Address;
            limit: bigint;
        }[] | undefined;
    };
    type ReturnValue = Awaited<ReturnType<typeof signKeyAuthorization>>;
}
//# sourceMappingURL=accessKey.d.ts.map
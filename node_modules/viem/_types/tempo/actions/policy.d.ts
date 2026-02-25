import type { Address } from 'abitype';
import type { Account } from '../../accounts/types.js';
import type { ReadContractReturnType } from '../../actions/public/readContract.js';
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
import type { ReadParameters, WriteParameters } from '../internal/types.js';
import type { TransactionReceipt } from '../Transaction.js';
export type PolicyType = 'whitelist' | 'blacklist';
/**
 * Creates a new policy.
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
 * const { hash, policyId } = await Actions.policy.create(client, {
 *   admin: '0x...',
 *   type: 'whitelist',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash and policy ID.
 */
export declare function create<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: create.Parameters<chain, account>): Promise<create.ReturnValue>;
export declare namespace create {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Omit<Args, 'admin'> & {
        /** Address of the policy admin. */
        admin?: Address | undefined;
    };
    type Args = {
        /** Optional array of accounts to initialize the policy with. */
        addresses?: readonly Address[] | undefined;
        /** Address of the policy admin. */
        admin: Address;
        /** Type of policy to create. */
        type: PolicyType;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `createPolicy` function.
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
     *     actions.policy.create.call({
     *       admin: '0xfeed...fede',
     *       type: 'whitelist',
     *     }),
     *     actions.policy.create.call({
     *       admin: '0xfeed...fede',
     *       type: 'blacklist',
     *       addresses: ['0x20c0...beef', '0x20c0...babe'],
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
            readonly name: "createPolicy";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "admin";
            }, {
                readonly type: "uint8";
                readonly name: "policyType";
            }];
            readonly outputs: readonly [{
                readonly type: "uint64";
            }];
        } | {
            readonly name: "createPolicyWithAccounts";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "admin";
            }, {
                readonly type: "uint8";
                readonly name: "policyType";
            }, {
                readonly type: "address[]";
                readonly name: "accounts";
            }];
            readonly outputs: readonly [{
                readonly type: "uint64";
            }];
        }];
        functionName: "createPolicy" | "createPolicyWithAccounts";
    } & {
        args: readonly [admin: `0x${string}`, policyType: number] | readonly [admin: `0x${string}`, policyType: number, accounts: readonly `0x${string}`[]];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `PolicyCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PolicyCreated` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "policyIdCounter";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "policyExists";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "policyData";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
    }, {
        readonly name: "isAuthorized";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "createPolicy";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "createPolicyWithAccounts";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address[]";
            readonly name: "accounts";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "setPolicyAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyWhitelist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyBlacklist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "PolicyAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "admin";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PolicyCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
    }, {
        readonly name: "WhitelistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
    }, {
        readonly name: "BlacklistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IncompatiblePolicyType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "PolicyCreated">;
}
/**
 * Creates a new policy.
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
 * const result = await Actions.policy.createSync(client, {
 *   admin: '0x...',
 *   type: 'whitelist',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function createSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: createSync.Parameters<chain, account>): Promise<createSync.ReturnValue>;
export declare namespace createSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = create.Parameters<chain, account>;
    type Args = create.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip403Registry, 'PolicyCreated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Sets the admin for a policy.
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
 * const hash = await Actions.policy.setAdmin(client, {
 *   policyId: 2n,
 *   admin: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setAdmin<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setAdmin.Parameters<chain, account>): Promise<setAdmin.ReturnValue>;
export declare namespace setAdmin {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** New admin address. */
        admin: Address;
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setAdmin.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setPolicyAdmin` function.
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
     *     actions.policy.setAdmin.call({
     *       policyId: 2n,
     *       admin: '0xfeed...fede',
     *     }),
     *     actions.policy.setAdmin.call({
     *       policyId: 3n,
     *       admin: '0xfeed...babe',
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
            readonly name: "setPolicyAdmin";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "policyId";
            }, {
                readonly type: "address";
                readonly name: "admin";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setPolicyAdmin";
    } & {
        args: readonly [policyId: bigint, admin: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `PolicyAdminUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PolicyAdminUpdated` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "policyIdCounter";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "policyExists";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "policyData";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
    }, {
        readonly name: "isAuthorized";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "createPolicy";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "createPolicyWithAccounts";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address[]";
            readonly name: "accounts";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "setPolicyAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyWhitelist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyBlacklist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "PolicyAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "admin";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PolicyCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
    }, {
        readonly name: "WhitelistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
    }, {
        readonly name: "BlacklistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IncompatiblePolicyType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "PolicyAdminUpdated">;
}
/**
 * Sets the admin for a policy.
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
 * const result = await Actions.policy.setAdminSync(client, {
 *   policyId: 2n,
 *   admin: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setAdminSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setAdminSync.Parameters<chain, account>): Promise<setAdminSync.ReturnValue>;
export declare namespace setAdminSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setAdmin.Parameters<chain, account>;
    type Args = setAdmin.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip403Registry, 'PolicyAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Modifies a policy whitelist.
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
 * const hash = await Actions.policy.modifyWhitelist(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   allowed: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function modifyWhitelist<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyWhitelist.Parameters<chain, account>): Promise<modifyWhitelist.ReturnValue>;
export declare namespace modifyWhitelist {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Target account address. */
        address: Address;
        /** Whether the account is allowed. */
        allowed: boolean;
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: modifyWhitelist.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `modifyPolicyWhitelist` function.
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
     *     actions.policy.modifyWhitelist.call({
     *       policyId: 2n,
     *       address: '0x20c0...beef',
     *       allowed: true,
     *     }),
     *     actions.policy.modifyWhitelist.call({
     *       policyId: 2n,
     *       address: '0x20c0...babe',
     *       allowed: false,
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
            readonly name: "modifyPolicyWhitelist";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "policyId";
            }, {
                readonly type: "address";
                readonly name: "account";
            }, {
                readonly type: "bool";
                readonly name: "allowed";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "modifyPolicyWhitelist";
    } & {
        args: readonly [policyId: bigint, account: `0x${string}`, allowed: boolean];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `WhitelistUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `WhitelistUpdated` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "policyIdCounter";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "policyExists";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "policyData";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
    }, {
        readonly name: "isAuthorized";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "createPolicy";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "createPolicyWithAccounts";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address[]";
            readonly name: "accounts";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "setPolicyAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyWhitelist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyBlacklist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "PolicyAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "admin";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PolicyCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
    }, {
        readonly name: "WhitelistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
    }, {
        readonly name: "BlacklistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IncompatiblePolicyType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "WhitelistUpdated">;
}
/**
 * Modifies a policy whitelist.
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
 * const result = await Actions.policy.modifyWhitelistSync(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   allowed: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function modifyWhitelistSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyWhitelistSync.Parameters<chain, account>): Promise<modifyWhitelistSync.ReturnValue>;
export declare namespace modifyWhitelistSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = modifyWhitelist.Parameters<chain, account>;
    type Args = modifyWhitelist.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip403Registry, 'WhitelistUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Modifies a policy blacklist.
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
 * const hash = await Actions.policy.modifyBlacklist(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   restricted: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function modifyBlacklist<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyBlacklist.Parameters<chain, account>): Promise<modifyBlacklist.ReturnValue>;
export declare namespace modifyBlacklist {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Target account address. */
        address: Address;
        /** Policy ID. */
        policyId: bigint;
        /** Whether the account is restricted. */
        restricted: boolean;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: modifyBlacklist.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `modifyPolicyBlacklist` function.
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
     *     actions.policy.modifyBlacklist.call({
     *       policyId: 2n,
     *       address: '0x20c0...beef',
     *       restricted: true,
     *     }),
     *     actions.policy.modifyBlacklist.call({
     *       policyId: 2n,
     *       address: '0x20c0...babe',
     *       restricted: false,
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
            readonly name: "modifyPolicyBlacklist";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "policyId";
            }, {
                readonly type: "address";
                readonly name: "account";
            }, {
                readonly type: "bool";
                readonly name: "restricted";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "modifyPolicyBlacklist";
    } & {
        args: readonly [policyId: bigint, account: `0x${string}`, restricted: boolean];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `BlacklistUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `BlacklistUpdated` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "policyIdCounter";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "policyExists";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "policyData";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }];
        readonly outputs: readonly [{
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
    }, {
        readonly name: "isAuthorized";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "user";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "createPolicy";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "createPolicyWithAccounts";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }, {
            readonly type: "address[]";
            readonly name: "accounts";
        }];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "setPolicyAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyWhitelist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "modifyPolicyBlacklist";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
        }, {
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "PolicyAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "admin";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PolicyCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint8";
            readonly name: "policyType";
        }];
    }, {
        readonly name: "WhitelistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "allowed";
        }];
    }, {
        readonly name: "BlacklistUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "policyId";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "restricted";
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "IncompatiblePolicyType";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyNotFound";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "BlacklistUpdated">;
}
/**
 * Modifies a policy blacklist.
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
 * const result = await Actions.policy.modifyBlacklistSync(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   restricted: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function modifyBlacklistSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyBlacklistSync.Parameters<chain, account>): Promise<modifyBlacklistSync.ReturnValue>;
export declare namespace modifyBlacklistSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = modifyBlacklist.Parameters<chain, account>;
    type Args = modifyBlacklist.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip403Registry, 'BlacklistUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Gets policy data.
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
 * const data = await Actions.policy.getData(client, {
 *   policyId: 2n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The policy data.
 */
export declare function getData<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getData.Parameters): Promise<getData.ReturnValue>;
export declare namespace getData {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnValue = Compute<{
        /** Admin address. */
        admin: Address;
        /** Policy type. */
        type: PolicyType;
    }>;
    /**
     * Defines a call to the `policyData` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "policyData";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "policyId";
            }];
            readonly outputs: readonly [{
                readonly type: "uint8";
                readonly name: "policyType";
            }, {
                readonly type: "address";
                readonly name: "admin";
            }];
        }];
        functionName: "policyData";
    } & {
        args: readonly [policyId: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Checks if a user is authorized by a policy.
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
 * const authorized = await Actions.policy.isAuthorized(client, {
 *   policyId: 2n,
 *   user: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns Whether the user is authorized.
 */
export declare function isAuthorized<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: isAuthorized.Parameters): Promise<isAuthorized.ReturnValue>;
export declare namespace isAuthorized {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Policy ID. */
        policyId: bigint;
        /** User address to check. */
        user: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.tip403Registry, 'isAuthorized', never>;
    /**
     * Defines a call to the `isAuthorized` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "isAuthorized";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "policyId";
            }, {
                readonly type: "address";
                readonly name: "user";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        }];
        functionName: "isAuthorized";
    } & {
        args: readonly [policyId: bigint, user: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Watches for policy creation events.
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
 * const unwatch = actions.policy.watchCreate(client, {
 *   onPolicyCreated: (args, log) => {
 *     console.log('Policy created:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchCreate<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchCreate.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchCreate {
    type Args = Compute<{
        policyId: bigint;
        updater: Address;
        type: PolicyType;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip403Registry, 'PolicyCreated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip403Registry, 'PolicyCreated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a policy is created. */
        onPolicyCreated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for policy admin update events.
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
 * const unwatch = actions.policy.watchAdminUpdated(client, {
 *   onAdminUpdated: (args, log) => {
 *     console.log('Policy admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchAdminUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchAdminUpdated.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchAdminUpdated {
    type Args = GetEventArgs<typeof Abis.tip403Registry, 'PolicyAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip403Registry, 'PolicyAdminUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip403Registry, 'PolicyAdminUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a policy admin is updated. */
        onAdminUpdated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for whitelist update events.
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
 * const unwatch = actions.policy.watchWhitelistUpdated(client, {
 *   onWhitelistUpdated: (args, log) => {
 *     console.log('Whitelist updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchWhitelistUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchWhitelistUpdated.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchWhitelistUpdated {
    type Args = GetEventArgs<typeof Abis.tip403Registry, 'WhitelistUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip403Registry, 'WhitelistUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip403Registry, 'WhitelistUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a whitelist is updated. */
        onWhitelistUpdated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for blacklist update events.
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
 * const unwatch = actions.policy.watchBlacklistUpdated(client, {
 *   onBlacklistUpdated: (args, log) => {
 *     console.log('Blacklist updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchBlacklistUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBlacklistUpdated.Parameters): import("../../actions/public/watchContractEvent.js").WatchContractEventReturnType;
export declare namespace watchBlacklistUpdated {
    type Args = GetEventArgs<typeof Abis.tip403Registry, 'BlacklistUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip403Registry, 'BlacklistUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip403Registry, 'BlacklistUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a blacklist is updated. */
        onBlacklistUpdated: (args: Args, log: Log) => void;
    };
}
//# sourceMappingURL=policy.d.ts.map
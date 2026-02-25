import type { Address } from 'abitype';
import type { Hex } from 'ox/Hex';
import type { Account } from '../../accounts/types.js';
import type { ReadContractReturnType } from '../../actions/public/readContract.js';
import type { WriteContractReturnType } from '../../actions/wallet/writeContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { BaseErrorType } from '../../errors/base.js';
import type { Chain } from '../../types/chain.js';
import type { TransactionReceipt } from '../../types/transaction.js';
import * as Abis from '../Abis.js';
import type { ReadParameters, WriteParameters } from '../internal/types.js';
/**
 * Adds a new validator (owner only).
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
 * const hash = await Actions.validator.add(client, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   active: true,
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function add<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: add.Parameters<chain, account>): Promise<add.ReturnValue>;
export declare namespace add {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The address of the new validator. */
        newValidatorAddress: Address;
        /** The validator's communication public key. */
        publicKey: Hex;
        /** Whether the validator should be active. */
        active: boolean;
        /** The validator's inbound address `<hostname|ip>:<port>` for incoming connections. */
        inboundAddress: string;
        /** The validator's outbound IP address `<ip>:<port>` for firewall whitelisting (IP only, no hostnames). */
        outboundAddress: string;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `addValidator` function.
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
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.validator.add.call({
     *       newValidatorAddress: '0x...',
     *       publicKey: '0x...',
     *       active: true,
     *       inboundAddress: '192.168.1.1:8080',
     *       outboundAddress: '192.168.1.1:8080',
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
            readonly name: "addValidator";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "newValidatorAddress";
            }, {
                readonly type: "bytes32";
                readonly name: "publicKey";
            }, {
                readonly type: "bool";
                readonly name: "active";
            }, {
                readonly type: "string";
                readonly name: "inboundAddress";
            }, {
                readonly type: "string";
                readonly name: "outboundAddress";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "addValidator";
    } & {
        args: readonly [`0x${string}`, publicKey: `0x${string}`, active: boolean, string, string];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Adds a new validator (owner only) and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.addSync(client, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   active: true,
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export declare function addSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: addSync.Parameters<chain, account>): Promise<addSync.ReturnValue>;
export declare namespace addSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = add.Parameters<chain, account>;
    type Args = add.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
    };
}
/**
 * Changes the owner of the validator config precompile.
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
 * const hash = await Actions.validator.changeOwner(client, {
 *   newOwner: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function changeOwner<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeOwner.Parameters<chain, account>): Promise<changeOwner.ReturnValue>;
export declare namespace changeOwner {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The new owner address. */
        newOwner: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `changeOwner` function.
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
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.validator.changeOwner.call({
     *       newOwner: '0x...',
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
            readonly name: "changeOwner";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "newOwner";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "changeOwner";
    } & {
        args: readonly [newOwner: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Changes the owner and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.changeOwnerSync(client, {
 *   newOwner: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export declare function changeOwnerSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeOwnerSync.Parameters<chain, account>): Promise<changeOwnerSync.ReturnValue>;
export declare namespace changeOwnerSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = changeOwner.Parameters<chain, account>;
    type Args = changeOwner.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
    };
}
/**
 * Changes validator active status (owner only).
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
 * const hash = await Actions.validator.changeStatus(client, {
 *   validator: '0x...',
 *   active: false,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function changeStatus<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeStatus.Parameters<chain, account>): Promise<changeStatus.ReturnValue>;
export declare namespace changeStatus {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The validator address. */
        validator: Address;
        /** Whether the validator should be active. */
        active: boolean;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `changeValidatorStatus` function.
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
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.validator.changeStatus.call({
     *       validator: '0x...',
     *       active: false,
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
            readonly name: "changeValidatorStatus";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "validator";
            }, {
                readonly type: "bool";
                readonly name: "active";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "changeValidatorStatus";
    } & {
        args: readonly [validator: `0x${string}`, active: boolean];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Changes validator active status and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.changeStatusSync(client, {
 *   validator: '0x...',
 *   active: false,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export declare function changeStatusSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeStatusSync.Parameters<chain, account>): Promise<changeStatusSync.ReturnValue>;
export declare namespace changeStatusSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = changeStatus.Parameters<chain, account>;
    type Args = changeStatus.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
    };
}
/**
 * Gets the next epoch for a full DKG ceremony.
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
 * const epoch = await Actions.validator.getNextFullDkgCeremony(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The epoch number for the next full DKG ceremony.
 */
export declare function getNextFullDkgCeremony<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters?: getNextFullDkgCeremony.Parameters): Promise<getNextFullDkgCeremony.ReturnValue>;
export declare namespace getNextFullDkgCeremony {
    type Parameters = ReadParameters;
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'getNextFullDkgCeremony', never>;
    /**
     * Defines a call to the `getNextFullDkgCeremony` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [Actions.validator.getNextFullDkgCeremony.call()],
     * })
     * ```
     *
     * @returns The call.
     */
    function call(): {
        abi: [{
            readonly name: "getNextFullDkgCeremony";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly type: "uint64";
            }];
        }];
        functionName: "getNextFullDkgCeremony";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets the contract owner.
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
 * const owner = await Actions.validator.getOwner(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The owner address.
 */
export declare function getOwner<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters?: getOwner.Parameters): Promise<getOwner.ReturnValue>;
export declare namespace getOwner {
    type Parameters = ReadParameters;
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'owner', never>;
    /**
     * Defines a call to the `owner` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [Actions.validator.getOwner.call()],
     * })
     * ```
     *
     * @returns The call.
     */
    function call(): {
        abi: [{
            readonly name: "owner";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly type: "address";
            }];
        }];
        functionName: "owner";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets validator information by address.
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
 * const validator = await Actions.validator.get(client, {
 *   validator: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The validator information.
 */
export declare function get<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: get.Parameters): Promise<get.ReturnValue>;
export declare namespace get {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Validator address. */
        validator: Address;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'validators', never>;
    /**
     * Defines a call to the `validators` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [
     *     Actions.validator.get.call({ validator: '0x...' }),
     *   ],
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "validators";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "validator";
            }];
            readonly outputs: readonly [{
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "bytes32";
                    readonly name: "publicKey";
                }, {
                    readonly type: "bool";
                    readonly name: "active";
                }, {
                    readonly type: "uint64";
                    readonly name: "index";
                }, {
                    readonly type: "address";
                    readonly name: "validatorAddress";
                }, {
                    readonly type: "string";
                    readonly name: "inboundAddress";
                }, {
                    readonly type: "string";
                    readonly name: "outboundAddress";
                }];
            }];
        }];
        functionName: "validators";
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
 * Gets validator address by index.
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
 * const validatorAddress = await Actions.validator.getByIndex(client, {
 *   index: 0n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The validator address at the given index.
 */
export declare function getByIndex<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getByIndex.Parameters): Promise<getByIndex.ReturnValue>;
export declare namespace getByIndex {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Validator index. */
        index: bigint;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'validatorsArray', never>;
    /**
     * Defines a call to the `validatorsArray` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [
     *     Actions.validator.getByIndex.call({ index: 0n }),
     *     Actions.validator.getByIndex.call({ index: 1n }),
     *   ],
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "validatorsArray";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "uint256";
                readonly name: "index";
            }];
            readonly outputs: readonly [{
                readonly type: "address";
            }];
        }];
        functionName: "validatorsArray";
    } & {
        args: readonly [index: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets the total number of validators.
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
 * const count = await Actions.validator.getCount(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The total number of validators.
 */
export declare function getCount<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters?: getCount.Parameters): Promise<getCount.ReturnValue>;
export declare namespace getCount {
    type Parameters = ReadParameters;
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'validatorCount', never>;
    /**
     * Defines a call to the `validatorCount` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [Actions.validator.getCount.call()],
     * })
     * ```
     *
     * @returns The call.
     */
    function call(): {
        abi: [{
            readonly name: "validatorCount";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly type: "uint64";
            }];
        }];
        functionName: "validatorCount";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets the complete set of validators.
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
 * const validators = await Actions.validator.list(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns Array of all validators with their information.
 */
export declare function list<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters?: list.Parameters): Promise<list.ReturnValue>;
export declare namespace list {
    type Parameters = ReadParameters;
    type ReturnValue = ReadContractReturnType<typeof Abis.validator, 'getValidators', never>;
    /**
     * Defines a call to the `getValidators` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
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
     * const result = await client.multicall({
     *   contracts: [Actions.validator.list.call()],
     * })
     * ```
     *
     * @returns The call.
     */
    function call(): {
        abi: [{
            readonly name: "getValidators";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly type: "tuple[]";
                readonly name: "validators";
                readonly components: readonly [{
                    readonly type: "bytes32";
                    readonly name: "publicKey";
                }, {
                    readonly type: "bool";
                    readonly name: "active";
                }, {
                    readonly type: "uint64";
                    readonly name: "index";
                }, {
                    readonly type: "address";
                    readonly name: "validatorAddress";
                }, {
                    readonly type: "string";
                    readonly name: "inboundAddress";
                }, {
                    readonly type: "string";
                    readonly name: "outboundAddress";
                }];
            }];
        }];
        functionName: "getValidators";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Sets the next epoch for a full DKG ceremony.
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
 * const hash = await Actions.validator.setNextFullDkgCeremony(client, {
 *   epoch: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setNextFullDkgCeremony<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setNextFullDkgCeremony.Parameters<chain, account>): Promise<setNextFullDkgCeremony.ReturnValue>;
export declare namespace setNextFullDkgCeremony {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The epoch number for the next full DKG ceremony. */
        epoch: bigint;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setNextFullDkgCeremony` function.
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
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.validator.setNextFullDkgCeremony.call({
     *       epoch: 100n,
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
            readonly name: "setNextFullDkgCeremony";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "epoch";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setNextFullDkgCeremony";
    } & {
        args: readonly [epoch: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Sets the next epoch for a full DKG ceremony and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.setNextFullDkgCeremonySync(client, {
 *   epoch: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export declare function setNextFullDkgCeremonySync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setNextFullDkgCeremonySync.Parameters<chain, account>): Promise<setNextFullDkgCeremonySync.ReturnValue>;
export declare namespace setNextFullDkgCeremonySync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setNextFullDkgCeremony.Parameters<chain, account>;
    type Args = setNextFullDkgCeremony.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
    };
}
/**
 * Updates validator information (only callable by the validator themselves).
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
 * const hash = await Actions.validator.update(client, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function update<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: update.Parameters<chain, account>): Promise<update.ReturnValue>;
export declare namespace update {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** The new address for this validator. */
        newValidatorAddress: Address;
        /** The validator's new communication public key. */
        publicKey: Hex;
        /** The validator's inbound address `<hostname|ip>:<port>` for incoming connections. */
        inboundAddress: string;
        /** The validator's outbound IP address `<ip>:<port>` for firewall whitelisting (IP only, no hostnames). */
        outboundAddress: string;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `updateValidator` function.
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
     * const { result } = await client.sendCalls({
     *   calls: [
     *     Actions.validator.update.call({
     *       newValidatorAddress: '0x...',
     *       publicKey: '0x...',
     *       inboundAddress: '192.168.1.1:8080',
     *       outboundAddress: '192.168.1.1:8080',
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
            readonly name: "updateValidator";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "newValidatorAddress";
            }, {
                readonly type: "bytes32";
                readonly name: "publicKey";
            }, {
                readonly type: "string";
                readonly name: "inboundAddress";
            }, {
                readonly type: "string";
                readonly name: "outboundAddress";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "updateValidator";
    } & {
        args: readonly [`0x${string}`, publicKey: `0x${string}`, string, string];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Updates validator information and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.updateSync(client, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export declare function updateSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: updateSync.Parameters<chain, account>): Promise<updateSync.ReturnValue>;
export declare namespace updateSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = update.Parameters<chain, account>;
    type Args = update.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
    };
}
//# sourceMappingURL=validator.d.ts.map
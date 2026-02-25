import { readContract } from '../../actions/public/readContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
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
export async function add(client, parameters) {
    return add.inner(writeContract, client, parameters);
}
(function (add) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { newValidatorAddress, publicKey, active, inboundAddress, outboundAddress, ...rest } = parameters;
        const callData = add.call({
            newValidatorAddress,
            publicKey,
            active,
            inboundAddress,
            outboundAddress,
        });
        return (await action(client, {
            ...rest,
            ...callData,
        }));
    }
    add.inner = inner;
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
    function call(args) {
        const { newValidatorAddress, publicKey, active, inboundAddress, outboundAddress, } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [
                newValidatorAddress,
                publicKey,
                active,
                inboundAddress,
                outboundAddress,
            ],
            functionName: 'addValidator',
        });
    }
    add.call = call;
})(add || (add = {}));
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
export async function addSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await add.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
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
export async function changeOwner(client, parameters) {
    return changeOwner.inner(writeContract, client, parameters);
}
(function (changeOwner) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { newOwner, ...rest } = parameters;
        const callData = changeOwner.call({ newOwner });
        return (await action(client, {
            ...rest,
            ...callData,
        }));
    }
    changeOwner.inner = inner;
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
    function call(args) {
        const { newOwner } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [newOwner],
            functionName: 'changeOwner',
        });
    }
    changeOwner.call = call;
})(changeOwner || (changeOwner = {}));
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
export async function changeOwnerSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await changeOwner.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
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
export async function changeStatus(client, parameters) {
    return changeStatus.inner(writeContract, client, parameters);
}
(function (changeStatus) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { validator, active, ...rest } = parameters;
        const callData = changeStatus.call({ validator, active });
        return (await action(client, {
            ...rest,
            ...callData,
        }));
    }
    changeStatus.inner = inner;
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
    function call(args) {
        const { validator, active } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [validator, active],
            functionName: 'changeValidatorStatus',
        });
    }
    changeStatus.call = call;
})(changeStatus || (changeStatus = {}));
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
export async function changeStatusSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await changeStatus.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
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
export async function getNextFullDkgCeremony(client, parameters = {}) {
    return readContract(client, {
        ...parameters,
        ...getNextFullDkgCeremony.call(),
    });
}
(function (getNextFullDkgCeremony) {
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
    function call() {
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [],
            functionName: 'getNextFullDkgCeremony',
        });
    }
    getNextFullDkgCeremony.call = call;
})(getNextFullDkgCeremony || (getNextFullDkgCeremony = {}));
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
export async function getOwner(client, parameters = {}) {
    return readContract(client, {
        ...parameters,
        ...getOwner.call(),
    });
}
(function (getOwner) {
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
    function call() {
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [],
            functionName: 'owner',
        });
    }
    getOwner.call = call;
})(getOwner || (getOwner = {}));
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
export async function get(client, parameters) {
    const { validator, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...get.call({ validator }),
    });
}
(function (get) {
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
    function call(args) {
        const { validator } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [validator],
            functionName: 'validators',
        });
    }
    get.call = call;
})(get || (get = {}));
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
export async function getByIndex(client, parameters) {
    const { index, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getByIndex.call({ index }),
    });
}
(function (getByIndex) {
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
    function call(args) {
        const { index } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [index],
            functionName: 'validatorsArray',
        });
    }
    getByIndex.call = call;
})(getByIndex || (getByIndex = {}));
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
export async function getCount(client, parameters = {}) {
    return readContract(client, {
        ...parameters,
        ...getCount.call(),
    });
}
(function (getCount) {
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
    function call() {
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [],
            functionName: 'validatorCount',
        });
    }
    getCount.call = call;
})(getCount || (getCount = {}));
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
export async function list(client, parameters = {}) {
    return readContract(client, {
        ...parameters,
        ...list.call(),
    });
}
(function (list) {
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
    function call() {
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [],
            functionName: 'getValidators',
        });
    }
    list.call = call;
})(list || (list = {}));
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
export async function setNextFullDkgCeremony(client, parameters) {
    return setNextFullDkgCeremony.inner(writeContract, client, parameters);
}
(function (setNextFullDkgCeremony) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { epoch, ...rest } = parameters;
        const callData = setNextFullDkgCeremony.call({ epoch });
        return (await action(client, {
            ...rest,
            ...callData,
        }));
    }
    setNextFullDkgCeremony.inner = inner;
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
    function call(args) {
        const { epoch } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [epoch],
            functionName: 'setNextFullDkgCeremony',
        });
    }
    setNextFullDkgCeremony.call = call;
})(setNextFullDkgCeremony || (setNextFullDkgCeremony = {}));
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
export async function setNextFullDkgCeremonySync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setNextFullDkgCeremony.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
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
export async function update(client, parameters) {
    return update.inner(writeContract, client, parameters);
}
(function (update) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { newValidatorAddress, publicKey, inboundAddress, outboundAddress, ...rest } = parameters;
        const callData = update.call({
            newValidatorAddress,
            publicKey,
            inboundAddress,
            outboundAddress,
        });
        return (await action(client, {
            ...rest,
            ...callData,
        }));
    }
    update.inner = inner;
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
    function call(args) {
        const { newValidatorAddress, publicKey, inboundAddress, outboundAddress } = args;
        return defineCall({
            address: Addresses.validator,
            abi: Abis.validator,
            args: [newValidatorAddress, publicKey, inboundAddress, outboundAddress],
            functionName: 'updateValidator',
        });
    }
    update.call = call;
})(update || (update = {}));
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
export async function updateSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await update.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
//# sourceMappingURL=validator.js.map
import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { readContract } from '../../actions/public/readContract.js';
import { watchContractEvent } from '../../actions/public/watchContractEvent.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
const policyTypeMap = {
    whitelist: 0,
    blacklist: 1,
};
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
export async function create(client, parameters) {
    return create.inner(writeContract, client, parameters);
}
(function (create) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { account = client.account, addresses, chain = client.chain, type, ...rest } = parameters;
        if (!account)
            throw new Error('`account` is required');
        const admin = parseAccount(account).address;
        const call = create.call({ admin, type, addresses });
        return action(client, {
            ...rest,
            account,
            chain,
            ...call,
        });
    }
    create.inner = inner;
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
    function call(args) {
        const { admin, type, addresses } = args;
        const config = (() => {
            if (addresses)
                return {
                    functionName: 'createPolicyWithAccounts',
                    args: [admin, policyTypeMap[type], addresses],
                };
            return {
                functionName: 'createPolicy',
                args: [admin, policyTypeMap[type]],
            };
        })();
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            ...config,
        });
    }
    create.call = call;
    /**
     * Extracts the `PolicyCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PolicyCreated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'PolicyCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`PolicyCreated` event not found.');
        return log;
    }
    create.extractEvent = extractEvent;
})(create || (create = {}));
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
export async function createSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await create.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = create.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function setAdmin(client, parameters) {
    return setAdmin.inner(writeContract, client, parameters);
}
(function (setAdmin) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { policyId, admin, ...rest } = parameters;
        const call = setAdmin.call({ policyId, admin });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setAdmin.inner = inner;
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
    function call(args) {
        const { policyId, admin } = args;
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'setPolicyAdmin',
            args: [policyId, admin],
        });
    }
    setAdmin.call = call;
    /**
     * Extracts the `PolicyAdminUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `PolicyAdminUpdated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'PolicyAdminUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`PolicyAdminUpdated` event not found.');
        return log;
    }
    setAdmin.extractEvent = extractEvent;
})(setAdmin || (setAdmin = {}));
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
export async function setAdminSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setAdmin.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setAdmin.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function modifyWhitelist(client, parameters) {
    return modifyWhitelist.inner(writeContract, client, parameters);
}
(function (modifyWhitelist) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { address: targetAccount, allowed, policyId, ...rest } = parameters;
        const call = modifyWhitelist.call({
            address: targetAccount,
            allowed,
            policyId,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    modifyWhitelist.inner = inner;
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
    function call(args) {
        const { policyId, address, allowed } = args;
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'modifyPolicyWhitelist',
            args: [policyId, address, allowed],
        });
    }
    modifyWhitelist.call = call;
    /**
     * Extracts the `WhitelistUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `WhitelistUpdated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'WhitelistUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`WhitelistUpdated` event not found.');
        return log;
    }
    modifyWhitelist.extractEvent = extractEvent;
})(modifyWhitelist || (modifyWhitelist = {}));
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
export async function modifyWhitelistSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await modifyWhitelist.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = modifyWhitelist.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function modifyBlacklist(client, parameters) {
    return modifyBlacklist.inner(writeContract, client, parameters);
}
(function (modifyBlacklist) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { address: targetAccount, policyId, restricted, ...rest } = parameters;
        const call = modifyBlacklist.call({
            address: targetAccount,
            policyId,
            restricted,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    modifyBlacklist.inner = inner;
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
    function call(args) {
        const { policyId, address, restricted } = args;
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'modifyPolicyBlacklist',
            args: [policyId, address, restricted],
        });
    }
    modifyBlacklist.call = call;
    /**
     * Extracts the `BlacklistUpdated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `BlacklistUpdated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'BlacklistUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`BlacklistUpdated` event not found.');
        return log;
    }
    modifyBlacklist.extractEvent = extractEvent;
})(modifyBlacklist || (modifyBlacklist = {}));
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
export async function modifyBlacklistSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await modifyBlacklist.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = modifyBlacklist.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function getData(client, parameters) {
    const { policyId, ...rest } = parameters;
    const result = await readContract(client, {
        ...rest,
        ...getData.call({ policyId }),
    });
    return {
        admin: result[1],
        type: result[0] === 0 ? 'whitelist' : 'blacklist',
    };
}
(function (getData) {
    /**
     * Defines a call to the `policyData` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { policyId } = args;
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            args: [policyId],
            functionName: 'policyData',
        });
    }
    getData.call = call;
})(getData || (getData = {}));
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
export async function isAuthorized(client, parameters) {
    const { policyId, user, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...isAuthorized.call({ policyId, user }),
    });
}
(function (isAuthorized) {
    /**
     * Defines a call to the `isAuthorized` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { policyId, user } = args;
        return defineCall({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            args: [policyId, user],
            functionName: 'isAuthorized',
        });
    }
    isAuthorized.call = call;
})(isAuthorized || (isAuthorized = {}));
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
export function watchCreate(client, parameters) {
    const { onPolicyCreated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'PolicyCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onPolicyCreated({
                    ...log.args,
                    type: log.args.policyType === 0 ? 'whitelist' : 'blacklist',
                }, log);
        },
        strict: true,
    });
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
export function watchAdminUpdated(client, parameters) {
    const { onAdminUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'PolicyAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onAdminUpdated(log.args, log);
        },
        strict: true,
    });
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
export function watchWhitelistUpdated(client, parameters) {
    const { onWhitelistUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'WhitelistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onWhitelistUpdated(log.args, log);
        },
        strict: true,
    });
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
export function watchBlacklistUpdated(client, parameters) {
    const { onBlacklistUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'BlacklistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onBlacklistUpdated(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=policy.js.map
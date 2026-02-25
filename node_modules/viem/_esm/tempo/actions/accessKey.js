import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { readContract } from '../../actions/public/readContract.js';
import { sendTransaction } from '../../actions/wallet/sendTransaction.js';
import { sendTransactionSync } from '../../actions/wallet/sendTransactionSync.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import { signKeyAuthorization } from '../Account.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
/** @internal */
const signatureTypes = {
    0: 'secp256k1',
    1: 'p256',
    2: 'webAuthn',
};
/** @internal */
const spendPolicies = {
    true: 'limited',
    false: 'unlimited',
};
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
export async function authorize(client, parameters) {
    return authorize.inner(sendTransaction, client, parameters);
}
(function (authorize) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { accessKey, expiry, limits, ...rest } = parameters;
        const account_ = rest.account ?? client.account;
        if (!account_)
            throw new Error('account is required.');
        const parsed = parseAccount(account_);
        const keyAuthorization = await signKeyAuthorization(parsed, {
            key: accessKey,
            expiry,
            limits,
        });
        return (await action(client, {
            ...rest,
            keyAuthorization,
        }));
    }
    authorize.inner = inner;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'KeyAuthorized',
            strict: true,
        });
        if (!log)
            throw new Error('`KeyAuthorized` event not found.');
        return log;
    }
    authorize.extractEvent = extractEvent;
})(authorize || (authorize = {}));
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
export async function authorizeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await authorize.inner(sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = authorize.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function revoke(client, parameters) {
    return revoke.inner(writeContract, client, parameters);
}
(function (revoke) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { accessKey, ...rest } = parameters;
        const call = revoke.call({ accessKey });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    revoke.inner = inner;
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
    function call(args) {
        const { accessKey } = args;
        return defineCall({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'revokeKey',
            args: [resolveAccessKey(accessKey)],
        });
    }
    revoke.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'KeyRevoked',
            strict: true,
        });
        if (!log)
            throw new Error('`KeyRevoked` event not found.');
        return log;
    }
    revoke.extractEvent = extractEvent;
})(revoke || (revoke = {}));
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
export async function revokeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await revoke.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = revoke.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export async function updateLimit(client, parameters) {
    return updateLimit.inner(writeContract, client, parameters);
}
(function (updateLimit) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { accessKey, token, limit, ...rest } = parameters;
        const call = updateLimit.call({ accessKey, token, limit });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    updateLimit.inner = inner;
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
    function call(args) {
        const { accessKey, token, limit } = args;
        return defineCall({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'updateSpendingLimit',
            args: [resolveAccessKey(accessKey), token, limit],
        });
    }
    updateLimit.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'SpendingLimitUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`SpendingLimitUpdated` event not found.');
        return log;
    }
    updateLimit.extractEvent = extractEvent;
})(updateLimit || (updateLimit = {}));
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
export async function updateLimitSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await updateLimit.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = updateLimit.extractEvent(receipt.logs);
    return {
        account: args.account,
        publicKey: args.publicKey,
        token: args.token,
        limit: args.newLimit,
        receipt,
    };
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
export async function getMetadata(client, parameters) {
    const { account: account_ = client.account, accessKey, ...rest } = parameters;
    if (!account_)
        throw new Error('account is required.');
    const account = parseAccount(account_);
    const result = await readContract(client, {
        ...rest,
        ...getMetadata.call({ account: account.address, accessKey }),
    });
    return {
        address: result.keyId,
        keyType: signatureTypes[result.signatureType] ??
            'secp256k1',
        expiry: result.expiry,
        spendPolicy: spendPolicies[`${result.enforceLimits}`],
        isRevoked: result.isRevoked,
    };
}
(function (getMetadata) {
    /**
     * Defines a call to the `getKey` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, accessKey } = args;
        return defineCall({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'getKey',
            args: [account, resolveAccessKey(accessKey)],
        });
    }
    getMetadata.call = call;
})(getMetadata || (getMetadata = {}));
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
export async function getRemainingLimit(client, parameters) {
    const { account: account_ = client.account, accessKey, token, ...rest } = parameters;
    if (!account_)
        throw new Error('account is required.');
    const account = parseAccount(account_);
    return readContract(client, {
        ...rest,
        ...getRemainingLimit.call({ account: account.address, accessKey, token }),
    });
}
(function (getRemainingLimit) {
    /**
     * Defines a call to the `getRemainingLimit` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, accessKey, token } = args;
        return defineCall({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'getRemainingLimit',
            args: [account, resolveAccessKey(accessKey), token],
        });
    }
    getRemainingLimit.call = call;
})(getRemainingLimit || (getRemainingLimit = {}));
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
export async function signAuthorization(account, parameters) {
    const { accessKey, ...rest } = parameters;
    return signKeyAuthorization(account, { key: accessKey, ...rest });
}
/** @internal */
function resolveAccessKey(accessKey) {
    if (typeof accessKey === 'string')
        return accessKey;
    return accessKey.accessKeyAddress;
}
//# sourceMappingURL=accessKey.js.map
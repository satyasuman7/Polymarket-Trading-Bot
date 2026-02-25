import { TokenId } from 'ox/tempo';
import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { readContract } from '../../actions/public/readContract.js';
import { watchContractEvent } from '../../actions/public/watchContractEvent.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { zeroAddress } from '../../constants/address.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
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
export async function getUserToken(client, ...parameters) {
    const { account: account_ = client.account, ...rest } = parameters[0] ?? {};
    if (!account_)
        throw new Error('account is required.');
    const account = parseAccount(account_);
    const address = await readContract(client, {
        ...rest,
        ...getUserToken.call({ account: account.address }),
    });
    if (address === zeroAddress)
        return null;
    return {
        address,
        id: TokenId.fromAddress(address),
    };
}
(function (getUserToken) {
    /**
     * Defines a call to the `userTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            args: [account],
            functionName: 'userTokens',
        });
    }
    getUserToken.call = call;
})(getUserToken || (getUserToken = {}));
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
export async function setUserToken(client, parameters) {
    return setUserToken.inner(writeContract, client, parameters);
}
(function (setUserToken) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = setUserToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setUserToken.inner = inner;
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
    function call(args) {
        const { token } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            functionName: 'setUserToken',
            args: [TokenId.toAddress(token)],
        });
    }
    setUserToken.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.feeManager,
            logs,
            eventName: 'UserTokenSet',
            strict: true,
        });
        if (!log)
            throw new Error('`UserTokenSet` event not found.');
        return log;
    }
    setUserToken.extractEvent = extractEvent;
})(setUserToken || (setUserToken = {}));
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
export async function setUserTokenSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setUserToken.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setUserToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export function watchSetUserToken(client, parameters) {
    const { onUserTokenSet, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeManager,
        eventName: 'UserTokenSet',
        onLogs: (logs) => {
            for (const log of logs)
                onUserTokenSet(log.args, log);
        },
        strict: true,
    });
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
export async function getValidatorToken(client, parameters) {
    const { validator, ...rest } = parameters;
    const address = await readContract(client, {
        ...rest,
        ...getValidatorToken.call({ validator }),
    });
    if (address === zeroAddress)
        return null;
    return {
        address,
        id: TokenId.fromAddress(address),
    };
}
(function (getValidatorToken) {
    /**
     * Defines a call to the `validatorTokens` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { validator } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            args: [validator],
            functionName: 'validatorTokens',
        });
    }
    getValidatorToken.call = call;
})(getValidatorToken || (getValidatorToken = {}));
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
export async function setValidatorToken(client, parameters) {
    return setValidatorToken.inner(writeContract, client, parameters);
}
(function (setValidatorToken) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = setValidatorToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setValidatorToken.inner = inner;
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
    function call(args) {
        const { token } = args;
        return defineCall({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            functionName: 'setValidatorToken',
            args: [TokenId.toAddress(token)],
        });
    }
    setValidatorToken.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.feeManager,
            logs,
            eventName: 'ValidatorTokenSet',
            strict: true,
        });
        if (!log)
            throw new Error('`ValidatorTokenSet` event not found.');
        return log;
    }
    setValidatorToken.extractEvent = extractEvent;
})(setValidatorToken || (setValidatorToken = {}));
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
export async function setValidatorTokenSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setValidatorToken.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setValidatorToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
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
export function watchSetValidatorToken(client, parameters) {
    const { onValidatorTokenSet, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeManager,
        eventName: 'ValidatorTokenSet',
        onLogs: (logs) => {
            for (const log of logs)
                onValidatorTokenSet(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=fee.js.map
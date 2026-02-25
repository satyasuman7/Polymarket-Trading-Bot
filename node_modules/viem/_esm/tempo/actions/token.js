import * as Hex from 'ox/Hex';
import { TokenId, TokenRole } from 'ox/tempo';
import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { multicall } from '../../actions/public/multicall.js';
import { readContract } from '../../actions/public/readContract.js';
import { watchContractEvent } from '../../actions/public/watchContractEvent.js';
import { sendTransaction } from '../../actions/wallet/sendTransaction.js';
import { sendTransactionSync, } from '../../actions/wallet/sendTransactionSync.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import { encodeFunctionData } from '../../utils/abi/encodeFunctionData.js';
import { parseEventLogs } from '../../utils/abi/parseEventLogs.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
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
 * const result = await Actions.token.approve(client, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function approve(client, parameters) {
    const { token, ...rest } = parameters;
    return approve.inner(writeContract, client, parameters, { ...rest, token });
}
(function (approve) {
    /** @internal */
    async function inner(action, client, parameters, args) {
        const call = approve.call(args);
        return (await action(client, {
            ...parameters,
            ...call,
        }));
    }
    approve.inner = inner;
    /**
     * Defines a call to the `approve` function.
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
     *     actions.token.approve.call({
     *       spender: '0x20c0...beef',
     *       amount: 100n,
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
        const { spender, amount, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'approve',
            args: [spender, amount],
        });
    }
    approve.call = call;
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'Approval',
        });
        if (!log)
            throw new Error('`Approval` event not found.');
        return log;
    }
    approve.extractEvent = extractEvent;
})(approve || (approve = {}));
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
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
 * const result = await Actions.token.approveSync(client, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function approveSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await approve.inner(writeContractSync, client, { ...parameters, throwOnReceiptRevert }, rest);
    const { args } = approve.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Burns TIP20 tokens from a blocked address.
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
 * const result = await Actions.token.burnBlocked(client, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burnBlocked(client, parameters) {
    return burnBlocked.inner(writeContract, client, parameters);
}
(function (burnBlocked) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { amount, from, token, ...rest } = parameters;
        const call = burnBlocked.call({ amount, from, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    burnBlocked.inner = inner;
    /**
     * Defines a call to the `burnBlocked` function.
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
     *     actions.token.burnBlocked.call({
     *       from: '0x20c0...beef',
     *       amount: 100n,
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
        const { from, amount, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'burnBlocked',
            args: [from, amount],
        });
    }
    burnBlocked.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'BurnBlocked',
        });
        if (!log)
            throw new Error('`BurnBlocked` event not found.');
        return log;
    }
    burnBlocked.extractEvent = extractEvent;
})(burnBlocked || (burnBlocked = {}));
/**
 * Burns TIP20 tokens from a blocked address.
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
 * const result = await Actions.token.burnBlockedSync(client, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function burnBlockedSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await burnBlocked.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = burnBlocked.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Burns TIP20 tokens from the caller's balance.
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
 * const result = await Actions.token.burn(client, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burn(client, parameters) {
    return burn.inner(writeContract, client, parameters);
}
(function (burn) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { amount, memo, token, ...rest } = parameters;
        const call = burn.call({ amount, memo, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    burn.inner = inner;
    /**
     * Defines a call to the `burn` or `burnWithMemo` function.
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
     *     actions.token.burn.call({
     *       amount: 100n,
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
        const { amount, memo, token } = args;
        const callArgs = memo
            ? {
                functionName: 'burnWithMemo',
                args: [amount, Hex.padLeft(memo, 32)],
            }
            : {
                functionName: 'burn',
                args: [amount],
            };
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    burn.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'Burn',
        });
        if (!log)
            throw new Error('`Burn` event not found.');
        return log;
    }
    burn.extractEvent = extractEvent;
})(burn || (burn = {}));
/**
 * Burns TIP20 tokens from the caller's balance.
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
 * const result = await Actions.token.burnSync(client, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function burnSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await burn.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = burn.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Changes the transfer policy ID for a TIP20 token.
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
 * const result = await Actions.token.changeTransferPolicy(client, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function changeTransferPolicy(client, parameters) {
    return changeTransferPolicy.inner(writeContract, client, parameters);
}
(function (changeTransferPolicy) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { policyId, token, ...rest } = parameters;
        const call = changeTransferPolicy.call({ policyId, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    changeTransferPolicy.inner = inner;
    /**
     * Defines a call to the `changeTransferPolicyId` function.
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
     *     actions.token.changeTransferPolicy.call({
     *       token: '0x20c0...babe',
     *       policyId: 1n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, policyId } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'changeTransferPolicyId',
            args: [policyId],
        });
    }
    changeTransferPolicy.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'TransferPolicyUpdate',
        });
        if (!log)
            throw new Error('`TransferPolicyUpdate` event not found.');
        return log;
    }
    changeTransferPolicy.extractEvent = extractEvent;
})(changeTransferPolicy || (changeTransferPolicy = {}));
/**
 * Changes the transfer policy ID for a TIP20 token.
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
 * const result = await Actions.token.changeTransferPolicySync(client, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function changeTransferPolicySync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await changeTransferPolicy.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = changeTransferPolicy.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Creates a new TIP20 token.
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
 * const result = await Actions.token.create(client, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function create(client, parameters) {
    return create.inner(writeContract, client, parameters);
}
(function (create) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { account = client.account, admin: admin_ = client.account, chain = client.chain, ...rest } = parameters;
        const admin = admin_ ? parseAccount(admin_) : undefined;
        if (!admin)
            throw new Error('admin is required.');
        const call = create.call({ ...rest, admin: admin.address });
        return (await action(client, {
            ...parameters,
            account,
            chain,
            ...call,
        }));
    }
    create.inner = inner;
    /**
     * Defines a call to the `createToken` function.
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
     *     actions.token.create.call({
     *       name: 'My Token',
     *       symbol: 'MTK',
     *       currency: 'USD',
     *       admin: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { name, symbol, currency, quoteToken = Addresses.pathUsd, admin, salt = Hex.random(32), } = args;
        return defineCall({
            address: Addresses.tip20Factory,
            abi: Abis.tip20Factory,
            args: [
                name,
                symbol,
                currency,
                TokenId.toAddress(quoteToken),
                admin,
                salt,
            ],
            functionName: 'createToken',
        });
    }
    create.call = call;
    /**
     * Extracts the `TokenCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `TokenCreated` event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20Factory,
            logs,
            eventName: 'TokenCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`TokenCreated` event not found.');
        return log;
    }
    create.extractEvent = extractEvent;
})(create || (create = {}));
/**
 * Creates a new TIP20 token.
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
 * const result = await Actions.token.createSync(client, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
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
    const tokenId = TokenId.fromAddress(args.token);
    return {
        ...args,
        receipt,
        tokenId,
    };
}
/**
 * Gets TIP20 token allowance.
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
 * const allowance = await Actions.token.getAllowance(client, {
 *   spender: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export async function getAllowance(client, parameters) {
    const { account = client.account } = parameters;
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...parameters,
        ...getAllowance.call({ ...parameters, account: address }),
    });
}
(function (getAllowance) {
    /**
     * Defines a call to the `allowance` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, spender, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'allowance',
            args: [account, spender],
        });
    }
    getAllowance.call = call;
})(getAllowance || (getAllowance = {}));
/**
 * Gets TIP20 token balance for an address.
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
 * const balance = await Actions.token.getBalance(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export async function getBalance(client, parameters) {
    const { account = client.account, ...rest } = parameters;
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...rest,
        ...getBalance.call({ account: address, ...rest }),
    });
}
(function (getBalance) {
    /**
     * Defines a call to the `balanceOf` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'balanceOf',
            args: [account],
        });
    }
    getBalance.call = call;
})(getBalance || (getBalance = {}));
/**
 * Gets TIP20 token metadata including name, symbol, currency, decimals, and total supply.
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
 * const metadata = await Actions.token.getMetadata(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export async function getMetadata(client, parameters) {
    const { token, ...rest } = parameters;
    const address = TokenId.toAddress(token);
    const abi = Abis.tip20;
    if (TokenId.from(token) === TokenId.fromAddress(Addresses.pathUsd))
        return multicall(client, {
            ...rest,
            contracts: [
                {
                    address,
                    abi,
                    functionName: 'currency',
                },
                {
                    address,
                    abi,
                    functionName: 'decimals',
                },
                {
                    address,
                    abi,
                    functionName: 'name',
                },
                {
                    address,
                    abi,
                    functionName: 'symbol',
                },
                {
                    address,
                    abi,
                    functionName: 'totalSupply',
                },
            ],
            allowFailure: false,
            deployless: true,
        }).then(([currency, decimals, name, symbol, totalSupply]) => ({
            name,
            symbol,
            currency,
            decimals,
            totalSupply,
        }));
    return multicall(client, {
        ...rest,
        contracts: [
            {
                address,
                abi,
                functionName: 'currency',
            },
            {
                address,
                abi,
                functionName: 'decimals',
            },
            {
                address,
                abi,
                functionName: 'quoteToken',
            },
            {
                address,
                abi,
                functionName: 'name',
            },
            {
                address,
                abi,
                functionName: 'paused',
            },
            {
                address,
                abi,
                functionName: 'supplyCap',
            },
            {
                address,
                abi,
                functionName: 'symbol',
            },
            {
                address,
                abi,
                functionName: 'totalSupply',
            },
            {
                address,
                abi,
                functionName: 'transferPolicyId',
            },
        ],
        allowFailure: false,
        deployless: true,
    }).then(([currency, decimals, quoteToken, name, paused, supplyCap, symbol, totalSupply, transferPolicyId,]) => ({
        name,
        symbol,
        currency,
        decimals,
        quoteToken,
        totalSupply,
        paused,
        supplyCap,
        transferPolicyId,
    }));
}
/**
 * Gets the admin role for a specific role in a TIP20 token.
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
 * const adminRole = await Actions.token.getRoleAdmin(client, {
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The admin role hash.
 */
export async function getRoleAdmin(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...getRoleAdmin.call(parameters),
    });
}
(function (getRoleAdmin) {
    /**
     * Defines a call to the `getRoleAdmin` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { role, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'getRoleAdmin',
            args: [TokenRole.serialize(role)],
        });
    }
    getRoleAdmin.call = call;
})(getRoleAdmin || (getRoleAdmin = {}));
/**
 * Checks if an account has a specific role for a TIP20 token.
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
 * const hasRole = await Actions.token.hasRole(client, {
 *   account: '0x...',
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns Whether the account has the role.
 */
export async function hasRole(client, parameters) {
    const { account = client.account } = parameters;
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...parameters,
        ...hasRole.call({ ...parameters, account: address }),
    });
}
(function (hasRole) {
    /**
     * Defines a call to the `hasRole` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, role, token } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'hasRole',
            args: [account, TokenRole.serialize(role)],
        });
    }
    hasRole.call = call;
})(hasRole || (hasRole = {}));
/**
 * Grants a role for a TIP20 token.
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
 * const result = await Actions.token.grantRoles(client, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function grantRoles(client, parameters) {
    return grantRoles.inner(sendTransaction, client, parameters);
}
(function (grantRoles) {
    /** @internal */
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = grantRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: encodeFunctionData(call),
                };
            }),
        }));
    }
    grantRoles.inner = inner;
    /**
     * Defines a call to the `grantRole` function.
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
     *     actions.token.grantRoles.call({
     *       token: '0x20c0...babe',
     *       to: '0x20c0...beef',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, to, role } = args;
        const roleHash = TokenRole.serialize(role);
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'grantRole',
            args: [roleHash, to],
        });
    }
    grantRoles.call = call;
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs) {
        const events = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    grantRoles.extractEvents = extractEvents;
})(grantRoles || (grantRoles = {}));
/**
 * Grants a role for a TIP20 token.
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
 * const result = await Actions.token.grantRolesSync(client, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function grantRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await grantRoles.inner(sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = grantRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
/**
 * Mints TIP20 tokens to an address.
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
 * const result = await Actions.token.mint(client, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function mint(client, parameters) {
    return mint.inner(writeContract, client, parameters);
}
(function (mint) {
    /** @internal */
    async function inner(action, client, parameters) {
        const call = mint.call(parameters);
        return (await action(client, {
            ...parameters,
            ...call,
        }));
    }
    mint.inner = inner;
    /**
     * Defines a call to the `mint` or `mintWithMemo` function.
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
     *     actions.token.mint.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
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
        const { to, amount, memo, token } = args;
        const callArgs = memo
            ? {
                functionName: 'mintWithMemo',
                args: [to, amount, Hex.padLeft(memo, 32)],
            }
            : {
                functionName: 'mint',
                args: [to, amount],
            };
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    mint.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'Mint',
        });
        if (!log)
            throw new Error('`Mint` event not found.');
        return log;
    }
    mint.extractEvent = extractEvent;
})(mint || (mint = {}));
/**
 * Mints TIP20 tokens to an address.
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
 * const result = await Actions.token.mintSync(client, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function mintSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await mint.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = mint.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Pauses a TIP20 token.
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
 * const result = await Actions.token.pause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function pause(client, parameters) {
    return pause.inner(writeContract, client, parameters);
}
(function (pause) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = pause.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    pause.inner = inner;
    /**
     * Defines a call to the `pause` function.
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
     *     actions.token.pause.call({
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
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'pause',
            args: [],
        });
    }
    pause.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'PauseStateUpdate',
        });
        if (!log)
            throw new Error('`PauseStateUpdate` event not found.');
        return log;
    }
    pause.extractEvent = extractEvent;
})(pause || (pause = {}));
/**
 * Pauses a TIP20 token.
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
 * const result = await Actions.token.pauseSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function pauseSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await pause.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = pause.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Renounces a role for a TIP20 token.
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
 * const result = await Actions.token.renounceRoles(client, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function renounceRoles(client, parameters) {
    return renounceRoles.inner(sendTransaction, client, parameters);
}
(function (renounceRoles) {
    /** @internal */
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = renounceRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: encodeFunctionData(call),
                };
            }),
        }));
    }
    renounceRoles.inner = inner;
    /**
     * Defines a call to the `renounceRole` function.
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
     *     actions.token.renounceRoles.call({
     *       token: '0x20c0...babe',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, role } = args;
        const roleHash = TokenRole.serialize(role);
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'renounceRole',
            args: [roleHash],
        });
    }
    renounceRoles.call = call;
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs) {
        const events = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    renounceRoles.extractEvents = extractEvents;
})(renounceRoles || (renounceRoles = {}));
/**
 * Renounces a role for a TIP20 token.
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
 * const result = await Actions.token.renounceRolesSync(client, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function renounceRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await renounceRoles.inner(sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = renounceRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
/**
 * Revokes a role for a TIP20 token.
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
 * const result = await Actions.token.revokeRoles(client, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function revokeRoles(client, parameters) {
    return revokeRoles.inner(sendTransaction, client, parameters);
}
(function (revokeRoles) {
    /** @internal */
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = revokeRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: encodeFunctionData(call),
                };
            }),
        }));
    }
    revokeRoles.inner = inner;
    /**
     * Defines a call to the `revokeRole` function.
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
     *     actions.token.revokeRoles.call({
     *       token: '0x20c0...babe',
     *       from: '0x20c0...beef',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, from, role } = args;
        const roleHash = TokenRole.serialize(role);
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'revokeRole',
            args: [roleHash, from],
        });
    }
    revokeRoles.call = call;
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs) {
        const events = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    revokeRoles.extractEvents = extractEvents;
})(revokeRoles || (revokeRoles = {}));
/**
 * Revokes a role for a TIP20 token.
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
 * const result = await Actions.token.revokeRolesSync(client, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function revokeRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await revokeRoles.inner(sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = revokeRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
/**
 * Sets the supply cap for a TIP20 token.
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
 * const result = await Actions.token.setSupplyCap(client, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setSupplyCap(client, parameters) {
    return setSupplyCap.inner(writeContract, client, parameters);
}
(function (setSupplyCap) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { supplyCap, token, ...rest } = parameters;
        const call = setSupplyCap.call({ supplyCap, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setSupplyCap.inner = inner;
    /**
     * Defines a call to the `setSupplyCap` function.
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
     *     actions.token.setSupplyCap.call({
     *       token: '0x20c0...babe',
     *       supplyCap: 1000000n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, supplyCap } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setSupplyCap',
            args: [supplyCap],
        });
    }
    setSupplyCap.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'SupplyCapUpdate',
        });
        if (!log)
            throw new Error('`SupplyCapUpdate` event not found.');
        return log;
    }
    setSupplyCap.extractEvent = extractEvent;
})(setSupplyCap || (setSupplyCap = {}));
/**
 * Sets the supply cap for a TIP20 token.
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
 * const result = await Actions.token.setSupplyCapSync(client, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setSupplyCapSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setSupplyCap.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setSupplyCap.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Sets the admin role for a specific role in a TIP20 token.
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
 * const result = await Actions.token.setRoleAdmin(client, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setRoleAdmin(client, parameters) {
    return setRoleAdmin.inner(writeContract, client, parameters);
}
(function (setRoleAdmin) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { adminRole, role, token, ...rest } = parameters;
        const call = setRoleAdmin.call({ adminRole, role, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setRoleAdmin.inner = inner;
    /**
     * Defines a call to the `setRoleAdmin` function.
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
     *     actions.token.setRoleAdmin.call({
     *       token: '0x20c0...babe',
     *       role: 'issuer',
     *       adminRole: 'admin',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, role, adminRole } = args;
        const roleHash = TokenRole.serialize(role);
        const adminRoleHash = TokenRole.serialize(adminRole);
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setRoleAdmin',
            args: [roleHash, adminRoleHash],
        });
    }
    setRoleAdmin.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleAdminUpdated',
        });
        if (!log)
            throw new Error('`RoleAdminUpdated` event not found.');
        return log;
    }
    setRoleAdmin.extractEvent = extractEvent;
})(setRoleAdmin || (setRoleAdmin = {}));
/**
 * Sets the admin role for a specific role in a TIP20 token.
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
 * const result = await Actions.token.setRoleAdminSync(client, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setRoleAdminSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setRoleAdmin.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setRoleAdmin.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Transfers TIP20 tokens to another address.
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
 * const result = await Actions.token.transfer(client, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function transfer(client, parameters) {
    return transfer.inner(writeContract, client, parameters);
}
(function (transfer) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { amount, from, memo, token, to, ...rest } = parameters;
        const call = transfer.call({ amount, from, memo, token, to });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    transfer.inner = inner;
    /**
     * Defines a call to the `transfer`, `transferFrom`, `transferWithMemo`, or `transferFromWithMemo` function.
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
     *     actions.token.transfer.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
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
        const { amount, from, memo, token, to } = args;
        const callArgs = (() => {
            if (memo && from)
                return {
                    functionName: 'transferFromWithMemo',
                    args: [from, to, amount, Hex.padLeft(memo, 32)],
                };
            if (memo)
                return {
                    functionName: 'transferWithMemo',
                    args: [to, amount, Hex.padLeft(memo, 32)],
                };
            if (from)
                return {
                    functionName: 'transferFrom',
                    args: [from, to, amount],
                };
            return {
                functionName: 'transfer',
                args: [to, amount],
            };
        })();
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    transfer.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'Transfer',
        });
        if (!log)
            throw new Error('`Transfer` event not found.');
        return log;
    }
    transfer.extractEvent = extractEvent;
})(transfer || (transfer = {}));
/**
 * Transfers TIP20 tokens to another address.
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
 * const result = await Actions.token.transferSync(client, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function transferSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await transfer.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = transfer.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Unpauses a TIP20 token.
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
 * const result = await Actions.token.unpause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function unpause(client, parameters) {
    return unpause.inner(writeContract, client, parameters);
}
(function (unpause) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = unpause.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    unpause.inner = inner;
    /**
     * Defines a call to the `unpause` function.
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
     *     actions.token.unpause.call({
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
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'unpause',
            args: [],
        });
    }
    unpause.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'PauseStateUpdate',
        });
        if (!log)
            throw new Error('`PauseStateUpdate` event not found.');
        return log;
    }
    unpause.extractEvent = extractEvent;
})(unpause || (unpause = {}));
/**
 * Unpauses a TIP20 token.
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
 * const result = await Actions.token.unpauseSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function unpauseSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await unpause.inner(writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = unpause.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Updates the quote token for a TIP20 token.
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
 * const result = await Actions.token.prepareUpdateQuoteToken(client, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function prepareUpdateQuoteToken(client, parameters) {
    return prepareUpdateQuoteToken.inner(writeContract, client, parameters);
}
(function (prepareUpdateQuoteToken) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { quoteToken, token, ...rest } = parameters;
        const call = prepareUpdateQuoteToken.call({ quoteToken, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    prepareUpdateQuoteToken.inner = inner;
    /**
     * Defines a call to the `prepareUpdateQuoteToken` function.
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
     *     actions.token.prepareUpdateQuoteToken.call({
     *       token: '0x20c0...babe',
     *       quoteToken: '0x20c0...cafe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { token, quoteToken } = args;
        return defineCall({
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setNextQuoteToken',
            args: [TokenId.toAddress(quoteToken)],
        });
    }
    prepareUpdateQuoteToken.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'NextQuoteTokenSet',
        });
        if (!log)
            throw new Error('`NextQuoteTokenSet` event not found.');
        return log;
    }
    prepareUpdateQuoteToken.extractEvent = extractEvent;
})(prepareUpdateQuoteToken || (prepareUpdateQuoteToken = {}));
/**
 * Updates the quote token for a TIP20 token.
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
 * const result = await Actions.token.prepareUpdateQuoteTokenSync(client, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function prepareUpdateQuoteTokenSync(client, parameters) {
    const receipt = await prepareUpdateQuoteToken.inner(writeContractSync, client, parameters);
    const { args } = prepareUpdateQuoteToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Updates the quote token for a TIP20 token.
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
 * const result = await Actions.token.updateQuoteToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function updateQuoteToken(client, parameters) {
    return updateQuoteToken.inner(writeContract, client, parameters);
}
(function (updateQuoteToken) {
    /** @internal */
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = updateQuoteToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    updateQuoteToken.inner = inner;
    /**
     * Defines a call to the `updateQuoteToken` function.
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
     *     actions.token.updateQuoteToken.call({
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
            address: TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'completeQuoteTokenUpdate',
            args: [],
        });
    }
    updateQuoteToken.call = call;
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs) {
        const [log] = parseEventLogs({
            abi: Abis.tip20,
            logs,
            eventName: 'QuoteTokenUpdate',
        });
        if (!log)
            throw new Error('`QuoteTokenUpdateCompleted` event not found.');
        return log;
    }
    updateQuoteToken.extractEvent = extractEvent;
})(updateQuoteToken || (updateQuoteToken = {}));
/**
 * Updates the quote token for a TIP20 token.
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
 * const result = await Actions.token.updateQuoteTokenSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function updateQuoteTokenSync(client, parameters) {
    const receipt = await updateQuoteToken.inner(writeContractSync, client, parameters);
    const { args } = updateQuoteToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
/**
 * Watches for TIP20 token approval events.
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
 * const unwatch = actions.token.watchApprove(client, {
 *   onApproval: (args, log) => {
 *     console.log('Approval:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchApprove(client, parameters) {
    const { onApproval, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Approval',
        onLogs: (logs) => {
            for (const log of logs)
                onApproval(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token burn events.
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
 * const unwatch = actions.token.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Burn:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBurn(client, parameters) {
    const { onBurn, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Burn',
        onLogs: (logs) => {
            for (const log of logs)
                onBurn(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for new TIP20 tokens created.
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
 * const unwatch = actions.token.watchCreate(client, {
 *   onTokenCreated: (args, log) => {
 *     console.log('Token created:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchCreate(client, parameters) {
    const { onTokenCreated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.tip20Factory,
        abi: Abis.tip20Factory,
        eventName: 'TokenCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onTokenCreated(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token mint events.
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
 * const unwatch = actions.token.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Mint:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchMint(client, parameters) {
    const { onMint, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Mint',
        onLogs: (logs) => {
            for (const log of logs)
                onMint(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token role admin updates.
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
 * const unwatch = actions.token.watchAdminRole(client, {
 *   onRoleAdminUpdated: (args, log) => {
 *     console.log('Role admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchAdminRole(client, parameters) {
    const { onRoleAdminUpdated, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'RoleAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onRoleAdminUpdated(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token role membership updates.
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
 * const unwatch = actions.token.watchRole(client, {
 *   onRoleUpdated: (args, log) => {
 *     console.log('Role updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRole(client, parameters) {
    const { onRoleUpdated, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'RoleMembershipUpdated',
        onLogs: (logs) => {
            for (const log of logs) {
                const type = log.args.hasRole ? 'granted' : 'revoked';
                onRoleUpdated({ ...log.args, type }, log);
            }
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token transfer events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchTransfer(client, {
 *   onTransfer: (args, log) => {
 *     console.log('Transfer:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchTransfer(client, parameters) {
    const { onTransfer, token, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Transfer',
        onLogs: (logs) => {
            for (const log of logs)
                onTransfer(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for TIP20 token quote token update events.
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
 * const unwatch = actions.token.watchUpdateQuoteToken(client, {
 *   onUpdateQuoteToken: (args, log) => {
 *     if (args.completed)
 *       console.log('quote token update completed:', args.newQuoteToken)
 *     else
 *       console.log('quote token update proposed:', args.newQuoteToken)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchUpdateQuoteToken(client, parameters) {
    const { onUpdateQuoteToken, token, ...rest } = parameters;
    const address = TokenId.toAddress(token);
    return watchContractEvent(client, {
        ...rest,
        address,
        abi: Abis.tip20,
        onLogs: (logs) => {
            for (const log of logs) {
                if (log.eventName !== 'NextQuoteTokenSet' &&
                    log.eventName !== 'QuoteTokenUpdate')
                    continue;
                onUpdateQuoteToken({
                    ...log.args,
                    completed: log.eventName === 'QuoteTokenUpdate',
                }, log);
            }
        },
        strict: true,
    });
}
//# sourceMappingURL=token.js.map
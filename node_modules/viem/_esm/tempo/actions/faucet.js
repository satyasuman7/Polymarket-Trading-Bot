import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { waitForTransactionReceipt } from '../../actions/public/waitForTransactionReceipt.js';
/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet.
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
 * const hashes = await Actions.faucet.fund(client, {
 *   account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function fund(client, parameters) {
    const account = parseAccount(parameters.account);
    return client.request({
        method: 'tempo_fundAddress',
        params: [account.address],
    });
}
/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet. Waits for the transactions to be included
 * on a block before returning a response.
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
 * const hashes = await Actions.faucet.fundSync(client, {
 *   account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function fundSync(client, parameters) {
    const { timeout = 10_000 } = parameters;
    const account = parseAccount(parameters.account);
    const hashes = await client.request({
        method: 'tempo_fundAddress',
        params: [account.address],
    });
    const receipts = await Promise.all(hashes.map((hash) => waitForTransactionReceipt(client, {
        hash,
        checkReplacement: false,
        timeout,
    })));
    return receipts;
}
//# sourceMappingURL=faucet.js.map
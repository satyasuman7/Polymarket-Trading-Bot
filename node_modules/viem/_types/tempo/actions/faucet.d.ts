import type { Address } from 'abitype';
import type { Account } from '../../accounts/types.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { TransactionReceipt } from '../Transaction.js';
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
export declare function fund<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: fund.Parameters): Promise<fund.ReturnValue>;
export declare namespace fund {
    type Parameters = {
        /** Account to fund. */
        account: Account | Address;
    };
    type ReturnValue = readonly Hash[];
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
export declare function fundSync<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: fundSync.Parameters): Promise<fundSync.ReturnValue>;
export declare namespace fundSync {
    type Parameters = {
        /** Account to fund. */
        account: Account | Address;
        /** Timeout. */
        timeout?: number | undefined;
    };
    type ReturnValue = readonly TransactionReceipt[];
}
//# sourceMappingURL=faucet.d.ts.map
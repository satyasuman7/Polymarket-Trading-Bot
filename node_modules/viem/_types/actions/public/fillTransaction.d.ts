import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { UnionOmit } from '../../types/utils.js';
import { type GetTransactionErrorReturnType } from '../../utils/errors/getTransactionError.js';
import { type FormattedTransaction } from '../../utils/formatters/transaction.js';
import { type FormattedTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import type { NonceManager } from '../../utils/nonceManager.js';
export type FillTransactionParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, accountOverride extends Account | Address | undefined = Account | Address | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = UnionOmit<FormattedTransactionRequest<_derivedChain>, 'from'> & GetAccountParameter<account, accountOverride, false, true> & GetChainParameter<chain, chainOverride> & {
    /**
     * Nonce manager to use for the transaction request.
     */
    nonceManager?: NonceManager | undefined;
};
export type FillTransactionReturnType<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = {
    raw: Hex;
    transaction: FormattedTransaction<_derivedChain>;
};
export type FillTransactionErrorType = GetTransactionErrorReturnType<ErrorType> | ErrorType;
/**
 * Fills a transaction request with the necessary fields to be signed over.
 *
 * - Docs: https://viem.sh/docs/actions/public/fillTransaction
 *
 * @param client - Client to use
 * @param parameters - {@link FillTransactionParameters}
 * @returns The filled transaction. {@link FillTransactionReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { fillTransaction } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const result = await fillTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export declare function fillTransaction<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(client: Client<Transport, chain, account>, parameters: FillTransactionParameters<chain, account, chainOverride, accountOverride>): Promise<FillTransactionReturnType<chain, chainOverride>>;
//# sourceMappingURL=fillTransaction.d.ts.map
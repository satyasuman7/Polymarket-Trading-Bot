// TODO: Find opportunities to make this file less duplicated + more simplified with Viem v3.
import * as Hex from 'ox/Hex';
import { Transaction as ox_Transaction, TransactionRequest as ox_TransactionRequest, } from 'ox/tempo';
import { parseAccount } from '../accounts/utils/parseAccount.js';
import { formatTransaction as viem_formatTransaction } from '../utils/formatters/transaction.js';
import { formatTransactionReceipt as viem_formatTransactionReceipt } from '../utils/formatters/transactionReceipt.js';
import { formatTransactionRequest as viem_formatTransactionRequest } from '../utils/formatters/transactionRequest.js';
import { isTempo, } from './Transaction.js';
export function formatTransaction(transaction) {
    if (!isTempo(transaction))
        return viem_formatTransaction(transaction);
    const { feePayerSignature, gasPrice: _, nonce, ...tx } = ox_Transaction.fromRpc(transaction);
    return {
        ...tx,
        accessList: tx.accessList,
        feePayerSignature: feePayerSignature
            ? {
                r: Hex.fromNumber(feePayerSignature.r, { size: 32 }),
                s: Hex.fromNumber(feePayerSignature.s, { size: 32 }),
                v: BigInt(feePayerSignature.v ?? 27),
                yParity: feePayerSignature.yParity,
            }
            : undefined,
        nonce: Number(nonce),
        typeHex: ox_Transaction.toRpcType[tx.type],
        type: tx.type,
    };
}
export function formatTransactionReceipt(receipt) {
    return viem_formatTransactionReceipt(receipt);
}
export function formatTransactionRequest(r, action) {
    const request = r;
    const account = request.account
        ? parseAccount(request.account)
        : undefined;
    // If the request is not a Tempo transaction, route to Viem formatter.
    if (!isTempo(request))
        return viem_formatTransactionRequest(r, action);
    if (action)
        request.calls = request.calls ?? [
            {
                to: r.to ||
                    (!r.data || r.data === '0x'
                        ? '0x0000000000000000000000000000000000000000'
                        : undefined),
                value: r.value,
                data: r.data,
            },
        ];
    // If we have marked the transaction as intended to be paid
    // by a fee payer (feePayer: true), we will not use the fee token
    // as the fee payer will choose their fee token.
    if (request.feePayer === true)
        delete request.feeToken;
    const rpc = ox_TransactionRequest.toRpc({
        ...request,
        type: 'tempo',
    });
    if (action === 'estimateGas') {
        rpc.maxFeePerGas = undefined;
        rpc.maxPriorityFeePerGas = undefined;
    }
    rpc.to = undefined;
    rpc.data = undefined;
    rpc.value = undefined;
    const [keyType, keyData] = (() => {
        const type = account && 'keyType' in account ? account.keyType : account?.source;
        if (!type)
            return [undefined, undefined];
        if (type === 'webAuthn')
            // TODO: derive correct bytes size of key data based on webauthn create metadata.
            return ['webAuthn', `0x${'ff'.repeat(1400)}`];
        if (['p256', 'secp256k1'].includes(type))
            return [type, undefined];
        return [undefined, undefined];
    })();
    const keyId = account && 'accessKeyAddress' in account
        ? account.accessKeyAddress
        : undefined;
    return {
        ...rpc,
        ...(keyData ? { keyData } : {}),
        ...(keyId ? { keyId } : {}),
        ...(keyType ? { keyType } : {}),
        ...(request.feePayer
            ? {
                feePayer: typeof request.feePayer === 'object'
                    ? parseAccount(request.feePayer)
                    : request.feePayer,
            }
            : {}),
    };
}
//# sourceMappingURL=Formatters.js.map
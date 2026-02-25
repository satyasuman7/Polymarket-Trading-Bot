// TODO: Find opportunities to make this file less duplicated + more simplified with Viem v3.
import * as Hex from 'ox/Hex';
import * as Secp256k1 from 'ox/Secp256k1';
import * as Signature from 'ox/Signature';
import { SignatureEnvelope, TxEnvelopeTempo as TxTempo, } from 'ox/tempo';
import { getTransactionType as viem_getTransactionType } from '../utils/transaction/getTransactionType.js';
import { parseTransaction as viem_parseTransaction, } from '../utils/transaction/parseTransaction.js';
import { serializeTransaction as viem_serializeTransaction } from '../utils/transaction/serializeTransaction.js';
export function getType(transaction) {
    const account = transaction.account;
    if ((account?.keyType && account.keyType !== 'secp256k1') ||
        typeof transaction.calls !== 'undefined' ||
        typeof transaction.feePayer !== 'undefined' ||
        typeof transaction.feeToken !== 'undefined' ||
        typeof transaction.keyAuthorization !== 'undefined' ||
        typeof transaction.nonceKey !== 'undefined' ||
        typeof transaction.signature !== 'undefined' ||
        typeof transaction.validBefore !== 'undefined' ||
        typeof transaction.validAfter !== 'undefined')
        return 'tempo';
    if (transaction.type)
        return transaction.type;
    return viem_getTransactionType(transaction);
}
export function isTempo(transaction) {
    try {
        const type = getType(transaction);
        return type === 'tempo';
    }
    catch {
        return false;
    }
}
export function deserialize(serializedTransaction) {
    const type = Hex.slice(serializedTransaction, 0, 1);
    if (type === '0x76' || type === '0x78')
        return deserializeTempo(serializedTransaction);
    return viem_parseTransaction(serializedTransaction);
}
export async function serialize(transaction, signature) {
    // If the transaction is not a Tempo transaction, route to Viem serializer.
    if (!isTempo(transaction)) {
        if (signature && 'type' in signature && signature.type !== 'secp256k1')
            throw new Error('Unsupported signature type. Expected `secp256k1` but got `' +
                signature.type +
                '`.');
        if (signature && 'type' in signature) {
            const { r, s, yParity } = signature?.signature;
            return viem_serializeTransaction(transaction, {
                r: Hex.fromNumber(r, { size: 32 }),
                s: Hex.fromNumber(s, { size: 32 }),
                yParity,
            });
        }
        return viem_serializeTransaction(transaction, signature);
    }
    const type = getType(transaction);
    if (type === 'tempo')
        return serializeTempo(transaction, signature);
    throw new Error('Unsupported transaction type');
}
////////////////////////////////////////////////////////////////////////////////////
// Internal
/** @internal */
function deserializeTempo(serializedTransaction) {
    const { feePayerSignature, nonce, ...tx } = TxTempo.deserialize(serializedTransaction);
    return {
        ...tx,
        nonce: Number(nonce ?? 0n),
        feePayerSignature: feePayerSignature
            ? {
                r: Hex.fromNumber(feePayerSignature.r, { size: 32 }),
                s: Hex.fromNumber(feePayerSignature.s, { size: 32 }),
                yParity: feePayerSignature.yParity,
            }
            : feePayerSignature,
    };
}
/** @internal */
async function serializeTempo(transaction, sig) {
    const signature = (() => {
        if (transaction.signature)
            return transaction.signature;
        if (sig && 'type' in sig)
            return sig;
        if (sig)
            return SignatureEnvelope.from({
                r: BigInt(sig.r),
                s: BigInt(sig.s),
                yParity: Number(sig.yParity),
            });
        return undefined;
    })();
    const { chainId, feePayer, feePayerSignature, nonce, ...rest } = transaction;
    const transaction_ox = {
        ...rest,
        calls: rest.calls?.length
            ? rest.calls
            : [
                {
                    to: rest.to ||
                        (!rest.data || rest.data === '0x'
                            ? '0x0000000000000000000000000000000000000000'
                            : undefined),
                    value: rest.value,
                    data: rest.data,
                },
            ],
        chainId: Number(chainId),
        feePayerSignature: feePayerSignature
            ? {
                r: BigInt(feePayerSignature.r),
                s: BigInt(feePayerSignature.s),
                yParity: Number(feePayerSignature.yParity),
            }
            : feePayer
                ? null
                : undefined,
        type: 'tempo',
        ...(nonce ? { nonce: BigInt(nonce) } : {}),
    };
    // If we have marked the transaction as intended to be paid
    // by a fee payer (feePayer: true), we will not use the fee token
    // as the fee payer will choose their fee token.
    if (feePayer === true)
        delete transaction_ox.feeToken;
    if (signature && typeof transaction.feePayer === 'object') {
        const tx = TxTempo.from(transaction_ox, {
            signature,
        });
        const sender = (() => {
            if (transaction.from)
                return transaction.from;
            if (signature.type === 'secp256k1')
                return Secp256k1.recoverAddress({
                    payload: TxTempo.getSignPayload(tx),
                    signature: signature.signature,
                });
            throw new Error('Unable to extract sender from transaction or signature.');
        })();
        const hash = TxTempo.getFeePayerSignPayload(tx, {
            sender,
        });
        const feePayerSignature = await transaction.feePayer.sign({
            hash,
        });
        return TxTempo.serialize(tx, {
            feePayerSignature: Signature.from(feePayerSignature),
        });
    }
    if (feePayer === true) {
        if (signature)
            return TxTempo.serialize(transaction_ox, {
                format: 'feePayer',
                sender: transaction.from,
                signature,
            });
        return TxTempo.serialize(transaction_ox, {
            feePayerSignature: null,
        });
    }
    return TxTempo.serialize(
    // If we have specified a fee payer, the user will not be signing over the fee token.
    // Defer the fee token signing to the fee payer.
    { ...transaction_ox, ...(feePayer ? { feeToken: undefined } : {}) }, {
        feePayerSignature: undefined,
        signature,
    });
}
// Export types required for inference.
// biome-ignore lint/performance/noBarrelFile: _
export { 
/** @deprecated */
KeyAuthorization as z_KeyAuthorization, 
/** @deprecated */
SignatureEnvelope as z_SignatureEnvelope, 
/** @deprecated */
TxEnvelopeTempo as z_TxEnvelopeTempo, } from 'ox/tempo';
//# sourceMappingURL=Transaction.js.map
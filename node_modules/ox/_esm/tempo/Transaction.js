import * as Hex from '../core/Hex.js';
import * as Signature from '../core/Signature.js';
import * as ox_Transaction from '../core/Transaction.js';
import * as AuthorizationTempo from './AuthorizationTempo.js';
import * as KeyAuthorization from './KeyAuthorization.js';
import * as SignatureEnvelope from './SignatureEnvelope.js';
/** Type to RPC Type mapping. */
export const toRpcType = {
    ...ox_Transaction.toRpcType,
    tempo: '0x76',
};
/** RPC Type to Type mapping. */
export const fromRpcType = {
    ...ox_Transaction.fromRpcType,
    '0x76': 'tempo',
};
/**
 * Converts an {@link ox#Transaction.Rpc} to an {@link ox#Transaction.Transaction}.
 *
 * @example
 * ```ts twoslash
 * import { Transaction } from 'ox/tempo'
 *
 * const transaction = Transaction.fromRpc({
 *   hash: '0x353fdfc38a2f26115daadee9f5b8392ce62b84f410957967e2ed56b35338cdd0',
 *   nonce: '0x357',
 *   blockHash:
 *     '0xc350d807505fb835650f0013632c5515592987ba169bbc6626d9fc54d91f0f0b',
 *   blockNumber: '0x12f296f',
 *   calls: [
 *     {
 *       input: '0xdeadbeef',
 *       to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
 *       value: '0x9b6e64a8ec60000',
 *     },
 *   ],
 *   feeToken: '0x20c0000000000000000000000000000000000000',
 *   transactionIndex: '0x2',
 *   from: '0x814e5e0e31016b9a7f138c76b7e7b2bb5c1ab6a6',
 *   value: '0x9b6e64a8ec60000',
 *   gas: '0x43f5d',
 *   maxFeePerGas: '0x2ca6ae494',
 *   maxPriorityFeePerGas: '0x41cc3c0',
 *   input:
 *     '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006643504700000000000000000000000000000000000000000000000000000000000000040b080604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec60000000000000000000000000000000000000000000000000000019124bb5ae978c000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8000000000000000000000000000000fee13a103a10d593b9ae06b3e05f2e7e1c00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000190240001b9872b',
 *   signature: {
 *     r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
 *     s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
 *     type: 'secp256k1',
 *     yParity: '0x0',
 *   },
 *   chainId: '0x1',
 *   accessList: [],
 *   type: '0x76',
 * })
 * ```
 *
 * @param transaction - The RPC transaction to convert.
 * @returns An instantiated {@link ox#Transaction.Transaction}.
 */
export function fromRpc(transaction, _options = {}) {
    if (!transaction)
        return null;
    const transaction_ = ox_Transaction.fromRpc(transaction);
    transaction_.type = fromRpcType[transaction.type];
    if (transaction.aaAuthorizationList) {
        transaction_.authorizationList = AuthorizationTempo.fromRpcList(transaction.aaAuthorizationList);
        delete transaction_.aaAuthorizationList;
    }
    if (transaction.calls)
        transaction_.calls = transaction.calls.map((call) => ({
            to: call.to,
            value: call.value && call.value !== '0x' ? BigInt(call.value) : undefined,
            // @ts-expect-error
            data: call.input || call.data || '0x',
        }));
    if (transaction.feeToken)
        transaction_.feeToken = transaction.feeToken;
    if (transaction.nonceKey)
        transaction_.nonceKey = BigInt(transaction.nonceKey);
    if (transaction.signature)
        transaction_.signature = SignatureEnvelope.fromRpc(transaction.signature);
    if (transaction.validAfter)
        transaction_.validAfter = Number(transaction.validAfter);
    if (transaction.validBefore)
        transaction_.validBefore = Number(transaction.validBefore);
    if (transaction.keyAuthorization)
        transaction_.keyAuthorization = KeyAuthorization.fromRpc(transaction.keyAuthorization);
    if (transaction.feePayerSignature) {
        transaction_.feePayerSignature = Signature.fromRpc(transaction.feePayerSignature);
        transaction_.feePayerSignature.v = Signature.yParityToV(transaction_.feePayerSignature.yParity);
    }
    return transaction_;
}
/**
 * Converts an {@link ox#Transaction.Transaction} to an {@link ox#Transaction.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { Transaction } from 'ox/tempo'
 *
 * const transaction = Transaction.toRpc({
 *   accessList: [],
 *   blockHash:
 *     '0xc350d807505fb835650f0013632c5515592987ba169bbc6626d9fc54d91f0f0b',
 *   blockNumber: 19868015n,
 *   calls: [
 *     {
 *       data: '0xdeadbeef',
 *       to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
 *       value: 700000000000000000n,
 *     },
 *   ],
 *   chainId: 1,
 *   feeToken: '0x20c0000000000000000000000000000000000000',
 *   from: '0x814e5e0e31016b9a7f138c76b7e7b2bb5c1ab6a6',
 *   gas: 278365n,
 *   hash: '0x353fdfc38a2f26115daadee9f5b8392ce62b84f410957967e2ed56b35338cdd0',
 *   input:
 *     '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006643504700000000000000000000000000000000000000000000000000000000000000040b080604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec60000000000000000000000000000000000000000000000000000019124bb5ae978c000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8000000000000000000000000000000fee13a103a10d593b9ae06b3e05f2e7e1c00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000190240001b9872b',
 *   maxFeePerGas: 11985937556n,
 *   maxPriorityFeePerGas: 68993984n,
 *   nonce: 855n,
 *   signature: {
 *     signature: {
 *       r: 44944627813007772897391531230081695102703289123332187696115181104739239197517n,
 *       s: 36528503505192438307355164441104001310566505351980369085208178712678799181120n,
 *       yParity: 0,
 *     },
 *     type: 'secp256k1',
 *   },
 *   transactionIndex: 2,
 *   type: 'tempo',
 * })
 * ```
 *
 * @param transaction - The transaction to convert.
 * @returns An RPC-formatted transaction.
 */
export function toRpc(transaction, _options) {
    const rpc = ox_Transaction.toRpc(transaction);
    rpc.type = toRpcType[transaction.type];
    if (transaction.authorizationList)
        rpc.aaAuthorizationList = AuthorizationTempo.toRpcList(transaction.authorizationList);
    if (transaction.calls)
        rpc.calls = transaction.calls.map((call) => ({
            to: call.to,
            value: call.value ? Hex.fromNumber(call.value) : undefined,
            data: call.data,
        }));
    if (transaction.feeToken)
        rpc.feeToken = transaction.feeToken;
    if (transaction.keyAuthorization)
        rpc.keyAuthorization = KeyAuthorization.toRpc(transaction.keyAuthorization);
    if (transaction.feePayerSignature) {
        rpc.feePayerSignature = Signature.toRpc(transaction.feePayerSignature);
        rpc.feePayerSignature.v = Hex.fromNumber(Signature.yParityToV(transaction.feePayerSignature?.yParity));
    }
    if (transaction.signature)
        rpc.signature = SignatureEnvelope.toRpc(transaction.signature);
    if (typeof transaction.validAfter === 'number')
        rpc.validAfter = Hex.fromNumber(transaction.validAfter);
    if (typeof transaction.validBefore === 'number')
        rpc.validBefore = Hex.fromNumber(transaction.validBefore);
    return rpc;
}
//# sourceMappingURL=Transaction.js.map
import type { Address } from 'abitype';
import * as Hex from 'ox/Hex';
import { type AuthorizationTempo, type KeyAuthorization, type TransactionReceipt as ox_TransactionReceipt, SignatureEnvelope, TxEnvelopeTempo as TxTempo } from 'ox/tempo';
import type { Account } from '../accounts/types.js';
import type { FeeValuesEIP1559 } from '../types/fee.js';
import type { Signature as viem_Signature } from '../types/misc.js';
import type { RpcTransaction as viem_RpcTransaction, RpcTransactionRequest as viem_RpcTransactionRequest } from '../types/rpc.js';
import type { AccessList, TransactionBase, TransactionRequestBase, TransactionSerializableBase, TransactionSerializedGeneric, Transaction as viem_Transaction, TransactionReceipt as viem_TransactionReceipt, TransactionRequest as viem_TransactionRequest, TransactionSerializable as viem_TransactionSerializable, TransactionSerialized as viem_TransactionSerialized, TransactionType as viem_TransactionType } from '../types/transaction.js';
import type { ExactPartial, OneOf, PartialBy } from '../types/utils.js';
import { type ParseTransactionReturnType } from '../utils/transaction/parseTransaction.js';
export type Transaction<bigintType = bigint, numberType = number, pending extends boolean = false> = OneOf<viem_Transaction<bigintType, numberType, pending> | TransactionTempo<bigintType, numberType, pending>>;
export type TransactionRpc<pending extends boolean = false> = OneOf<viem_RpcTransaction<pending> | (Omit<TransactionTempo<Hex.Hex, Hex.Hex, pending, '0x76'>, 'authorizationList' | 'keyAuthorization' | 'signature'> & {
    authorizationList?: AuthorizationTempo.ListRpc | undefined;
    keyAuthorization?: KeyAuthorization.Rpc | null | undefined;
    signature: SignatureEnvelope.SignatureEnvelopeRpc;
})>;
export type TransactionTempo<quantity = bigint, index = number, isPending extends boolean = boolean, type = 'tempo'> = PartialBy<Omit<TransactionBase<quantity, index, isPending>, 'input' | 'value' | 'to'>, 'r' | 's' | 'v' | 'yParity'> & {
    accessList: AccessList;
    authorizationList?: AuthorizationTempo.ListSigned<quantity, index> | undefined;
    calls: readonly TxTempo.Call<quantity>[];
    chainId: index;
    feeToken?: Address | undefined;
    feePayerSignature?: viem_Signature | undefined;
    keyAuthorization?: KeyAuthorization.Signed<quantity, index> | null | undefined;
    nonceKey?: quantity | undefined;
    signature: SignatureEnvelope.SignatureEnvelope;
    type: type;
    validBefore?: index | undefined;
    validAfter?: index | undefined;
} & FeeValuesEIP1559<quantity>;
export type TransactionRequest<bigintType = bigint, numberType = number> = OneOf<viem_TransactionRequest<bigintType, numberType> | TransactionRequestTempo<bigintType, numberType>>;
export type TransactionRequestRpc = OneOf<viem_RpcTransactionRequest | TransactionRequestTempo<Hex.Hex, Hex.Hex, '0x76'>>;
export type TransactionReceipt<quantity = bigint, index = number, status = 'success' | 'reverted', type = TransactionType> = viem_TransactionReceipt<quantity, index, status, type> & {
    feePayer?: Address | undefined;
    feeToken?: Address | undefined;
};
export type TransactionReceiptRpc = TransactionReceipt<Hex.Hex, Hex.Hex, ox_TransactionReceipt.RpcStatus, ox_TransactionReceipt.RpcType>;
export type TransactionRequestTempo<quantity = bigint, index = number, type = 'tempo'> = TransactionRequestBase<quantity, index, type> & ExactPartial<FeeValuesEIP1559<quantity>> & {
    accessList?: AccessList | undefined;
    keyAuthorization?: KeyAuthorization.Signed<quantity, index> | undefined;
    calls?: readonly TxTempo.Call<quantity>[] | undefined;
    feePayer?: Account | true | undefined;
    feeToken?: Address | bigint | undefined;
    nonceKey?: 'expiring' | quantity | undefined;
    validBefore?: index | undefined;
    validAfter?: index | undefined;
};
export type TransactionSerializable = OneOf<viem_TransactionSerializable | TransactionSerializableTempo>;
export type TransactionSerializableTempo<quantity = bigint, index = number> = TransactionSerializableBase<quantity, index> & ExactPartial<FeeValuesEIP1559<quantity>> & {
    accessList?: AccessList | undefined;
    calls: readonly TxTempo.Call<quantity>[];
    chainId: number;
    feeToken?: Address | bigint | undefined;
    feePayerSignature?: viem_Signature | null | undefined;
    from?: Address | undefined;
    keyAuthorization?: KeyAuthorization.Signed<quantity, index> | undefined;
    nonceKey?: quantity | undefined;
    signature?: SignatureEnvelope.SignatureEnvelope<quantity, index> | undefined;
    validBefore?: index | undefined;
    validAfter?: index | undefined;
    type?: 'tempo' | undefined;
};
export type TransactionSerialized<type extends TransactionType = TransactionType> = viem_TransactionSerialized<type> | TransactionSerializedTempo;
export type TransactionSerializedTempo = `0x76${string}`;
export type TransactionSerializedFeePayer = `0x78${string}`;
export type TransactionType = viem_TransactionType | 'tempo';
export declare function getType(transaction: Record<string, unknown>): Transaction['type'];
export declare function isTempo(transaction: Record<string, unknown>): boolean;
export declare function deserialize<const serialized extends TransactionSerializedGeneric>(serializedTransaction: serialized): deserialize.ReturnValue<serialized>;
export declare namespace deserialize {
    type ReturnValue<serialized extends TransactionSerializedGeneric = TransactionSerializedGeneric> = serialized extends TransactionSerializedTempo ? TransactionSerializableTempo : serialized extends TransactionSerializedFeePayer ? TransactionSerializableTempo : ParseTransactionReturnType<serialized>;
}
export declare function serialize(transaction: TransactionSerializable & {
    feePayer?: Account | true | undefined;
    from?: Address | undefined;
}, signature?: OneOf<SignatureEnvelope.SignatureEnvelope | viem_Signature> | undefined): Promise<`0x${string}`>;
export { 
/** @deprecated */
KeyAuthorization as z_KeyAuthorization, 
/** @deprecated */
SignatureEnvelope as z_SignatureEnvelope, 
/** @deprecated */
TxEnvelopeTempo as z_TxEnvelopeTempo, } from 'ox/tempo';
//# sourceMappingURL=Transaction.d.ts.map
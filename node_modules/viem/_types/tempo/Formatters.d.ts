import { type Transaction, type TransactionReceipt, type TransactionReceiptRpc, type TransactionRequest, type TransactionRequestRpc, type TransactionRpc } from './Transaction.js';
export declare function formatTransaction(transaction: TransactionRpc): Transaction<bigint, number, boolean>;
export declare function formatTransactionReceipt(receipt: TransactionReceiptRpc): TransactionReceipt;
export declare function formatTransactionRequest(r: TransactionRequest, action?: string | undefined): TransactionRequestRpc;
//# sourceMappingURL=Formatters.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTransaction = fillTransaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const fee_js_1 = require("../../errors/fee.js");
const getTransactionError_js_1 = require("../../utils/errors/getTransactionError.js");
const extract_js_1 = require("../../utils/formatters/extract.js");
const transaction_js_1 = require("../../utils/formatters/transaction.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const getAction_js_1 = require("../../utils/getAction.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const getBlock_js_1 = require("./getBlock.js");
const getChainId_js_1 = require("./getChainId.js");
async function fillTransaction(client, parameters) {
    const { account = client.account, accessList, authorizationList, chain = client.chain, blobVersionedHashes, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce: nonce_, nonceManager, to, type, value, ...rest } = parameters;
    const nonce = await (async () => {
        if (!account)
            return nonce_;
        if (!nonceManager)
            return nonce_;
        if (typeof nonce_ !== 'undefined')
            return nonce_;
        const account_ = (0, parseAccount_js_1.parseAccount)(account);
        const chainId = chain
            ? chain.id
            : await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
        return await nonceManager.consume({
            address: account_.address,
            chainId,
            client,
        });
    })();
    (0, assertRequest_js_1.assertRequest)(parameters);
    const chainFormat = chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
    const request = format({
        ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
        account: account ? (0, parseAccount_js_1.parseAccount)(account) : undefined,
        accessList,
        authorizationList,
        blobs,
        blobVersionedHashes,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        type,
        value,
    }, 'fillTransaction');
    try {
        const response = await client.request({
            method: 'eth_fillTransaction',
            params: [request],
        });
        const format = chain?.formatters?.transaction?.format || transaction_js_1.formatTransaction;
        const transaction = format(response.tx);
        delete transaction.blockHash;
        delete transaction.blockNumber;
        delete transaction.r;
        delete transaction.s;
        delete transaction.transactionIndex;
        delete transaction.v;
        delete transaction.yParity;
        transaction.data = transaction.input;
        if (transaction.gas)
            transaction.gas = parameters.gas ?? transaction.gas;
        if (transaction.gasPrice)
            transaction.gasPrice = parameters.gasPrice ?? transaction.gasPrice;
        if (transaction.maxFeePerBlobGas)
            transaction.maxFeePerBlobGas =
                parameters.maxFeePerBlobGas ?? transaction.maxFeePerBlobGas;
        if (transaction.maxFeePerGas)
            transaction.maxFeePerGas =
                parameters.maxFeePerGas ?? transaction.maxFeePerGas;
        if (transaction.maxPriorityFeePerGas)
            transaction.maxPriorityFeePerGas =
                parameters.maxPriorityFeePerGas ?? transaction.maxPriorityFeePerGas;
        if (transaction.nonce)
            transaction.nonce = parameters.nonce ?? transaction.nonce;
        const feeMultiplier = await (async () => {
            if (typeof chain?.fees?.baseFeeMultiplier === 'function') {
                const block = await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({});
                return chain.fees.baseFeeMultiplier({
                    block,
                    client,
                    request: parameters,
                });
            }
            return chain?.fees?.baseFeeMultiplier ?? 1.2;
        })();
        if (feeMultiplier < 1)
            throw new fee_js_1.BaseFeeScalarError();
        const decimals = feeMultiplier.toString().split('.')[1]?.length ?? 0;
        const denominator = 10 ** decimals;
        const multiplyFee = (base) => (base * BigInt(Math.ceil(feeMultiplier * denominator))) /
            BigInt(denominator);
        if (transaction.maxFeePerGas && !parameters.maxFeePerGas)
            transaction.maxFeePerGas = multiplyFee(transaction.maxFeePerGas);
        if (transaction.gasPrice && !parameters.gasPrice)
            transaction.gasPrice = multiplyFee(transaction.gasPrice);
        return {
            raw: response.raw,
            transaction: {
                from: request.from,
                ...transaction,
            },
        };
    }
    catch (err) {
        throw (0, getTransactionError_js_1.getTransactionError)(err, {
            ...parameters,
            chain: client.chain,
        });
    }
}
//# sourceMappingURL=fillTransaction.js.map
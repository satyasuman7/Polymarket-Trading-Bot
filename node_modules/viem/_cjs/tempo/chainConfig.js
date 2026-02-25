"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfig = void 0;
const tempo_1 = require("ox/tempo");
const getCode_js_1 = require("../actions/public/getCode.js");
const verifyHash_js_1 = require("../actions/public/verifyHash.js");
const number_js_1 = require("../constants/number.js");
const defineChain_js_1 = require("../utils/chain/defineChain.js");
const transaction_js_1 = require("../utils/formatters/transaction.js");
const transactionReceipt_js_1 = require("../utils/formatters/transactionReceipt.js");
const transactionRequest_js_1 = require("../utils/formatters/transactionRequest.js");
const getAction_js_1 = require("../utils/getAction.js");
const Formatters = require("./Formatters.js");
const Concurrent = require("./internal/concurrent.js");
const Transaction = require("./Transaction.js");
const maxExpirySecs = 25;
exports.chainConfig = {
    blockTime: 1_000,
    extendSchema: (0, defineChain_js_1.extendSchema)(),
    formatters: {
        transaction: (0, transaction_js_1.defineTransaction)({
            exclude: ['aaAuthorizationList'],
            format: Formatters.formatTransaction,
        }),
        transactionReceipt: (0, transactionReceipt_js_1.defineTransactionReceipt)({
            format: Formatters.formatTransactionReceipt,
        }),
        transactionRequest: (0, transactionRequest_js_1.defineTransactionRequest)({
            format: Formatters.formatTransactionRequest,
        }),
    },
    prepareTransactionRequest: [
        async (r, { phase }) => {
            const request = r;
            if (phase === 'afterFillParameters') {
                if (request.feePayer &&
                    request.keyAuthorization?.signature.type === 'webAuthn')
                    request.gas = (request.gas ?? 0n) + 20000n;
                return request;
            }
            const useExpiringNonce = await (async () => {
                if (request.nonceKey === 'expiring')
                    return true;
                if (request.feePayer && typeof request.nonceKey === 'undefined')
                    return true;
                const address = request.account?.address;
                if (address && typeof request.nonceKey === 'undefined')
                    return await Concurrent.detect(address);
                return false;
            })();
            if (useExpiringNonce) {
                request.nonceKey = number_js_1.maxUint256;
                request.nonce = 0;
                if (typeof request.validBefore === 'undefined')
                    request.validBefore = Math.floor(Date.now() / 1000) + maxExpirySecs;
            }
            else if (typeof request.nonceKey !== 'undefined') {
                request.nonce = typeof request.nonce === 'number' ? request.nonce : 0;
            }
            if (!request.feeToken && request.chain?.feeToken)
                request.feeToken = request.chain.feeToken;
            return request;
        },
        { runAt: ['beforeFillTransaction', 'afterFillParameters'] },
    ],
    serializers: {
        transaction: ((transaction, signature) => Transaction.serialize(transaction, signature)),
    },
    async verifyHash(client, parameters) {
        const { address, hash, signature } = parameters;
        if (typeof signature === 'string' &&
            signature.endsWith(tempo_1.SignatureEnvelope.magicBytes.slice(2))) {
            const envelope = tempo_1.SignatureEnvelope.deserialize(signature);
            if (envelope.type !== 'keychain') {
                const code = await (0, getCode_js_1.getCode)(client, {
                    address,
                    blockNumber: parameters.blockNumber,
                    blockTag: parameters.blockTag,
                });
                if (!code ||
                    code === '0xef01007702c00000000000000000000000000000000000')
                    return tempo_1.SignatureEnvelope.verify(envelope, {
                        address,
                        payload: hash,
                    });
            }
        }
        return await (0, getAction_js_1.getAction)(client, verifyHash_js_1.verifyHash, 'verifyHash')({ ...parameters, chain: null });
    },
};
//# sourceMappingURL=chainConfig.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsFillTransaction = exports.eip1559NetworkCache = exports.defaultParameters = void 0;
exports.prepareTransactionRequest = prepareTransactionRequest;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const estimateFeesPerGas_js_1 = require("../../actions/public/estimateFeesPerGas.js");
const estimateGas_js_1 = require("../../actions/public/estimateGas.js");
const getBlock_js_1 = require("../../actions/public/getBlock.js");
const getTransactionCount_js_1 = require("../../actions/public/getTransactionCount.js");
const fee_js_1 = require("../../errors/fee.js");
const blobsToCommitments_js_1 = require("../../utils/blob/blobsToCommitments.js");
const blobsToProofs_js_1 = require("../../utils/blob/blobsToProofs.js");
const commitmentsToVersionedHashes_js_1 = require("../../utils/blob/commitmentsToVersionedHashes.js");
const toBlobSidecars_js_1 = require("../../utils/blob/toBlobSidecars.js");
const getAction_js_1 = require("../../utils/getAction.js");
const lru_js_1 = require("../../utils/lru.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const getTransactionType_js_1 = require("../../utils/transaction/getTransactionType.js");
const fillTransaction_js_1 = require("../public/fillTransaction.js");
const getChainId_js_1 = require("../public/getChainId.js");
exports.defaultParameters = [
    'blobVersionedHashes',
    'chainId',
    'fees',
    'gas',
    'nonce',
    'type',
];
exports.eip1559NetworkCache = new Map();
exports.supportsFillTransaction = new lru_js_1.LruMap(128);
async function prepareTransactionRequest(client, args) {
    let request = args;
    request.account ??= client.account;
    request.parameters ??= exports.defaultParameters;
    const { account: account_, chain = client.chain, nonceManager, parameters, } = request;
    const prepareTransactionRequest = (() => {
        if (typeof chain?.prepareTransactionRequest === 'function')
            return {
                fn: chain.prepareTransactionRequest,
                runAt: ['beforeFillTransaction'],
            };
        if (Array.isArray(chain?.prepareTransactionRequest))
            return {
                fn: chain.prepareTransactionRequest[0],
                runAt: chain.prepareTransactionRequest[1].runAt,
            };
        return undefined;
    })();
    let chainId;
    async function getChainId() {
        if (chainId)
            return chainId;
        if (typeof request.chainId !== 'undefined')
            return request.chainId;
        if (chain)
            return chain.id;
        const chainId_ = await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
        chainId = chainId_;
        return chainId;
    }
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : account_;
    let nonce = request.nonce;
    if (parameters.includes('nonce') &&
        typeof nonce === 'undefined' &&
        account &&
        nonceManager) {
        const chainId = await getChainId();
        nonce = await nonceManager.consume({
            address: account.address,
            chainId,
            client,
        });
    }
    if (prepareTransactionRequest?.fn &&
        prepareTransactionRequest.runAt?.includes('beforeFillTransaction')) {
        request = await prepareTransactionRequest.fn({ ...request, chain }, {
            phase: 'beforeFillTransaction',
        });
        nonce ??= request.nonce;
    }
    const attemptFill = (() => {
        if ((parameters.includes('blobVersionedHashes') ||
            parameters.includes('sidecars')) &&
            request.kzg &&
            request.blobs)
            return false;
        if (exports.supportsFillTransaction.get(client.uid) === false)
            return false;
        const shouldAttempt = ['fees', 'gas'].some((parameter) => parameters.includes(parameter));
        if (!shouldAttempt)
            return false;
        if (parameters.includes('chainId') && typeof request.chainId !== 'number')
            return true;
        if (parameters.includes('nonce') && typeof nonce !== 'number')
            return true;
        if (parameters.includes('fees') &&
            typeof request.gasPrice !== 'bigint' &&
            (typeof request.maxFeePerGas !== 'bigint' ||
                typeof request.maxPriorityFeePerGas !== 'bigint'))
            return true;
        if (parameters.includes('gas') && typeof request.gas !== 'bigint')
            return true;
        return false;
    })();
    const fillResult = attemptFill
        ? await (0, getAction_js_1.getAction)(client, fillTransaction_js_1.fillTransaction, 'fillTransaction')({ ...request, nonce })
            .then((result) => {
            const { chainId, from, gas, gasPrice, nonce, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, type, ...rest } = result.transaction;
            exports.supportsFillTransaction.set(client.uid, true);
            return {
                ...request,
                ...(from ? { from } : {}),
                ...(type ? { type } : {}),
                ...(typeof chainId !== 'undefined' ? { chainId } : {}),
                ...(typeof gas !== 'undefined' ? { gas } : {}),
                ...(typeof gasPrice !== 'undefined' ? { gasPrice } : {}),
                ...(typeof nonce !== 'undefined' ? { nonce } : {}),
                ...(typeof maxFeePerBlobGas !== 'undefined'
                    ? { maxFeePerBlobGas }
                    : {}),
                ...(typeof maxFeePerGas !== 'undefined' ? { maxFeePerGas } : {}),
                ...(typeof maxPriorityFeePerGas !== 'undefined'
                    ? { maxPriorityFeePerGas }
                    : {}),
                ...('nonceKey' in rest && typeof rest.nonceKey !== 'undefined'
                    ? { nonceKey: rest.nonceKey }
                    : {}),
            };
        })
            .catch((e) => {
            const error = e;
            if (error.name !== 'TransactionExecutionError')
                return request;
            const unsupported = error.walk?.((e) => {
                const error = e;
                return (error.name === 'MethodNotFoundRpcError' ||
                    error.name === 'MethodNotSupportedRpcError');
            });
            if (unsupported)
                exports.supportsFillTransaction.set(client.uid, false);
            return request;
        })
        : request;
    nonce ??= fillResult.nonce;
    request = {
        ...fillResult,
        ...(account ? { from: account?.address } : {}),
        ...(nonce ? { nonce } : {}),
    };
    const { blobs, gas, kzg, type } = request;
    if (prepareTransactionRequest?.fn &&
        prepareTransactionRequest.runAt?.includes('beforeFillParameters')) {
        request = await prepareTransactionRequest.fn({ ...request, chain }, {
            phase: 'beforeFillParameters',
        });
    }
    let block;
    async function getBlock() {
        if (block)
            return block;
        block = await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({ blockTag: 'latest' });
        return block;
    }
    if (parameters.includes('nonce') &&
        typeof nonce === 'undefined' &&
        account &&
        !nonceManager)
        request.nonce = await (0, getAction_js_1.getAction)(client, getTransactionCount_js_1.getTransactionCount, 'getTransactionCount')({
            address: account.address,
            blockTag: 'pending',
        });
    if ((parameters.includes('blobVersionedHashes') ||
        parameters.includes('sidecars')) &&
        blobs &&
        kzg) {
        const commitments = (0, blobsToCommitments_js_1.blobsToCommitments)({ blobs, kzg });
        if (parameters.includes('blobVersionedHashes')) {
            const versionedHashes = (0, commitmentsToVersionedHashes_js_1.commitmentsToVersionedHashes)({
                commitments,
                to: 'hex',
            });
            request.blobVersionedHashes = versionedHashes;
        }
        if (parameters.includes('sidecars')) {
            const proofs = (0, blobsToProofs_js_1.blobsToProofs)({ blobs, commitments, kzg });
            const sidecars = (0, toBlobSidecars_js_1.toBlobSidecars)({
                blobs,
                commitments,
                proofs,
                to: 'hex',
            });
            request.sidecars = sidecars;
        }
    }
    if (parameters.includes('chainId'))
        request.chainId = await getChainId();
    if ((parameters.includes('fees') || parameters.includes('type')) &&
        typeof type === 'undefined') {
        try {
            request.type = (0, getTransactionType_js_1.getTransactionType)(request);
        }
        catch {
            let isEip1559Network = exports.eip1559NetworkCache.get(client.uid);
            if (typeof isEip1559Network === 'undefined') {
                const block = await getBlock();
                isEip1559Network = typeof block?.baseFeePerGas === 'bigint';
                exports.eip1559NetworkCache.set(client.uid, isEip1559Network);
            }
            request.type = isEip1559Network ? 'eip1559' : 'legacy';
        }
    }
    if (parameters.includes('fees')) {
        if (request.type !== 'legacy' && request.type !== 'eip2930') {
            if (typeof request.maxFeePerGas === 'undefined' ||
                typeof request.maxPriorityFeePerGas === 'undefined') {
                const block = await getBlock();
                const { maxFeePerGas, maxPriorityFeePerGas } = await (0, estimateFeesPerGas_js_1.internal_estimateFeesPerGas)(client, {
                    block: block,
                    chain,
                    request: request,
                });
                if (typeof request.maxPriorityFeePerGas === 'undefined' &&
                    request.maxFeePerGas &&
                    request.maxFeePerGas < maxPriorityFeePerGas)
                    throw new fee_js_1.MaxFeePerGasTooLowError({
                        maxPriorityFeePerGas,
                    });
                request.maxPriorityFeePerGas = maxPriorityFeePerGas;
                request.maxFeePerGas = maxFeePerGas;
            }
        }
        else {
            if (typeof request.maxFeePerGas !== 'undefined' ||
                typeof request.maxPriorityFeePerGas !== 'undefined')
                throw new fee_js_1.Eip1559FeesNotSupportedError();
            if (typeof request.gasPrice === 'undefined') {
                const block = await getBlock();
                const { gasPrice: gasPrice_ } = await (0, estimateFeesPerGas_js_1.internal_estimateFeesPerGas)(client, {
                    block: block,
                    chain,
                    request: request,
                    type: 'legacy',
                });
                request.gasPrice = gasPrice_;
            }
        }
    }
    if (parameters.includes('gas') && typeof gas === 'undefined')
        request.gas = await (0, getAction_js_1.getAction)(client, estimateGas_js_1.estimateGas, 'estimateGas')({
            ...request,
            account,
            prepare: account?.type === 'local' ? [] : ['blobVersionedHashes'],
        });
    if (prepareTransactionRequest?.fn &&
        prepareTransactionRequest.runAt?.includes('afterFillParameters'))
        request = await prepareTransactionRequest.fn({ ...request, chain }, {
            phase: 'afterFillParameters',
        });
    (0, assertRequest_js_1.assertRequest)(request);
    delete request.parameters;
    return request;
}
//# sourceMappingURL=prepareTransactionRequest.js.map
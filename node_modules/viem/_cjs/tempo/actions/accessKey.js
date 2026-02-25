"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.authorizeSync = authorizeSync;
exports.revoke = revoke;
exports.revokeSync = revokeSync;
exports.updateLimit = updateLimit;
exports.updateLimitSync = updateLimitSync;
exports.getMetadata = getMetadata;
exports.getRemainingLimit = getRemainingLimit;
exports.signAuthorization = signAuthorization;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const sendTransaction_js_1 = require("../../actions/wallet/sendTransaction.js");
const sendTransactionSync_js_1 = require("../../actions/wallet/sendTransactionSync.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const Account_js_1 = require("../Account.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
const signatureTypes = {
    0: 'secp256k1',
    1: 'p256',
    2: 'webAuthn',
};
const spendPolicies = {
    true: 'limited',
    false: 'unlimited',
};
async function authorize(client, parameters) {
    return authorize.inner(sendTransaction_js_1.sendTransaction, client, parameters);
}
(function (authorize) {
    async function inner(action, client, parameters) {
        const { accessKey, expiry, limits, ...rest } = parameters;
        const account_ = rest.account ?? client.account;
        if (!account_)
            throw new Error('account is required.');
        const parsed = (0, parseAccount_js_1.parseAccount)(account_);
        const keyAuthorization = await (0, Account_js_1.signKeyAuthorization)(parsed, {
            key: accessKey,
            expiry,
            limits,
        });
        return (await action(client, {
            ...rest,
            keyAuthorization,
        }));
    }
    authorize.inner = inner;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'KeyAuthorized',
            strict: true,
        });
        if (!log)
            throw new Error('`KeyAuthorized` event not found.');
        return log;
    }
    authorize.extractEvent = extractEvent;
})(authorize || (exports.authorize = authorize = {}));
async function authorizeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await authorize.inner(sendTransactionSync_js_1.sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = authorize.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function revoke(client, parameters) {
    return revoke.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (revoke) {
    async function inner(action, client, parameters) {
        const { accessKey, ...rest } = parameters;
        const call = revoke.call({ accessKey });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    revoke.inner = inner;
    function call(args) {
        const { accessKey } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'revokeKey',
            args: [resolveAccessKey(accessKey)],
        });
    }
    revoke.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'KeyRevoked',
            strict: true,
        });
        if (!log)
            throw new Error('`KeyRevoked` event not found.');
        return log;
    }
    revoke.extractEvent = extractEvent;
})(revoke || (exports.revoke = revoke = {}));
async function revokeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await revoke.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = revoke.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function updateLimit(client, parameters) {
    return updateLimit.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (updateLimit) {
    async function inner(action, client, parameters) {
        const { accessKey, token, limit, ...rest } = parameters;
        const call = updateLimit.call({ accessKey, token, limit });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    updateLimit.inner = inner;
    function call(args) {
        const { accessKey, token, limit } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'updateSpendingLimit',
            args: [resolveAccessKey(accessKey), token, limit],
        });
    }
    updateLimit.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.accountKeychain,
            logs,
            eventName: 'SpendingLimitUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`SpendingLimitUpdated` event not found.');
        return log;
    }
    updateLimit.extractEvent = extractEvent;
})(updateLimit || (exports.updateLimit = updateLimit = {}));
async function updateLimitSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await updateLimit.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = updateLimit.extractEvent(receipt.logs);
    return {
        account: args.account,
        publicKey: args.publicKey,
        token: args.token,
        limit: args.newLimit,
        receipt,
    };
}
async function getMetadata(client, parameters) {
    const { account: account_ = client.account, accessKey, ...rest } = parameters;
    if (!account_)
        throw new Error('account is required.');
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    const result = await (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getMetadata.call({ account: account.address, accessKey }),
    });
    return {
        address: result.keyId,
        keyType: signatureTypes[result.signatureType] ??
            'secp256k1',
        expiry: result.expiry,
        spendPolicy: spendPolicies[`${result.enforceLimits}`],
        isRevoked: result.isRevoked,
    };
}
(function (getMetadata) {
    function call(args) {
        const { account, accessKey } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'getKey',
            args: [account, resolveAccessKey(accessKey)],
        });
    }
    getMetadata.call = call;
})(getMetadata || (exports.getMetadata = getMetadata = {}));
async function getRemainingLimit(client, parameters) {
    const { account: account_ = client.account, accessKey, token, ...rest } = parameters;
    if (!account_)
        throw new Error('account is required.');
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getRemainingLimit.call({ account: account.address, accessKey, token }),
    });
}
(function (getRemainingLimit) {
    function call(args) {
        const { account, accessKey, token } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.accountKeychain,
            abi: Abis.accountKeychain,
            functionName: 'getRemainingLimit',
            args: [account, resolveAccessKey(accessKey), token],
        });
    }
    getRemainingLimit.call = call;
})(getRemainingLimit || (exports.getRemainingLimit = getRemainingLimit = {}));
async function signAuthorization(account, parameters) {
    const { accessKey, ...rest } = parameters;
    return (0, Account_js_1.signKeyAuthorization)(account, { key: accessKey, ...rest });
}
function resolveAccessKey(accessKey) {
    if (typeof accessKey === 'string')
        return accessKey;
    return accessKey.accessKeyAddress;
}
//# sourceMappingURL=accessKey.js.map
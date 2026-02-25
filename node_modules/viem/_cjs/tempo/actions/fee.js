"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = getUserToken;
exports.setUserToken = setUserToken;
exports.setUserTokenSync = setUserTokenSync;
exports.watchSetUserToken = watchSetUserToken;
exports.getValidatorToken = getValidatorToken;
exports.setValidatorToken = setValidatorToken;
exports.setValidatorTokenSync = setValidatorTokenSync;
exports.watchSetValidatorToken = watchSetValidatorToken;
const tempo_1 = require("ox/tempo");
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const address_js_1 = require("../../constants/address.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
async function getUserToken(client, ...parameters) {
    const { account: account_ = client.account, ...rest } = parameters[0] ?? {};
    if (!account_)
        throw new Error('account is required.');
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    const address = await (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getUserToken.call({ account: account.address }),
    });
    if (address === address_js_1.zeroAddress)
        return null;
    return {
        address,
        id: tempo_1.TokenId.fromAddress(address),
    };
}
(function (getUserToken) {
    function call(args) {
        const { account } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            args: [account],
            functionName: 'userTokens',
        });
    }
    getUserToken.call = call;
})(getUserToken || (exports.getUserToken = getUserToken = {}));
async function setUserToken(client, parameters) {
    return setUserToken.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (setUserToken) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = setUserToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setUserToken.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            functionName: 'setUserToken',
            args: [tempo_1.TokenId.toAddress(token)],
        });
    }
    setUserToken.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.feeManager,
            logs,
            eventName: 'UserTokenSet',
            strict: true,
        });
        if (!log)
            throw new Error('`UserTokenSet` event not found.');
        return log;
    }
    setUserToken.extractEvent = extractEvent;
})(setUserToken || (exports.setUserToken = setUserToken = {}));
async function setUserTokenSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setUserToken.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setUserToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
function watchSetUserToken(client, parameters) {
    const { onUserTokenSet, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeManager,
        eventName: 'UserTokenSet',
        onLogs: (logs) => {
            for (const log of logs)
                onUserTokenSet(log.args, log);
        },
        strict: true,
    });
}
async function getValidatorToken(client, parameters) {
    const { validator, ...rest } = parameters;
    const address = await (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getValidatorToken.call({ validator }),
    });
    if (address === address_js_1.zeroAddress)
        return null;
    return {
        address,
        id: tempo_1.TokenId.fromAddress(address),
    };
}
(function (getValidatorToken) {
    function call(args) {
        const { validator } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            args: [validator],
            functionName: 'validatorTokens',
        });
    }
    getValidatorToken.call = call;
})(getValidatorToken || (exports.getValidatorToken = getValidatorToken = {}));
async function setValidatorToken(client, parameters) {
    return setValidatorToken.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (setValidatorToken) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = setValidatorToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setValidatorToken.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.feeManager,
            abi: Abis.feeManager,
            functionName: 'setValidatorToken',
            args: [tempo_1.TokenId.toAddress(token)],
        });
    }
    setValidatorToken.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.feeManager,
            logs,
            eventName: 'ValidatorTokenSet',
            strict: true,
        });
        if (!log)
            throw new Error('`ValidatorTokenSet` event not found.');
        return log;
    }
    setValidatorToken.extractEvent = extractEvent;
})(setValidatorToken || (exports.setValidatorToken = setValidatorToken = {}));
async function setValidatorTokenSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setValidatorToken.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setValidatorToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
function watchSetValidatorToken(client, parameters) {
    const { onValidatorTokenSet, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.feeManager,
        abi: Abis.feeManager,
        eventName: 'ValidatorTokenSet',
        onLogs: (logs) => {
            for (const log of logs)
                onValidatorTokenSet(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=fee.js.map
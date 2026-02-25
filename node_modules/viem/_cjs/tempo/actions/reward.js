"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claim = claim;
exports.claimSync = claimSync;
exports.distribute = distribute;
exports.distributeSync = distributeSync;
exports.getGlobalRewardPerToken = getGlobalRewardPerToken;
exports.getPendingRewards = getPendingRewards;
exports.getUserRewardInfo = getUserRewardInfo;
exports.setRecipient = setRecipient;
exports.setRecipientSync = setRecipientSync;
exports.watchRewardDistributed = watchRewardDistributed;
exports.watchRewardRecipientSet = watchRewardRecipientSet;
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const utils_js_1 = require("../internal/utils.js");
async function claim(client, parameters) {
    return claim.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (claim) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = claim.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    claim.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [],
            functionName: 'claimRewards',
        });
    }
    claim.call = call;
})(claim || (exports.claim = claim = {}));
async function claimSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await claim.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return {
        receipt,
    };
}
async function distribute(client, parameters) {
    return distribute.inner(writeContract_js_1.writeContract, client, parameters);
}
async function distributeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await distribute.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = distribute.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
(function (distribute) {
    async function inner(action, client, parameters) {
        const { amount, token, ...rest } = parameters;
        const call = distribute.call({ amount, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    distribute.inner = inner;
    function call(args) {
        const { amount, token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [amount],
            functionName: 'distributeReward',
        });
    }
    distribute.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RewardDistributed',
            strict: true,
        });
        if (!log)
            throw new Error('`RewardDistributed` event not found.');
        return log;
    }
    distribute.extractEvent = extractEvent;
})(distribute || (exports.distribute = distribute = {}));
async function getGlobalRewardPerToken(client, parameters) {
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...getGlobalRewardPerToken.call(parameters),
    });
}
(function (getGlobalRewardPerToken) {
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [],
            functionName: 'globalRewardPerToken',
        });
    }
    getGlobalRewardPerToken.call = call;
})(getGlobalRewardPerToken || (exports.getGlobalRewardPerToken = getGlobalRewardPerToken = {}));
async function getPendingRewards(client, parameters) {
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...getPendingRewards.call(parameters),
    });
}
(function (getPendingRewards) {
    function call(args) {
        const { account, token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [account],
            functionName: 'getPendingRewards',
        });
    }
    getPendingRewards.call = call;
})(getPendingRewards || (exports.getPendingRewards = getPendingRewards = {}));
async function getUserRewardInfo(client, parameters) {
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...getUserRewardInfo.call(parameters),
    });
}
(function (getUserRewardInfo) {
    function call(args) {
        const { account, token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [account],
            functionName: 'userRewardInfo',
        });
    }
    getUserRewardInfo.call = call;
})(getUserRewardInfo || (exports.getUserRewardInfo = getUserRewardInfo = {}));
async function setRecipient(client, parameters) {
    return setRecipient.inner(writeContract_js_1.writeContract, client, parameters);
}
async function setRecipientSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setRecipient.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setRecipient.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
(function (setRecipient) {
    async function inner(action, client, parameters) {
        const { recipient, token, ...rest } = parameters;
        const call = setRecipient.call({ recipient, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setRecipient.inner = inner;
    function call(args) {
        const { recipient, token } = args;
        return (0, utils_js_1.defineCall)({
            address: token,
            abi: Abis.tip20,
            args: [recipient],
            functionName: 'setRewardRecipient',
        });
    }
    setRecipient.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RewardRecipientSet',
            strict: true,
        });
        if (!log)
            throw new Error('`RewardRecipientSet` event not found.');
        return log;
    }
    setRecipient.extractEvent = extractEvent;
})(setRecipient || (exports.setRecipient = setRecipient = {}));
function watchRewardDistributed(client, parameters) {
    const { onRewardDistributed, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: token,
        abi: Abis.tip20,
        eventName: 'RewardDistributed',
        onLogs: (logs) => {
            for (const log of logs)
                onRewardDistributed(log.args, log);
        },
        strict: true,
    });
}
function watchRewardRecipientSet(client, parameters) {
    const { onRewardRecipientSet, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: token,
        abi: Abis.tip20,
        eventName: 'RewardRecipientSet',
        onLogs: (logs) => {
            for (const log of logs)
                onRewardRecipientSet(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=reward.js.map
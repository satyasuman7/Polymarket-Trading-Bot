"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = buy;
exports.buySync = buySync;
exports.cancel = cancel;
exports.cancelSync = cancelSync;
exports.cancelStale = cancelStale;
exports.cancelStaleSync = cancelStaleSync;
exports.createPair = createPair;
exports.createPairSync = createPairSync;
exports.getBalance = getBalance;
exports.getBuyQuote = getBuyQuote;
exports.getOrder = getOrder;
exports.getOrderbook = getOrderbook;
exports.getTickLevel = getTickLevel;
exports.getSellQuote = getSellQuote;
exports.place = place;
exports.placeFlip = placeFlip;
exports.placeFlipSync = placeFlipSync;
exports.placeSync = placeSync;
exports.sell = sell;
exports.sellSync = sellSync;
exports.watchFlipOrderPlaced = watchFlipOrderPlaced;
exports.watchOrderCancelled = watchOrderCancelled;
exports.watchOrderFilled = watchOrderFilled;
exports.watchOrderPlaced = watchOrderPlaced;
exports.withdraw = withdraw;
exports.withdrawSync = withdrawSync;
const Hash = require("ox/Hash");
const Hex = require("ox/Hex");
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
async function buy(client, parameters) {
    return buy.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (buy) {
    async function inner(action, client, parameters) {
        const { tokenIn, tokenOut, amountOut, maxAmountIn, ...rest } = parameters;
        const call = buy.call({ tokenIn, tokenOut, amountOut, maxAmountIn });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    buy.inner = inner;
    function call(args) {
        const { tokenIn, tokenOut, amountOut, maxAmountIn } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'swapExactAmountOut',
            args: [tokenIn, tokenOut, amountOut, maxAmountIn],
        });
    }
    buy.call = call;
})(buy || (exports.buy = buy = {}));
async function buySync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await buy.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
async function cancel(client, parameters) {
    return cancel.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (cancel) {
    async function inner(action, client, parameters) {
        const { orderId, ...rest } = parameters;
        const call = cancel.call({ orderId });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    cancel.inner = inner;
    function call(args) {
        const { orderId } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'cancel',
            args: [orderId],
        });
    }
    cancel.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderCancelled',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderCancelled` event not found.');
        return log;
    }
    cancel.extractEvent = extractEvent;
})(cancel || (exports.cancel = cancel = {}));
async function cancelSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await cancel.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = cancel.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function cancelStale(client, parameters) {
    return cancelStale.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (cancelStale) {
    async function inner(action, client, parameters) {
        const { orderId, ...rest } = parameters;
        const call = cancelStale.call({ orderId });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    cancelStale.inner = inner;
    function call(args) {
        const { orderId } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'cancelStaleOrder',
            args: [orderId],
        });
    }
    cancelStale.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderCancelled',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderCancelled` event not found.');
        return log;
    }
    cancelStale.extractEvent = extractEvent;
})(cancelStale || (exports.cancelStale = cancelStale = {}));
async function cancelStaleSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await cancelStale.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = cancelStale.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function createPair(client, parameters) {
    return createPair.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (createPair) {
    async function inner(action, client, parameters) {
        const { base, ...rest } = parameters;
        const call = createPair.call({ base });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    createPair.inner = inner;
    function call(args) {
        const { base } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'createPair',
            args: [base],
        });
    }
    createPair.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'PairCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`PairCreated` event not found.');
        return log;
    }
    createPair.extractEvent = extractEvent;
})(createPair || (exports.createPair = createPair = {}));
async function createPairSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await createPair.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = createPair.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function getBalance(client, parameters) {
    const { account: acc = client.account, token, ...rest } = parameters;
    const address = acc ? (0, parseAccount_js_1.parseAccount)(acc).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getBalance.call({ account: address, token }),
    });
}
(function (getBalance) {
    function call(args) {
        const { account, token } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [account, token],
            functionName: 'balanceOf',
        });
    }
    getBalance.call = call;
})(getBalance || (exports.getBalance = getBalance = {}));
async function getBuyQuote(client, parameters) {
    const { tokenIn, tokenOut, amountOut, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getBuyQuote.call({ tokenIn, tokenOut, amountOut }),
    });
}
(function (getBuyQuote) {
    function call(args) {
        const { tokenIn, tokenOut, amountOut } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [tokenIn, tokenOut, amountOut],
            functionName: 'quoteSwapExactAmountOut',
        });
    }
    getBuyQuote.call = call;
})(getBuyQuote || (exports.getBuyQuote = getBuyQuote = {}));
async function getOrder(client, parameters) {
    const { orderId, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getOrder.call({ orderId }),
    });
}
(function (getOrder) {
    function call(args) {
        const { orderId } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [orderId],
            functionName: 'getOrder',
        });
    }
    getOrder.call = call;
})(getOrder || (exports.getOrder = getOrder = {}));
async function getOrderbook(client, parameters) {
    const { base, quote, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getOrderbook.call({ base, quote }),
    });
}
(function (getOrderbook) {
    function call(args) {
        const { base, quote } = args;
        const pairKey = getPairKey(base, quote);
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [pairKey],
            functionName: 'books',
        });
    }
    getOrderbook.call = call;
})(getOrderbook || (exports.getOrderbook = getOrderbook = {}));
async function getTickLevel(client, parameters) {
    const { base, tick, isBid, ...rest } = parameters;
    const [head, tail, totalLiquidity] = await (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getTickLevel.call({ base, tick, isBid }),
    });
    return { head, tail, totalLiquidity };
}
(function (getTickLevel) {
    function call(args) {
        const { base, tick, isBid } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [base, tick, isBid],
            functionName: 'getTickLevel',
        });
    }
    getTickLevel.call = call;
})(getTickLevel || (exports.getTickLevel = getTickLevel = {}));
async function getSellQuote(client, parameters) {
    const { tokenIn, tokenOut, amountIn, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getSellQuote.call({ tokenIn, tokenOut, amountIn }),
    });
}
(function (getSellQuote) {
    function call(args) {
        const { tokenIn, tokenOut, amountIn } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            args: [tokenIn, tokenOut, amountIn],
            functionName: 'quoteSwapExactAmountIn',
        });
    }
    getSellQuote.call = call;
})(getSellQuote || (exports.getSellQuote = getSellQuote = {}));
async function place(client, parameters) {
    return place.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (place) {
    async function inner(action, client, parameters) {
        const { amount, token, type, tick, ...rest } = parameters;
        const call = place.call({ amount, token, type, tick });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    place.inner = inner;
    function call(args) {
        const { token, amount, type, tick } = args;
        const isBid = type === 'buy';
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'place',
            args: [token, amount, isBid, tick],
        });
    }
    place.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderPlaced',
            strict: true,
        });
        if (!log)
            throw new Error('`OrderPlaced` event not found.');
        return log;
    }
    place.extractEvent = extractEvent;
})(place || (exports.place = place = {}));
async function placeFlip(client, parameters) {
    return placeFlip.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (placeFlip) {
    async function inner(action, client, parameters) {
        const { amount, flipTick, tick, token, type, ...rest } = parameters;
        const call = placeFlip.call({ amount, flipTick, tick, token, type });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    placeFlip.inner = inner;
    function call(args) {
        const { token, amount, type, tick, flipTick } = args;
        const isBid = type === 'buy';
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'placeFlip',
            args: [token, amount, isBid, tick, flipTick],
        });
    }
    placeFlip.call = call;
    function extractEvent(logs) {
        const parsedLogs = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.stablecoinDex,
            logs,
            eventName: 'OrderPlaced',
            strict: true,
        });
        const log = parsedLogs.find((l) => l.args.isFlipOrder);
        if (!log)
            throw new Error('`OrderPlaced` event (flip order) not found.');
        return log;
    }
    placeFlip.extractEvent = extractEvent;
})(placeFlip || (exports.placeFlip = placeFlip = {}));
async function placeFlipSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await placeFlip.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = placeFlip.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function placeSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await place.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = place.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function sell(client, parameters) {
    return sell.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (sell) {
    async function inner(action, client, parameters) {
        const { tokenIn, tokenOut, amountIn, minAmountOut, ...rest } = parameters;
        const call = sell.call({ tokenIn, tokenOut, amountIn, minAmountOut });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    sell.inner = inner;
    function call(args) {
        const { tokenIn, tokenOut, amountIn, minAmountOut } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'swapExactAmountIn',
            args: [tokenIn, tokenOut, amountIn, minAmountOut],
        });
    }
    sell.call = call;
})(sell || (exports.sell = sell = {}));
async function sellSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await sell.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
function watchFlipOrderPlaced(client, parameters) {
    const { onFlipOrderPlaced, maker, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderPlaced',
        args: {
            ...(maker !== undefined && { maker }),
            ...(token !== undefined && { token }),
        },
        onLogs: (logs) => {
            for (const log of logs) {
                if (log.args.isFlipOrder)
                    onFlipOrderPlaced(log.args, log);
            }
        },
        strict: true,
    });
}
function watchOrderCancelled(client, parameters) {
    const { onOrderCancelled, orderId, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderCancelled',
        args: orderId !== undefined ? { orderId } : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onOrderCancelled(log.args, log);
        },
        strict: true,
    });
}
function watchOrderFilled(client, parameters) {
    const { onOrderFilled, maker, taker, orderId, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderFilled',
        args: {
            ...(orderId !== undefined && { orderId }),
            ...(maker !== undefined && { maker }),
            ...(taker !== undefined && { taker }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onOrderFilled(log.args, log);
        },
        strict: true,
    });
}
function watchOrderPlaced(client, parameters) {
    const { onOrderPlaced, maker, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.stablecoinDex,
        abi: Abis.stablecoinDex,
        eventName: 'OrderPlaced',
        args: {
            ...(maker !== undefined && { maker }),
            ...(token !== undefined && { token }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onOrderPlaced(log.args, log);
        },
        strict: true,
    });
}
async function withdraw(client, parameters) {
    return withdraw.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (withdraw) {
    async function inner(action, client, parameters) {
        const { token, amount, ...rest } = parameters;
        const call = withdraw.call({ token, amount });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    withdraw.inner = inner;
    function call(args) {
        const { token, amount } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.stablecoinDex,
            abi: Abis.stablecoinDex,
            functionName: 'withdraw',
            args: [token, amount],
        });
    }
    withdraw.call = call;
})(withdraw || (exports.withdraw = withdraw = {}));
async function withdrawSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await withdraw.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    return { receipt };
}
function getPairKey(base, quote) {
    return Hash.keccak256(Hex.concat(base, quote));
}
//# sourceMappingURL=dex.js.map
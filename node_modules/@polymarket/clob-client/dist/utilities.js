import { Side as UtilsSide } from "@polymarket/order-utils";
import { OrderType, Side } from "./types.js";
export function orderToJson(order, owner, orderType, deferExec = false, postOnly) {
    if (postOnly === true && orderType !== OrderType.GTC && orderType !== OrderType.GTD) {
        throw new Error("postOnly is only supported for GTC and GTD orders");
    }
    let side = Side.BUY;
    if (order.side == UtilsSide.BUY) {
        side = Side.BUY;
    }
    else {
        side = Side.SELL;
    }
    return {
        deferExec,
        order: {
            salt: parseInt(order.salt, 10),
            maker: order.maker,
            signer: order.signer,
            taker: order.taker,
            tokenId: order.tokenId,
            makerAmount: order.makerAmount,
            takerAmount: order.takerAmount,
            side,
            expiration: order.expiration,
            nonce: order.nonce,
            feeRateBps: order.feeRateBps,
            signatureType: order.signatureType,
            signature: order.signature,
        },
        owner,
        orderType,
        ...(typeof postOnly === "boolean" ? { postOnly } : {}),
    };
}
export const roundNormal = (num, decimals) => {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
};
export const roundDown = (num, decimals) => {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.floor(num * 10 ** decimals) / 10 ** decimals;
};
export const roundUp = (num, decimals) => {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.ceil(num * 10 ** decimals) / 10 ** decimals;
};
export const decimalPlaces = (num) => {
    if (Number.isInteger(num)) {
        return 0;
    }
    const arr = num.toString().split(".");
    if (arr.length <= 1) {
        return 0;
    }
    return arr[1].length;
};
/**
 * Converts ArrayBuffer to hex string
 */
function arrayBufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
/**
 * Calculates the hash for the given orderbook
 * @param orderbook
 * @returns
 */
export const generateOrderBookSummaryHash = async (orderbook) => {
    orderbook.hash = "";
    const message = JSON.stringify(orderbook);
    const messageBuffer = new TextEncoder().encode(message);
    const hashBuffer = await globalThis.crypto.subtle.digest("SHA-1", messageBuffer);
    const hash = arrayBufferToHex(hashBuffer);
    orderbook.hash = hash;
    return hash;
};
export const isTickSizeSmaller = (a, b) => {
    return parseFloat(a) < parseFloat(b);
};
export const priceValid = (price, tickSize) => {
    return price >= parseFloat(tickSize) && price <= 1 - parseFloat(tickSize);
};
//# sourceMappingURL=utilities.js.map
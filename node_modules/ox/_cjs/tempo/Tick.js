"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceOutOfBoundsError = exports.InvalidPriceFormatError = exports.TickOutOfBoundsError = exports.priceScale = exports.maxTick = exports.minTick = void 0;
exports.toPrice = toPrice;
exports.fromPrice = fromPrice;
const Errors = require("../core/Errors.js");
exports.minTick = -2000;
exports.maxTick = 2000;
exports.priceScale = 100_000;
function toPrice(tick) {
    if (tick < exports.minTick || tick > exports.maxTick) {
        throw new TickOutOfBoundsError({ tick });
    }
    const price = exports.priceScale + tick;
    const whole = Math.floor(price / exports.priceScale);
    let decimal = (price % exports.priceScale).toString().padStart(5, '0');
    decimal = decimal.replace(/0+$/, '');
    if (decimal.length === 0)
        return whole.toString();
    return `${whole}.${decimal}`;
}
function fromPrice(price) {
    const priceStr = price.trim();
    if (!/^-?\d+(\.\d+)?$/.test(priceStr))
        throw new InvalidPriceFormatError({ price });
    const [w, d = '0'] = priceStr.split('.');
    const whole = BigInt(w);
    const decimal = BigInt(d.padEnd(5, '0').slice(0, 5));
    const priceInt = whole * BigInt(exports.priceScale) + decimal;
    const tick = Number(priceInt - BigInt(exports.priceScale));
    if (tick < exports.minTick || tick > exports.maxTick)
        throw new PriceOutOfBoundsError({ price, tick });
    return tick;
}
class TickOutOfBoundsError extends Errors.BaseError {
    constructor(options) {
        super(`Tick ${options.tick} is out of bounds.`, {
            metaMessages: [`Tick must be between ${exports.minTick} and ${exports.maxTick}.`],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Tick.TickOutOfBoundsError'
        });
    }
}
exports.TickOutOfBoundsError = TickOutOfBoundsError;
class InvalidPriceFormatError extends Errors.BaseError {
    constructor(options) {
        super(`Invalid price format: "${options.price}".`, {
            metaMessages: ['Price must be a decimal number string (e.g., "1.001").'],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Tick.InvalidPriceFormatError'
        });
    }
}
exports.InvalidPriceFormatError = InvalidPriceFormatError;
class PriceOutOfBoundsError extends Errors.BaseError {
    constructor(options) {
        super(`Price "${options.price}" results in tick ${options.tick} which is out of bounds.`, {
            metaMessages: [`Tick must be between ${exports.minTick} and ${exports.maxTick}.`],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Tick.PriceOutOfBoundsError'
        });
    }
}
exports.PriceOutOfBoundsError = PriceOutOfBoundsError;
//# sourceMappingURL=Tick.js.map
import * as Errors from '../core/Errors.js';
/**
 * Minimum allowed tick value (-2% from peg).
 *
 * [Stablecoin DEX Pricing](https://docs.tempo.xyz/protocol/exchange/spec#key-concepts)
 */
export declare const minTick = -2000;
/**
 * Maximum allowed tick value (+2% from peg).
 *
 * [Stablecoin DEX Pricing](https://docs.tempo.xyz/protocol/exchange/spec#key-concepts)
 */
export declare const maxTick = 2000;
/**
 * Price scaling factor (5 decimal places for 0.1 bps precision).
 *
 * The DEX uses a tick-based pricing system where `price = PRICE_SCALE + tick`.
 * Orders must be placed at ticks divisible by `TICK_SPACING = 10` (1 bp grid).
 *
 * [Stablecoin DEX Pricing](https://docs.tempo.xyz/protocol/exchange/spec#key-concepts)
 */
export declare const priceScale = 100000;
/**
 * Tick type.
 */
export type Tick = number;
/**
 * Converts a tick to a price string.
 *
 * [Stablecoin DEX Pricing](https://docs.tempo.xyz/protocol/exchange/spec#key-concepts)
 *
 * @example
 * ```ts
 * import { Tick } from 'ox/tempo'
 *
 * // Tick 0 = price of 1.0
 * const price1 = Tick.toPrice(0) // "1"
 *
 * // Tick 100 = price of 1.001 (0.1% higher)
 * const price2 = Tick.toPrice(100) // "1.001"
 *
 * // Tick -100 = price of 0.999 (0.1% lower)
 * const price3 = Tick.toPrice(-100) // "0.999"
 * ```
 *
 * @param tick - The tick value (range: -2000 to +2000).
 * @returns The price as a string with exact decimal representation.
 * @throws `TickOutOfBoundsError` If tick is out of bounds.
 */
export declare function toPrice(tick: toPrice.Tick): toPrice.ReturnType;
export declare namespace toPrice {
    type Tick = number;
    type ReturnType = string;
}
/**
 * Converts a price string to a tick.
 *
 * [Stablecoin DEX Pricing](https://docs.tempo.xyz/protocol/exchange/spec#key-concepts)
 *
 * @example
 * ```ts
 * import { Tick } from 'ox/tempo'
 *
 * // Price of 1.0 = tick 0
 * const tick1 = Tick.fromPrice('1.0') // 0
 * const tick2 = Tick.fromPrice('1.00000') // 0
 *
 * // Price of 1.001 = tick 100
 * const tick3 = Tick.fromPrice('1.001') // 100
 *
 * // Price of 0.999 = tick -100
 * const tick4 = Tick.fromPrice('0.999') // -100
 * ```
 *
 * @param price - The price as a string (e.g., "1.001", "0.999").
 * @returns The tick value.
 */
export declare function fromPrice(price: fromPrice.Price): fromPrice.ReturnType;
export declare namespace fromPrice {
    type Price = string;
    type ReturnType = number;
}
/**
 * Error thrown when a tick value is out of the allowed bounds.
 */
export declare class TickOutOfBoundsError extends Errors.BaseError {
    readonly name = "Tick.TickOutOfBoundsError";
    constructor(options: TickOutOfBoundsError.Options);
}
export declare namespace TickOutOfBoundsError {
    type Options = {
        tick: number;
    };
}
/**
 * Error thrown when a price string has an invalid format.
 */
export declare class InvalidPriceFormatError extends Errors.BaseError {
    readonly name = "Tick.InvalidPriceFormatError";
    constructor(options: InvalidPriceFormatError.Options);
}
export declare namespace InvalidPriceFormatError {
    type Options = {
        price: string;
    };
}
/**
 * Error thrown when a price string results in an out-of-bounds tick.
 */
export declare class PriceOutOfBoundsError extends Errors.BaseError {
    readonly name = "Tick.PriceOutOfBoundsError";
    constructor(options: PriceOutOfBoundsError.Options);
}
export declare namespace PriceOutOfBoundsError {
    type Options = {
        price: string;
        tick: number;
    };
}
//# sourceMappingURL=Tick.d.ts.map
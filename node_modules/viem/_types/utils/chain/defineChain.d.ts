import type { Chain, ChainFormatters } from '../../types/chain.js';
import type { Assign, Prettify } from '../../types/utils.js';
export type DefineChainReturnType<chain extends Chain = Chain> = Prettify<chain & (chain['extendSchema'] extends Record<string, unknown> ? {
    extend: <const extended extends chain['extendSchema']>(extended: extended) => Assign<chain, extended>;
} : {})>;
export declare function defineChain<formatters extends ChainFormatters, const chain extends Chain<formatters>>(chain: chain): DefineChainReturnType<Assign<Chain<undefined>, chain>>;
export declare function extendSchema<schema extends Record<string, unknown>>(): schema;
//# sourceMappingURL=defineChain.d.ts.map
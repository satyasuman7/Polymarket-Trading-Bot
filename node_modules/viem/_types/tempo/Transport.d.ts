import type { LocalAccount } from '../accounts/types.js';
import { type Transport } from '../clients/transports/createTransport.js';
export type FeePayer = Transport<typeof withFeePayer.type>;
/**
 * Creates a fee payer transport that routes requests between
 * the default transport or the fee payer transport.
 *
 * The policy parameter controls how the fee payer handles transactions:
 * - `'sign-only'`: Fee payer co-signs the transaction and returns it to the client transport, which then broadcasts it via the default transport
 * - `'sign-and-broadcast'`: Fee payer co-signs and broadcasts the transaction directly
 *
 * @param defaultTransport - The default transport to use.
 * @param feePayerTransport - The fee payer transport to use.
 * @param parameters - Configuration parameters.
 * @returns A relay transport.
 */
export declare function withFeePayer(defaultTransport: Transport, relayTransport: Transport, parameters?: withFeePayer.Parameters): withFeePayer.ReturnValue;
export declare namespace withFeePayer {
    const type = "feePayer";
    type Parameters = {
        /** Policy for how the fee payer should handle transactions. Defaults to `'sign-only'`. */
        policy?: 'sign-only' | 'sign-and-broadcast' | undefined;
    };
    type ReturnValue = FeePayer;
}
/**
 * Creates a transport that instruments a compatibility layer for
 * `wallet_` RPC actions (`sendCalls`, `getCallsStatus`, etc).
 *
 * @param transport - Transport to wrap.
 * @returns Transport.
 */
export declare function walletNamespaceCompat(transport: Transport, options: walletNamespaceCompat.Parameters): Transport;
export declare namespace walletNamespaceCompat {
    type Parameters = {
        account: LocalAccount;
    };
}
//# sourceMappingURL=Transport.d.ts.map
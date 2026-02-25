import { SignatureType } from "@polymarket/order-utils";
import { createMarketOrder, createOrder } from "./helpers.js";
export class OrderBuilder {
    signer;
    chainId;
    // Signature type used sign orders, defaults to EOA type
    signatureType;
    // Address which holds funds to be used.
    // Used for Polymarket proxy wallets and other smart contract wallets
    // If not provided, funderAddress is the signer address
    funderAddress;
    /**
     * Optional function to dynamically resolve the signer.
     * If provided, this function will be called to obtain a fresh signer instance
     * (e.g., for smart contract wallets or when the signer may change).
     * Should return a Wallet or JsonRpcSigner, or a Promise resolving to one.
     * If not provided, the static `signer` property is used.
     */
    getSigner;
    constructor(signer, chainId, signatureType, funderAddress, getSigner) {
        this.signer = signer;
        this.chainId = chainId;
        this.signatureType = signatureType === undefined ? SignatureType.EOA : signatureType;
        this.funderAddress = funderAddress;
        this.getSigner = getSigner;
    }
    /**
     * Generate and sign a order
     */
    async buildOrder(userOrder, options) {
        const signer = await this.resolveSigner();
        return createOrder(signer, this.chainId, this.signatureType, this.funderAddress, userOrder, options);
    }
    /**
     * Generate and sign a market order
     */
    async buildMarketOrder(userMarketOrder, options) {
        const signer = await this.resolveSigner();
        return createMarketOrder(signer, this.chainId, this.signatureType, this.funderAddress, userMarketOrder, options);
    }
    /** Unified getter: use fresh signer if available */
    async resolveSigner() {
        if (this.getSigner) {
            const s = await this.getSigner();
            if (!s)
                throw new Error("getSigner() function returned undefined or null");
            return s;
        }
        return this.signer;
    }
}
//# sourceMappingURL=builder.js.map
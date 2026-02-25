import { EIP712_DOMAIN, ORDER_STRUCTURE, PROTOCOL_NAME, PROTOCOL_VERSION, } from "./exchange.order.const.js";
import { hashTypedData } from 'viem';
import { SignatureType } from "./model/signature-types.model.js";
import { generateOrderSalt } from "./utils.js";
export class ExchangeOrderBuilder {
    contractAddress;
    chainId;
    signer;
    generateSalt;
    constructor(contractAddress, chainId, signer, generateSalt = generateOrderSalt) {
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.signer = signer;
        this.generateSalt = generateSalt;
    }
    /**
     * build an order object including the signature.
     * @param orderData
     * @returns a SignedOrder object (order + signature)
     */
    async buildSignedOrder(orderData) {
        const order = await this.buildOrder(orderData);
        const orderTypedData = this.buildOrderTypedData(order);
        const orderSignature = await this.buildOrderSignature(orderTypedData);
        return {
            ...order,
            signature: orderSignature,
        };
    }
    /**
     * Creates an Order object from order data.
     * @param OrderData
     * @returns a Order object (not signed)
     */
    async buildOrder({ maker, taker, tokenId, makerAmount, takerAmount, side, feeRateBps, nonce, signer, expiration, signatureType, }) {
        if (typeof signer == 'undefined' || !signer) {
            signer = maker;
        }
        const signerAddress = await this.signer.getAddress();
        if (signer !== signerAddress) {
            throw new Error('signer does not match');
        }
        if (typeof expiration == 'undefined' || !expiration) {
            expiration = '0';
        }
        if (typeof signatureType == 'undefined' || !signatureType) {
            // Default to EOA 712 sig type
            signatureType = SignatureType.EOA;
        }
        return {
            salt: this.generateSalt(),
            maker,
            signer,
            taker,
            tokenId,
            makerAmount,
            takerAmount,
            expiration,
            nonce,
            feeRateBps,
            side,
            signatureType,
        };
    }
    /**
     * Parses an Order object to EIP712 typed data
     * @param order
     * @returns a EIP712TypedData object
     */
    buildOrderTypedData(order) {
        return {
            primaryType: 'Order',
            types: {
                EIP712Domain: EIP712_DOMAIN,
                Order: ORDER_STRUCTURE,
            },
            domain: {
                name: PROTOCOL_NAME,
                version: PROTOCOL_VERSION,
                chainId: this.chainId,
                verifyingContract: this.contractAddress,
            },
            message: {
                salt: order.salt,
                maker: order.maker,
                signer: order.signer,
                taker: order.taker,
                tokenId: order.tokenId,
                makerAmount: order.makerAmount,
                takerAmount: order.takerAmount,
                expiration: order.expiration,
                nonce: order.nonce,
                feeRateBps: order.feeRateBps,
                side: order.side,
                signatureType: order.signatureType,
            },
        };
    }
    /**
     * Generates order's signature from a EIP712TypedData object + the signer address
     * @param typedData
     * @returns a OrderSignature that is an string
     */
    buildOrderSignature(typedData) {
        delete typedData.types.EIP712Domain;
        return this.signer._signTypedData(typedData.domain, typedData.types, typedData.message);
    }
    /**
     * Generates the hash of the order from a EIP712TypedData object.
     * @param orderTypedData
     * @returns a OrderHash that is an string
     */
    buildOrderHash(orderTypedData) {
        const digest = hashTypedData(orderTypedData);
        return digest;
    }
}
//# sourceMappingURL=exchange.order.builder.js.map
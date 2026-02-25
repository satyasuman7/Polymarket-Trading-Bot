import { buildClobEip712Signature, buildPolyHmacSignature } from "../signing/index.js";
export const createL1Headers = async (signer, chainId, nonce, timestamp) => {
    let ts = Math.floor(Date.now() / 1000);
    if (timestamp !== undefined) {
        ts = timestamp;
    }
    let n = 0; // Default nonce is 0
    if (nonce !== undefined) {
        n = nonce;
    }
    const sig = await buildClobEip712Signature(signer, chainId, ts, n);
    const address = await signer.getAddress();
    const headers = {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${ts}`,
        POLY_NONCE: `${n}`,
    };
    return headers;
};
export const createL2Headers = async (signer, creds, l2HeaderArgs, timestamp) => {
    let ts = Math.floor(Date.now() / 1000);
    if (timestamp !== undefined) {
        ts = timestamp;
    }
    const address = await signer.getAddress();
    const sig = await buildPolyHmacSignature(creds.secret, ts, l2HeaderArgs.method, l2HeaderArgs.requestPath, l2HeaderArgs.body);
    const headers = {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${ts}`,
        POLY_API_KEY: creds.key,
        POLY_PASSPHRASE: creds.passphrase,
    };
    return headers;
};
export const injectBuilderHeaders = (l2Header, builderHeaders) => ({
    ...l2Header,
    ...builderHeaders,
});
//# sourceMappingURL=index.js.map
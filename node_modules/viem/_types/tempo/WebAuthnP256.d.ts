import * as Bytes from 'ox/Bytes';
import type * as Hex from 'ox/Hex';
import * as WebAuthnP256 from 'ox/WebAuthnP256';
export type P256Credential = {
    id: WebAuthnP256.P256Credential['id'];
    publicKey: Hex.Hex;
    raw: WebAuthnP256.P256Credential['raw'];
};
/**
 * Creates a WebAuthn credential (ie. a passkey).
 *
 * This function returns the credential object, which includes the public key.
 * It is recommended to store the public key against the credential in an external store
 * as it is not possible to extract a public key from a credential after it has been created.
 *
 * @example
 * ```ts
 * import { WebAuthnP256 } from 'viem/tempo'
 *
 * const credential = await WebAuthnP256.createCredential({ name: 'Example' })
 * // {
 * //   id: 'oZ48...',
 * //   publicKey: '0x...',
 * // }
 * ```
 *
 * @param parameters WebAuthnP256 createCredential options.
 * @returns WebAuthn credential.
 */
export declare function createCredential(parameters: createCredential.Parameters): Promise<createCredential.ReturnValue>;
export declare namespace createCredential {
    type Parameters = Omit<WebAuthnP256.createCredential.Options, 'rp' | 'user'> & {
        /**
         * Credential creation function. Useful for environments that do not support
         * the WebAuthn API natively (i.e. React Native or testing environments).
         *
         * @default window.navigator.credentials.create
         */
        createFn?: WebAuthnP256.createCredential.Options['createFn'] | undefined;
        /** Label. */
        label: string;
        /** Relying Party ID. */
        rpId?: string | undefined;
        /** User ID. */
        userId?: Bytes.Bytes | undefined;
    };
    type ReturnValue = P256Credential;
}
/**
 * Gets a WebAuthn credential (ie. a passkey), and optionally signs over a digest/hash.
 *
 * A `getPublicKey` function is required to fetch the public key paired with the credential
 * from an external store. It is not possible to extract a public key from a credential after
 * the credential has been created with `WebAuthnP256.createCredential`.
 *
 * @example
 * ```ts
 * import { WebAuthnP256 } from 'viem/tempo'
 *
 * const credential = await WebAuthnP256.getCredential({
 *   async getPublicKey(credential) {
 *     // Get public key from store
 *     return store.getPublicKey(credential.id)
 *   }
 * })
 * ```
 *
 * @param parameters WebAuthnP256 getCredential options.
 * @returns WebAuthn credential.
 */
export declare function getCredential(parameters: getCredential.Parameters): Promise<getCredential.ReturnValue>;
export declare namespace getCredential {
    type Parameters = Omit<WebAuthnP256.sign.Options, 'challenge'> & {
        hash?: Hex.Hex | undefined;
        getPublicKey: (credential: WebAuthnP256.P256Credential['raw']) => Promise<Hex.Hex>;
    };
    type ReturnValue = WebAuthnP256.sign.ReturnType & {
        id: string;
        publicKey: Hex.Hex;
    };
}
//# sourceMappingURL=WebAuthnP256.d.ts.map
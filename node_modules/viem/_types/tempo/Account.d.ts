import * as Address from 'ox/Address';
import * as Hex from 'ox/Hex';
import * as PublicKey from 'ox/PublicKey';
import { KeyAuthorization, SignatureEnvelope } from 'ox/tempo';
import * as WebAuthnP256 from 'ox/WebAuthnP256';
import * as WebCryptoP256 from 'ox/WebCryptoP256';
import type { LocalAccount, Account as viem_Account } from '../accounts/types.js';
import type { TransactionSerializable } from '../types/transaction.js';
import type { OneOf, RequiredBy } from '../types/utils.js';
import type { SerializeTransactionFn } from '../utils/transaction/serializeTransaction.js';
import * as Transaction from './Transaction.js';
export type Account_base<source extends string = string> = RequiredBy<LocalAccount<source>, 'sign' | 'signAuthorization' | 'signTransaction'> & {
    /** Key type. */
    keyType: SignatureEnvelope.Type;
    /** Sign transaction fn. */
    signTransaction: <serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<Transaction.TransactionSerializableTempo>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(transaction: transaction, options?: {
        serializer?: serializer | undefined;
    } | undefined) => Promise<Hex.Hex>;
};
export type RootAccount = Account_base<'root'> & {
    /** Sign key authorization. */
    signKeyAuthorization: (key: Pick<AccessKeyAccount, 'accessKeyAddress' | 'keyType'>, parameters?: Pick<KeyAuthorization.KeyAuthorization, 'expiry' | 'limits'>) => Promise<KeyAuthorization.Signed>;
};
export type AccessKeyAccount = Account_base<'accessKey'> & {
    /** Access key ID. */
    accessKeyAddress: Address.Address;
};
export type Account = OneOf<RootAccount | AccessKeyAccount>;
/** Instantiates an Account. */
export declare function from<const parameters extends from.Parameters>(parameters: parameters | from.Parameters): from.ReturnValue<parameters>;
export declare namespace from {
    type Parameters = OneOf<fromRoot.Parameters | fromAccessKey.Parameters>;
    type ReturnValue<parameters extends {
        access?: fromAccessKey.Parameters['access'] | undefined;
    } = {
        access?: fromAccessKey.Parameters['access'] | undefined;
    }> = parameters extends {
        access: fromAccessKey.Parameters['access'];
    } ? AccessKeyAccount : RootAccount;
}
/**
 * Instantiates an Account from a headless WebAuthn credential (P256 private key).
 *
 * @example
 * ```ts
 * import { Account } from 'viem/tempo'
 *
 * const account = Account.fromHeadlessWebAuthn('0x...')
 * ```
 *
 * @param privateKey P256 private key.
 * @returns Account.
 */
export declare function fromHeadlessWebAuthn<const options extends fromHeadlessWebAuthn.Options>(privateKey: Hex.Hex, options: options | fromHeadlessWebAuthn.Options): fromHeadlessWebAuthn.ReturnValue<options>;
export declare namespace fromHeadlessWebAuthn {
    type Options = Omit<WebAuthnP256.getSignPayload.Options, 'challenge' | 'rpId' | 'origin'> & Pick<from.Parameters, 'access'> & {
        rpId: string;
        origin: string;
    };
    type ReturnValue<options extends Options = Options> = from.ReturnValue<options>;
}
/**
 * Instantiates an Account from a P256 private key.
 *
 * @example
 * ```ts
 * import { Account } from 'viem/tempo'
 *
 * const account = Account.fromP256('0x...')
 * ```
 *
 * @param privateKey P256 private key.
 * @returns Account.
 */
export declare function fromP256<const options extends fromP256.Options>(privateKey: Hex.Hex, options?: options | fromP256.Options): fromP256.ReturnValue<options>;
export declare namespace fromP256 {
    type Options = Pick<from.Parameters, 'access'>;
    type ReturnValue<options extends Options = Options> = from.ReturnValue<options>;
}
/**
 * Instantiates an Account from a Secp256k1 private key.
 *
 * @example
 * ```ts
 * import { Account } from 'viem/tempo'
 *
 * const account = Account.fromSecp256k1('0x...')
 * ```
 *
 * @param privateKey Secp256k1 private key.
 * @returns Account.
 */
export declare function fromSecp256k1<const options extends fromSecp256k1.Options>(privateKey: Hex.Hex, options?: options | fromSecp256k1.Options): fromSecp256k1.ReturnValue<options>;
export declare namespace fromSecp256k1 {
    type Options = Pick<from.Parameters, 'access'>;
    type ReturnValue<options extends Options = Options> = from.ReturnValue<options>;
}
/**
 * Instantiates an Account from a WebAuthn credential.
 *
 * @example
 *
 * ### Create Passkey + Instantiate Account
 *
 * Create a credential with `WebAuthnP256.createCredential` and then instantiate
 * a Viem Account with `Account.fromWebAuthnP256`.
 *
 * It is highly recommended to store the credential's public key in an external store
 * for future use (ie. for future calls to `WebAuthnP256.getCredential`).
 *
 * ```ts
 * import { Account, WebAuthnP256 } from 'viem/tempo'
 * import { publicKeyStore } from './store'
 *
 * // 1. Create credential
 * const credential = await WebAuthnP256.createCredential({ name: 'Example' })
 *
 * // 2. Instantiate account
 * const account = Account.fromWebAuthnP256(credential)
 *
 * // 3. Store public key
 * await publicKeyStore.set(credential.id, credential.publicKey)
 *
 * ```
 *
 * @example
 *
 * ### Get Credential + Instantiate Account
 *
 * Gets a credential from `WebAuthnP256.getCredential` and then instantiates
 * an account with `Account.fromWebAuthnP256`.
 *
 * The `getPublicKey` function is required to fetch the public key paired with the credential
 * from an external store. The public key is required to derive the account's address.
 *
 * ```ts
 * import { Account, WebAuthnP256 } from 'viem/tempo'
 * import { publicKeyStore } from './store'
 *
 * // 1. Get credential
 * const credential = await WebAuthnP256.getCredential({
 *   async getPublicKey(credential) {
 *     // 2. Get public key from external store.
 *     return await publicKeyStore.get(credential.id)
 *   }
 * })
 *
 * // 3. Instantiate account
 * const account = Account.fromWebAuthnP256(credential)
 * ```
 *
 * @param credential WebAuthnP256 credential.
 * @returns Account.
 */
export declare function fromWebAuthnP256(credential: fromWebAuthnP256.Credential, options?: fromWebAuthnP256.Options): fromWebAuthnP256.ReturnValue;
export declare namespace fromWebAuthnP256 {
    type Credential = {
        id: WebAuthnP256.P256Credential['id'];
        publicKey: Hex.Hex;
    };
    type Options = {
        getFn?: WebAuthnP256.sign.Options['getFn'] | undefined;
        rpId?: WebAuthnP256.sign.Options['rpId'] | undefined;
    };
    type ReturnValue = from.ReturnValue;
}
/**
 * Instantiates an Account from a P256 private key.
 *
 * @example
 * ```ts
 * import { Account } from 'viem/tempo'
 * import { WebCryptoP256 } from 'ox'
 *
 * const keyPair = await WebCryptoP256.createKeyPair()
 *
 * const account = Account.fromWebCryptoP256(keyPair)
 * ```
 *
 * @param keyPair WebCryptoP256 key pair.
 * @returns Account.
 */
export declare function fromWebCryptoP256<const options extends fromWebCryptoP256.Options>(keyPair: Awaited<ReturnType<typeof WebCryptoP256.createKeyPair>>, options?: options | fromWebCryptoP256.Options): fromWebCryptoP256.ReturnValue<options>;
export declare namespace fromWebCryptoP256 {
    type Options = Pick<from.Parameters, 'access'>;
    type ReturnValue<options extends Options = Options> = from.ReturnValue<options>;
}
export declare function signKeyAuthorization(account: LocalAccount, parameters: signKeyAuthorization.Parameters): Promise<signKeyAuthorization.ReturnValue>;
export declare namespace signKeyAuthorization {
    type Parameters = Pick<KeyAuthorization.KeyAuthorization, 'expiry' | 'limits'> & {
        key: Pick<AccessKeyAccount, 'accessKeyAddress' | 'keyType'>;
    };
    type ReturnValue = KeyAuthorization.Signed;
}
/** @internal */
declare function fromBase(parameters: fromBase.Parameters): Account_base;
declare namespace fromBase {
    type Parameters = {
        /** Parent address. */
        parentAddress?: Address.Address | undefined;
        /** Public key. */
        publicKey: PublicKey.PublicKey;
        /** Key type. */
        keyType?: SignatureEnvelope.Type | undefined;
        /** Sign function. */
        sign: NonNullable<LocalAccount['sign']>;
        /** Source. */
        source?: string | undefined;
    };
    type ReturnValue = Account_base;
}
/** @internal */
declare function fromRoot(parameters: fromRoot.Parameters): RootAccount;
declare namespace fromRoot {
    type Parameters = fromBase.Parameters;
    type ReturnValue = RootAccount;
}
declare function fromAccessKey(parameters: fromAccessKey.Parameters): AccessKeyAccount;
declare namespace fromAccessKey {
    type Parameters = fromBase.Parameters & {
        /**
         * Parent account to access.
         * If defined, this account will act as an "access key", and use
         * the parent account's address as the keychain address.
         */
        access: viem_Account | Address.Address;
    };
    type ReturnValue = AccessKeyAccount;
}
export { 
/** @deprecated */
KeyAuthorization as z_KeyAuthorization, 
/** @deprecated */
SignatureEnvelope as z_SignatureEnvelope, 
/** @deprecated */
TxEnvelopeTempo as z_TxEnvelopeTempo, } from 'ox/tempo';
//# sourceMappingURL=Account.d.ts.map
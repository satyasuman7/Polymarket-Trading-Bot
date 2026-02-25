import { HDKey } from '@scure/bip32';
import { mnemonicToSeedSync } from '@scure/bip39';
import { hdKeyToAccount, } from './hdKeyToAccount.js';
/**
 * @description Creates an Account from a mnemonic phrase.
 *
 * @returns A HD Account.
 */
export function mnemonicToAccount(mnemonic, { passphrase, ...hdKeyOpts } = {}) {
    const seed = mnemonicToSeedSync(mnemonic, passphrase);
    return hdKeyToAccount(HDKey.fromMasterSeed(seed), hdKeyOpts);
}
//# sourceMappingURL=mnemonicToAccount.js.map
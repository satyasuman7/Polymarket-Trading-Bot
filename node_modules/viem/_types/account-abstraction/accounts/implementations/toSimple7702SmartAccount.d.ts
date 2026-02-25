import type { Abi, Address } from 'abitype';
import type { PrivateKeyAccount } from '../../../accounts/types.js';
import type { Prettify } from '../../../types/utils.js';
import { entryPoint08Abi, entryPoint09Abi } from '../../constants/abis.js';
import type { EntryPointVersion } from '../../types/entryPointVersion.js';
import type { SmartAccount, SmartAccountImplementation } from '../types.js';
type EntryPoint = '0.8' | '0.9' | {
    abi: Abi;
    address: Address;
    version: EntryPointVersion;
};
export type ToSimple7702SmartAccountParameters<entryPoint extends EntryPoint = '0.8'> = {
    client: Simple7702SmartAccountImplementation['client'];
    entryPoint?: entryPoint | EntryPoint | undefined;
    implementation?: Address | undefined;
    getNonce?: SmartAccountImplementation['getNonce'] | undefined;
    owner: PrivateKeyAccount;
};
export type ToSimple7702SmartAccountReturnType<entryPoint extends EntryPoint = '0.8'> = Prettify<SmartAccount<Simple7702SmartAccountImplementation<entryPoint>>>;
export type Simple7702SmartAccountImplementation<entryPoint extends EntryPoint = '0.8'> = SmartAccountImplementation<entryPoint extends {
    abi: infer abi;
} ? abi : entryPoint extends '0.9' ? typeof entryPoint09Abi : typeof entryPoint08Abi, entryPoint extends string ? entryPoint : entryPoint extends {
    version: infer version;
} ? version : EntryPointVersion, {
    abi: entryPoint extends {
        abi: infer abi;
    } ? abi : entryPoint extends '0.9' ? typeof entryPoint09Abi : typeof entryPoint08Abi;
    owner: PrivateKeyAccount;
}, true>;
/**
 * @description Create a Simple7702 Smart Account – based off [eth-infinitism's `Simple7702Account.sol`](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol).
 *
 * @param parameters - {@link ToSimple7702SmartAccountParameters}
 * @returns Simple7702 Smart Account. {@link ToSimple7702SmartAccountReturnType}
 *
 * @example
 * import { toSimple7702SmartAccount } from 'viem/account-abstraction'
 * import { client } from './client.js'
 *
 * const implementation = toSimple7702SmartAccount({
 *   client,
 *   owner: '0x...',
 * })
 */
export declare function toSimple7702SmartAccount<entryPoint extends EntryPoint = '0.8'>(parameters: ToSimple7702SmartAccountParameters<entryPoint>): Promise<ToSimple7702SmartAccountReturnType<entryPoint>>;
export {};
//# sourceMappingURL=toSimple7702SmartAccount.d.ts.map
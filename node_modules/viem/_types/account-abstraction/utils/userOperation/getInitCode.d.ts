import type { UserOperation } from '../../types/userOperation.js';
export type GetInitCodeOptions = {
    /** Prepare the init code for hashing. */
    forHash?: boolean | undefined;
};
export declare function getInitCode(userOperation: Pick<UserOperation, 'authorization' | 'factory' | 'factoryData'>, options?: GetInitCodeOptions): `0x${string}`;
//# sourceMappingURL=getInitCode.d.ts.map
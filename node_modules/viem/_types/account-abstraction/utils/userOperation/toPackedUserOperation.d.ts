import type { PackedUserOperation, UserOperation } from '../../types/userOperation.js';
export type ToPackedUserOperationOptions = {
    /** Prepare the packed user operation for hashing. */
    forHash?: boolean | undefined;
};
export declare function toPackedUserOperation(userOperation: UserOperation, options?: ToPackedUserOperationOptions): PackedUserOperation;
//# sourceMappingURL=toPackedUserOperation.d.ts.map
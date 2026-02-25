/**
 * Detects if there are concurrent tasks occuring for a given key
 * within the same event loop tick. Registers the request, yields to allow
 * other concurrent calls to register, then returns whether multiple requests
 * were detected.
 *
 * @example
 * ```ts
 * const isConcurrent = await Concurrent.detect(address)
 * ```
 */
export declare function detect(key: string): Promise<boolean>;
//# sourceMappingURL=concurrent.d.ts.map
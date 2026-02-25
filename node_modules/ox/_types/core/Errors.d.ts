export type GlobalErrorType<name extends string = 'Error'> = Error & {
    name: name;
};
/**
 * Base error class inherited by all errors thrown by ox.
 *
 * @example
 * ```ts
 * import { Errors } from 'ox'
 * throw new Errors.BaseError('An error occurred')
 * ```
 */
export declare class BaseError<cause extends Error | undefined = undefined> extends Error {
    details: string;
    docs?: string | undefined;
    docsOrigin?: string | undefined;
    docsPath?: string | undefined;
    shortMessage: string;
    showVersion?: boolean | undefined;
    version?: string | undefined;
    cause: cause;
    name: string;
    static defaultStaticOptions: {
        docsOrigin: string;
        showVersion: false;
        version: string;
    };
    static setStaticOptions(options: BaseError.GlobalOptions): void;
    constructor(shortMessage: string, options?: BaseError.Options<cause>);
    walk(): Error;
    walk(fn: (err: unknown) => boolean): Error | null;
}
export declare namespace BaseError {
    type Options<cause extends Error | undefined = Error | undefined> = {
        /** Cause of the error. */
        cause?: cause | undefined;
        /** Details of the error. */
        details?: string | undefined;
        /** Origin of the docs. */
        docsOrigin?: string | undefined;
        /** Path of the docs. */
        docsPath?: string | undefined;
        /** Meta messages to add to the error. */
        metaMessages?: (string | undefined)[] | undefined;
        /** Version of the library to attribute the error to. */
        version?: string | undefined;
    };
    type GlobalOptions = {
        /** Origin of the docs. */
        docsOrigin?: string | undefined;
        /** Whether to show the version of the library in the error message. */
        showVersion?: boolean | undefined;
        /** Version of the library to attribute the error to. */
        version?: string | undefined;
    };
}
//# sourceMappingURL=Errors.d.ts.map
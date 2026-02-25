"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const errors_js_1 = require("./internal/errors.js");
class BaseError extends Error {
    static setStaticOptions(options) {
        BaseError.prototype.docsOrigin = options.docsOrigin;
        BaseError.prototype.showVersion = options.showVersion;
        BaseError.prototype.version = options.version;
    }
    constructor(shortMessage, options = {}) {
        const details = (() => {
            if (options.cause instanceof BaseError) {
                if (options.cause.details)
                    return options.cause.details;
                if (options.cause.shortMessage)
                    return options.cause.shortMessage;
            }
            if (options.cause &&
                'details' in options.cause &&
                typeof options.cause.details === 'string')
                return options.cause.details;
            if (options.cause?.message)
                return options.cause.message;
            return options.details;
        })();
        const docsPath = (() => {
            if (options.cause instanceof BaseError)
                return options.cause.docsPath || options.docsPath;
            return options.docsPath;
        })();
        const docsBaseUrl = options.docsOrigin ?? BaseError.prototype.docsOrigin;
        const docs = `${docsBaseUrl}${docsPath ?? ''}`;
        const showVersion = Boolean(options.version ?? BaseError.prototype.showVersion);
        const version = options.version ?? BaseError.prototype.version;
        const message = [
            shortMessage || 'An error occurred.',
            ...(options.metaMessages ? ['', ...options.metaMessages] : []),
            ...(details || docsPath || showVersion
                ? [
                    '',
                    details ? `Details: ${details}` : undefined,
                    docsPath ? `See: ${docs}` : undefined,
                    showVersion ? `Version: ${version}` : undefined,
                ]
                : []),
        ]
            .filter((x) => typeof x === 'string')
            .join('\n');
        super(message, options.cause ? { cause: options.cause } : undefined);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsOrigin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "showVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'BaseError'
        });
        this.cause = options.cause;
        this.details = details;
        this.docs = docs;
        this.docsOrigin = docsBaseUrl;
        this.docsPath = docsPath;
        this.shortMessage = shortMessage;
        this.showVersion = showVersion;
        this.version = version;
    }
    walk(fn) {
        return walk(this, fn);
    }
}
exports.BaseError = BaseError;
Object.defineProperty(BaseError, "defaultStaticOptions", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        docsOrigin: 'https://oxlib.sh',
        showVersion: false,
        version: `ox@${(0, errors_js_1.getVersion)()}`,
    }
});
(() => {
    BaseError.setStaticOptions(BaseError.defaultStaticOptions);
})();
function walk(err, fn) {
    if (fn?.(err))
        return err;
    if (err && typeof err === 'object' && 'cause' in err && err.cause)
        return walk(err.cause, fn);
    return fn ? null : err;
}
//# sourceMappingURL=Errors.js.map
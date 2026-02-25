"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detect = detect;
const concurrentCounts = new Map();
async function detect(key) {
    concurrentCounts.set(key, (concurrentCounts.get(key) ?? 0) + 1);
    await Promise.resolve();
    const isConcurrent = (concurrentCounts.get(key) ?? 0) > 1;
    queueMicrotask(() => {
        const count = concurrentCounts.get(key) ?? 0;
        if (count <= 1)
            concurrentCounts.delete(key);
        else
            concurrentCounts.set(key, count - 1);
    });
    return isConcurrent;
}
//# sourceMappingURL=concurrent.js.map
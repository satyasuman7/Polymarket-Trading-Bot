"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitCode = getInitCode;
const concat_js_1 = require("../../../utils/data/concat.js");
function getInitCode(userOperation, options = {}) {
    const { forHash } = options;
    const { authorization, factory, factoryData } = userOperation;
    if (forHash &&
        (factory === '0x7702' ||
            factory === '0x7702000000000000000000000000000000000000')) {
        if (!authorization)
            return '0x7702000000000000000000000000000000000000';
        return (0, concat_js_1.concat)([authorization.address, factoryData ?? '0x']);
    }
    if (!factory)
        return '0x';
    return (0, concat_js_1.concat)([factory, factoryData ?? '0x']);
}
//# sourceMappingURL=getInitCode.js.map
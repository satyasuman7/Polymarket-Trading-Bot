"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTypedData = verifyTypedData;
const getAction_js_1 = require("../../utils/getAction.js");
const hashTypedData_js_1 = require("../../utils/signature/hashTypedData.js");
const verifyHash_js_1 = require("./verifyHash.js");
async function verifyTypedData(client, parameters) {
    const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
    const hash = (0, hashTypedData_js_1.hashTypedData)({ message, primaryType, types, domain });
    return (0, getAction_js_1.getAction)(client, verifyHash_js_1.verifyHash, 'verifyHash')({
        address,
        factory: factory,
        factoryData: factoryData,
        hash,
        signature,
        ...callRequest,
    });
}
//# sourceMappingURL=verifyTypedData.js.map
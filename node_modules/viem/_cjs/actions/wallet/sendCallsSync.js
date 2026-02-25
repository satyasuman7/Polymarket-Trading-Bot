"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCallsSync = sendCallsSync;
const getAction_js_1 = require("../../utils/getAction.js");
const sendCalls_js_1 = require("./sendCalls.js");
const waitForCallsStatus_js_1 = require("./waitForCallsStatus.js");
async function sendCallsSync(client, parameters) {
    const { chain = client.chain } = parameters;
    const timeout = parameters.timeout ?? Math.max((chain?.blockTime ?? 0) * 3, 5_000);
    const result = await (0, getAction_js_1.getAction)(client, sendCalls_js_1.sendCalls, 'sendCalls')(parameters);
    const status = await (0, getAction_js_1.getAction)(client, waitForCallsStatus_js_1.waitForCallsStatus, 'waitForCallsStatus')({
        ...parameters,
        id: result.id,
        timeout,
    });
    return status;
}
//# sourceMappingURL=sendCallsSync.js.map
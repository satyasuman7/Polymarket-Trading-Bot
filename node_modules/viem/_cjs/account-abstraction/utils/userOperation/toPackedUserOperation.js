"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPackedUserOperation = toPackedUserOperation;
const concat_js_1 = require("../../../utils/data/concat.js");
const pad_js_1 = require("../../../utils/data/pad.js");
const size_js_1 = require("../../../utils/data/size.js");
const index_js_1 = require("../../../utils/index.js");
const getInitCode_js_1 = require("./getInitCode.js");
const paymasterSignatureMagic = '0x22e325a297439656';
function toPackedUserOperation(userOperation, options = {}) {
    const { callGasLimit, callData, maxPriorityFeePerGas, maxFeePerGas, paymaster, paymasterData, paymasterPostOpGasLimit, paymasterSignature, paymasterVerificationGasLimit, sender, signature = '0x', verificationGasLimit, } = userOperation;
    const accountGasLimits = (0, concat_js_1.concat)([
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(verificationGasLimit || 0n), { size: 16 }),
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(callGasLimit || 0n), { size: 16 }),
    ]);
    const initCode = (0, getInitCode_js_1.getInitCode)(userOperation, options);
    const gasFees = (0, concat_js_1.concat)([
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(maxPriorityFeePerGas || 0n), { size: 16 }),
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(maxFeePerGas || 0n), { size: 16 }),
    ]);
    const nonce = userOperation.nonce ?? 0n;
    const paymasterAndData = paymaster
        ? (0, concat_js_1.concat)([
            paymaster,
            (0, pad_js_1.pad)((0, index_js_1.numberToHex)(paymasterVerificationGasLimit || 0n), {
                size: 16,
            }),
            (0, pad_js_1.pad)((0, index_js_1.numberToHex)(paymasterPostOpGasLimit || 0n), {
                size: 16,
            }),
            paymasterData || '0x',
            ...(paymasterSignature
                ? options.forHash
                    ? [paymasterSignatureMagic]
                    : [
                        paymasterSignature,
                        (0, pad_js_1.pad)((0, index_js_1.numberToHex)((0, size_js_1.size)(paymasterSignature)), { size: 2 }),
                        paymasterSignatureMagic,
                    ]
                : []),
        ])
        : '0x';
    const preVerificationGas = userOperation.preVerificationGas ?? 0n;
    return {
        accountGasLimits,
        callData,
        initCode,
        gasFees,
        nonce,
        paymasterAndData,
        preVerificationGas,
        sender,
        signature,
    };
}
//# sourceMappingURL=toPackedUserOperation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = from;
const Hash = require("../core/Hash.js");
const Hex = require("../core/Hex.js");
const TokenId = require("./TokenId.js");
function from(value) {
    return Hash.keccak256(Hex.concat(Hex.padLeft(TokenId.toAddress(value.userToken), 32), Hex.padLeft(TokenId.toAddress(value.validatorToken), 32)));
}
//# sourceMappingURL=PoolId.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPreHashed = exports.roles = void 0;
exports.serialize = serialize;
const Hash = require("../core/Hash.js");
const Hex = require("../core/Hex.js");
exports.roles = [
    'defaultAdmin',
    'pause',
    'unpause',
    'issuer',
    'burnBlocked',
];
exports.toPreHashed = {
    defaultAdmin: 'DEFAULT_ADMIN_ROLE',
    pause: 'PAUSE_ROLE',
    unpause: 'UNPAUSE_ROLE',
    issuer: 'ISSUER_ROLE',
    burnBlocked: 'BURN_BLOCKED_ROLE',
};
function serialize(role) {
    if (role === 'defaultAdmin')
        return '0x0000000000000000000000000000000000000000000000000000000000000000';
    return Hash.keccak256(Hex.fromString(exports.toPreHashed[role] ?? role));
}
//# sourceMappingURL=TokenRole.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = isValidDate;
exports.getFirstValue = getFirstValue;
exports.generateNumberAlphabet = generateNumberAlphabet;
exports.toObjectId = toObjectId;
exports.bufferToObjectIdHex = bufferToObjectIdHex;
exports.idToString = idToString;
exports.eqObjectId = eqObjectId;
exports.processFilterValue = processFilterValue;
exports.getCurrentDate = getCurrentDate;
exports.parseTimeHmToMilliseconds = parseTimeHmToMilliseconds;
const mongoose_1 = require("mongoose");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function isValidDate(date) {
    return !isNaN(date.getTime());
}
function getFirstValue(value) {
    const firstValue = Array.isArray(value) ? value[0] : value;
    return firstValue instanceof mongoose_1.Types.ObjectId ? firstValue.toHexString() : firstValue;
}
function generateNumberAlphabet() {
    return this.nanoid();
}
const _Buffer = typeof Buffer !== 'undefined' ? Buffer : undefined;
function isNodeBuffer(x) {
    return !!_Buffer && _Buffer.isBuffer?.(x);
}
function isUint8(x) {
    return x instanceof Uint8Array;
}
function isJsonBufferShape(x) {
    return x && typeof x === 'object' && x.type === 'Buffer' && Array.isArray(x.data);
}
function fromJsonBuffer(x) {
    try {
        return _Buffer.from(x.data);
    }
    catch {
        return null;
    }
}
function toObjectId(id) {
    return new mongoose_1.Types.ObjectId(id ?? undefined);
}
function bufferToObjectIdHex(bufLike) {
    try {
        const b = isNodeBuffer(bufLike)
            ? bufLike
            : isUint8(bufLike)
                ? _Buffer.from(bufLike)
                : isJsonBufferShape(bufLike)
                    ? fromJsonBuffer(bufLike)
                    : null;
        if (!b)
            return null;
        if (b.length === 12)
            return b.toString('hex');
        const asText = b.toString('utf8');
        if (/^[0-9a-f]{24}$/i.test(asText))
            return asText;
        return b.toString('hex');
    }
    catch {
        return null;
    }
}
function idToString(x) {
    if (x == null)
        return null;
    if (x instanceof mongoose_1.Types.ObjectId)
        return x.toHexString();
    if (x?._bsontype === 'ObjectID' && typeof x.toHexString === 'function')
        return x.toHexString();
    const fromBuf = bufferToObjectIdHex(x);
    if (fromBuf)
        return fromBuf;
    if (typeof x === 'string')
        return x;
    if (typeof x === 'object' && x._id != null)
        return idToString(x._id);
    return null;
}
function eqObjectId(a, b) {
    const as = idToString(a);
    const bs = idToString(b);
    return !!as && !!bs && as.toLowerCase() === bs.toLowerCase();
}
function processFilterValue(key, value) {
    if (Array.isArray(value)) {
        if (value.length === 1) {
            return { [key]: value[0] };
        }
        else {
            return { [key]: { $in: value } };
        }
    }
    else {
        return { [key]: value };
    }
}
function getCurrentDate(timezone = 'Asia/Ho_Chi_Minh') {
    return moment_timezone_1.default.tz(timezone).toDate();
}
function parseTimeHmToMilliseconds(value) {
    if (!value)
        return 60 * 60 * 1000;
    const trimmed = value.trim().toLowerCase();
    const match = trimmed.match(/^(\d+(?:\.\d+)?)?([hm])?$/);
    if (!match)
        return 60 * 60 * 1000;
    const number = match[1] ? parseFloat(match[1]) : 1;
    const unit = match[2] || 'h';
    if (unit === 'h') {
        return number * 60 * 60 * 1000;
    }
    else if (unit === 'm') {
        return number * 60 * 1000;
    }
    return 60 * 60 * 1000;
}
//# sourceMappingURL=utils.js.map
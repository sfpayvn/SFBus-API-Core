"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripFields = StripFields;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const mongoose_1 = require("mongoose");
function toPlain(value) {
    if (value && typeof value.toObject === 'function') {
        return value.toObject({ virtuals: true, getters: false, versionKey: false });
    }
    return value;
}
function normalizeBsonScalar(value) {
    if (value instanceof mongoose_1.Types.ObjectId)
        return value.toHexString();
    if (value?._bsontype === 'ObjectID' && typeof value.toHexString === 'function') {
        return value.toHexString();
    }
    return value;
}
function deepOmit(value, omitSet) {
    const normalized = normalizeBsonScalar(value);
    if (normalized !== value)
        return normalized;
    if (Array.isArray(value)) {
        return value.map((v) => deepOmit(v, omitSet));
    }
    if (value instanceof Date) {
        return value;
    }
    if (value && typeof value === 'object') {
        const plain = toPlain(value);
        if (Array.isArray(plain))
            return deepOmit(plain, omitSet);
        const result = {};
        for (const [k, v] of Object.entries(plain ?? {})) {
            if (omitSet.has(k))
                continue;
            const nv = normalizeBsonScalar(v);
            result[k] = nv === v ? deepOmit(v, omitSet) : nv;
        }
        return result;
    }
    return value;
}
function StripFields(fields) {
    let StripFieldsInterceptor = class StripFieldsInterceptor {
        constructor() {
            this.omitSet = new Set(fields);
        }
        intercept(_ctx, next) {
            return next.handle().pipe((0, operators_1.map)((data) => deepOmit(data, this.omitSet)));
        }
    };
    StripFieldsInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], StripFieldsInterceptor);
    return (0, common_1.mixin)(StripFieldsInterceptor);
}
//# sourceMappingURL=strip-fields.interceptor.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkDefaultTenant = MarkDefaultTenant;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils/utils");
function toPlain(value) {
    if (value && typeof value.toObject === 'function') {
        return value.toObject({ virtuals: true, getters: false, versionKey: false });
    }
    return value;
}
function normalizeScalar(value) {
    if (value == null)
        return value;
    if (value instanceof Date)
        return value;
    if (value instanceof mongoose_1.Types.ObjectId)
        return value.toHexString();
    if (value?._bsontype === 'ObjectID' && typeof value.toHexString === 'function') {
        return value.toHexString();
    }
    const fromBuf = (0, utils_1.bufferToObjectIdHex)(value);
    if (fromBuf)
        return fromBuf;
    if (typeof value !== 'object')
        return value;
    return undefined;
}
function walk(value, rootId, viewerIsRoot) {
    const scalar = normalizeScalar(value);
    if (scalar !== undefined)
        return scalar;
    if (Array.isArray(value))
        return value.map((v) => walk(v, rootId, viewerIsRoot));
    const plain = toPlain(value);
    if (Array.isArray(plain))
        return walk(plain, rootId, viewerIsRoot);
    const out = {};
    let sawTenant = false;
    let isRootMatch = false;
    for (const [k, v] of Object.entries(plain ?? {})) {
        if (k === 'tenantId') {
            sawTenant = true;
            if (rootId)
                isRootMatch = (0, utils_1.eqObjectId)(v, rootId);
            continue;
        }
        out[k] = walk(v, rootId, viewerIsRoot);
    }
    if (sawTenant && isRootMatch && !viewerIsRoot) {
        out.isDefault = true;
    }
    return out;
}
function getViewerTenantId(ctx) {
    const http = ctx.switchToHttp();
    const req = http?.getRequest?.();
    if (req) {
        const fromUser = req.user?.tenantId ?? req.user?.tenant?.id ?? req.user?.tenant?._id;
        if (fromUser)
            return fromUser;
        const fromHeader = req.headers?.['x-tenant-id'] ?? req.headers?.['x-tenant'];
        if (fromHeader)
            return fromHeader;
    }
    return null;
}
function MarkDefaultTenant() {
    let MarkDefaultTenantInterceptor = class MarkDefaultTenantInterceptor {
        constructor() {
            this.rootId = process.env.ROOT_TENANT_ID ?? null;
        }
        intercept(ctx, next) {
            const viewerTenantId = getViewerTenantId(ctx);
            const viewerIsRoot = !!this.rootId && (0, utils_1.eqObjectId)(viewerTenantId, this.rootId);
            return next.handle().pipe((0, operators_1.map)((data) => walk(data, this.rootId, viewerIsRoot)));
        }
    };
    MarkDefaultTenantInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], MarkDefaultTenantInterceptor);
    return (0, common_1.mixin)(MarkDefaultTenantInterceptor);
}
//# sourceMappingURL=mark-default-tenant.js.map
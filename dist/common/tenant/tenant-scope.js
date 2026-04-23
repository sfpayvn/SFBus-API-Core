"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantScope = void 0;
exports.buildTenantScope = buildTenantScope;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function toObjectId(id) {
    return new mongoose_1.Types.ObjectId(id ?? undefined);
}
function buildTenantScope(user) {
    const ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    const isRoot = !!user?.tenantId && user.tenantId.toString() === toObjectId(ROOT_TENANT_ID).toString();
    const rootTenantObjectId = toObjectId(ROOT_TENANT_ID);
    const tenantIds = isRoot ? [toObjectId(user.tenantId)] : [toObjectId(user.tenantId), rootTenantObjectId];
    return {
        rootTenantId: rootTenantObjectId,
        tenantIds,
        tenantId: toObjectId(user.tenantId),
    };
}
exports.TenantScope = (0, common_1.createParamDecorator)((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return buildTenantScope(user);
});
//# sourceMappingURL=tenant-scope.js.map
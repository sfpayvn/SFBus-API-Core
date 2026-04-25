"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantInfoByCode = exports.TenantIdsByCode = exports.TenantIdByCode = void 0;
const utils_1 = require("../utils/utils");
const common_1 = require("@nestjs/common");
exports.TenantIdByCode = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantId;
});
exports.TenantIdsByCode = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    return [request.tenantId, (0, utils_1.toObjectId)(ROOT_TENANT_ID)];
});
exports.TenantInfoByCode = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenant;
});
//# sourceMappingURL=tenant-by-code.decorator.js.map
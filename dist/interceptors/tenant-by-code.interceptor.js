"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantByCodeInterceptor = void 0;
const tenant_service_1 = require("../module/core/tenant/tenant.service");
const common_1 = require("@nestjs/common");
let TenantByCodeInterceptor = class TenantByCodeInterceptor {
    constructor(clientTenantService) {
        this.clientTenantService = clientTenantService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const tenantCode = request.headers['x-tenant-code'];
        if (!tenantCode) {
            throw new common_1.BadRequestException('x-tenant-code header is required');
        }
        try {
            const tenant = await this.clientTenantService.findByCode(tenantCode);
            if (!tenant) {
                throw new common_1.BadRequestException(`Tenant with code "${tenantCode}" not found`);
            }
            request.tenantId = tenant._id;
            request.tenant = tenant;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Failed to resolve tenant code: ${error.message}`);
        }
        return next.handle();
    }
};
exports.TenantByCodeInterceptor = TenantByCodeInterceptor;
exports.TenantByCodeInterceptor = TenantByCodeInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_service_1.TenantService))),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantByCodeInterceptor);
//# sourceMappingURL=tenant-by-code.interceptor.js.map
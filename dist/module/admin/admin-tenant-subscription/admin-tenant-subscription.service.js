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
exports.AdminTenantSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const tenant_subscription_service_1 = require("../../core/tenant-subscription/tenant-subscription.service");
let AdminTenantSubscriptionService = class AdminTenantSubscriptionService {
    constructor(tenantSubscriptionService) {
        this.tenantSubscriptionService = tenantSubscriptionService;
    }
    async registerForTenant(tenantId, dto) {
        return this.tenantSubscriptionService.registerForTenant(tenantId, dto);
    }
    async findByTenantId(tenantId) {
        return this.tenantSubscriptionService.findByTenantId(tenantId);
    }
    async findAllByTenantId(tenantId) {
        return this.tenantSubscriptionService.findAllByTenantId(tenantId);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        return this.tenantSubscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
    }
    async searchMySubscriptions(pageIdx, pageSize, keyword, sortBy, filters) {
        return this.tenantSubscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
    }
};
exports.AdminTenantSubscriptionService = AdminTenantSubscriptionService;
exports.AdminTenantSubscriptionService = AdminTenantSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_subscription_service_1.TenantSubscriptionService))),
    __metadata("design:paramtypes", [tenant_subscription_service_1.TenantSubscriptionService])
], AdminTenantSubscriptionService);
//# sourceMappingURL=admin-tenant-subscription.service.js.map
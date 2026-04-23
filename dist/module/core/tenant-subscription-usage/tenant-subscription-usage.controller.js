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
exports.TenantSubscriptionUsageController = void 0;
const common_1 = require("@nestjs/common");
const tenant_subscription_usage_service_1 = require("./tenant-subscription-usage.service");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
let TenantSubscriptionUsageController = class TenantSubscriptionUsageController {
    constructor(tenantSubscriptionUsageService) {
        this.tenantSubscriptionUsageService = tenantSubscriptionUsageService;
    }
    getCapabilities(req) {
        const subjectId = req.user.tenantId ?? req.user._id;
        return this.tenantSubscriptionUsageService.buildCapabilities(subjectId);
    }
};
exports.TenantSubscriptionUsageController = TenantSubscriptionUsageController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('capabilities'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantSubscriptionUsageController.prototype, "getCapabilities", null);
exports.TenantSubscriptionUsageController = TenantSubscriptionUsageController = __decorate([
    (0, common_1.Controller)('tenant/tenant-subscription-usage'),
    __metadata("design:paramtypes", [tenant_subscription_usage_service_1.TenantSubscriptionUsageService])
], TenantSubscriptionUsageController);
//# sourceMappingURL=tenant-subscription-usage.controller.js.map
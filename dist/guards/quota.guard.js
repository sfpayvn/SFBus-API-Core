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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const tenant_subscription_usage_service_1 = require("../module/core/tenant-subscription-usage/tenant-subscription-usage.service");
const feature_decorator_1 = require("../decorators/feature.decorator");
const module_function_keys_1 = require("../common/constants/module-function-keys");
let QuotaGuard = class QuotaGuard {
    constructor(reflector, tenantSubscriptionUsageService) {
        this.reflector = reflector;
        this.tenantSubscriptionUsageService = tenantSubscriptionUsageService;
    }
    async canActivate(ctx) {
        const feature = this.reflector.get(feature_decorator_1.FEATURE_META_KEY, ctx.getHandler());
        if (!feature)
            return true;
        const req = ctx.switchToHttp().getRequest();
        const method = req.method?.toUpperCase();
        const subscriptionId = new mongoose_1.Types.ObjectId(req.user.subscriptionId);
        const subjectId = new mongoose_1.Types.ObjectId(req.user.tenantId ?? req.user._id);
        req.quotaInfo = {
            method,
            subscriptionId,
            subjectId,
            moduleKey: feature.moduleKey,
            functionKey: feature.functionKey,
        };
        if (feature.actionQuotaKey === module_function_keys_1.ACTIONQUOTA_KEYS.RELEASED) {
            const subscriptionId = new mongoose_1.Types.ObjectId(req.user.subscriptionId);
            const subjectId = new mongoose_1.Types.ObjectId(req.user.tenantId ?? req.user._id);
            const result = await this.tenantSubscriptionUsageService.releaseQuota({
                subscriptionId,
                subjectId,
                moduleKey: feature.moduleKey,
                functionKey: feature.functionKey,
            });
            req.quota = {
                allowed: true,
                remaining: result.remaining ?? null,
                resetAt: result.resetAt?.getTime?.() ?? result.resetAt?.valueOf?.() ?? null,
            };
            return true;
        }
        const r = await this.tenantSubscriptionUsageService.checkAndConsume({
            subscriptionId,
            subjectId,
            moduleKey: feature.moduleKey,
            functionKey: feature.functionKey,
        });
        if (!r.allowed) {
            if (r.reason === 'subscription_not_found')
                throw new common_1.UnauthorizedException('No subscription');
            req.quota = {
                allowed: false,
                reason: r.reason,
                remaining: 0,
                resetAt: r.resetAt?.getTime?.() ?? r.resetAt?.valueOf?.(),
            };
            return true;
        }
        req.quota = { allowed: true, remaining: r.remaining, resetAt: r.resetAt?.getTime?.() ?? r.resetAt?.valueOf?.() };
        return true;
    }
};
exports.QuotaGuard = QuotaGuard;
exports.QuotaGuard = QuotaGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        tenant_subscription_usage_service_1.TenantSubscriptionUsageService])
], QuotaGuard);
//# sourceMappingURL=quota.guard.js.map
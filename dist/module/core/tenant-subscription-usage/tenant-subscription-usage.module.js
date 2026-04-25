"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSubscriptionUsageModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const tenant_subscription_usage_controller_1 = require("./tenant-subscription-usage.controller");
const tenant_subscription_usage_service_1 = require("./tenant-subscription-usage.service");
const tenant_subscription_usage_schema_1 = require("./schema/tenant-subscription-usage.schema");
const tenant_subscription_module_1 = require("../tenant-subscription/tenant-subscription.module");
const tenant_subscription_schema_1 = require("../tenant-subscription/schema/tenant-subscription.schema");
let TenantSubscriptionUsageModule = class TenantSubscriptionUsageModule {
};
exports.TenantSubscriptionUsageModule = TenantSubscriptionUsageModule;
exports.TenantSubscriptionUsageModule = TenantSubscriptionUsageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tenant_subscription_usage_schema_1.TenantSubscriptionUsageDocument.name, schema: tenant_subscription_usage_schema_1.TenantSubscriptionUsageSchema },
                { name: tenant_subscription_schema_1.TenantSubscriptionDocument.name, schema: tenant_subscription_schema_1.TenantSubscriptionSchema },
            ]),
            (0, common_1.forwardRef)(() => tenant_subscription_module_1.TenantSubscriptionModule),
        ],
        controllers: [tenant_subscription_usage_controller_1.TenantSubscriptionUsageController],
        providers: [tenant_subscription_usage_service_1.TenantSubscriptionUsageService],
        exports: [tenant_subscription_usage_service_1.TenantSubscriptionUsageService, mongoose_1.MongooseModule],
    })
], TenantSubscriptionUsageModule);
//# sourceMappingURL=tenant-subscription-usage.module.js.map
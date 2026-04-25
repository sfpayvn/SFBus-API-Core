"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tenant_subscription_service_1 = require("./tenant-subscription.service");
const tenant_subscription_controller_1 = require("./tenant-subscription.controller");
const tenant_subscription_schema_1 = require("./schema/tenant-subscription.schema");
const tenant_module_1 = require("../tenant/tenant.module");
const subscription_module_1 = require("../subscription/subscription.module");
const subscription_schema_1 = require("../subscription/schema/subscription.schema");
let TenantSubscriptionModule = class TenantSubscriptionModule {
};
exports.TenantSubscriptionModule = TenantSubscriptionModule;
exports.TenantSubscriptionModule = TenantSubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tenant_subscription_schema_1.TenantSubscriptionDocument.name, schema: tenant_subscription_schema_1.TenantSubscriptionSchema },
                { name: subscription_schema_1.SubscriptionDocument.name, schema: subscription_schema_1.SubscriptionSchema },
            ]),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
            (0, common_1.forwardRef)(() => subscription_module_1.SubscriptionModule),
        ],
        controllers: [tenant_subscription_controller_1.TenantSubscriptionController],
        providers: [tenant_subscription_service_1.TenantSubscriptionService],
        exports: [tenant_subscription_service_1.TenantSubscriptionService],
    })
], TenantSubscriptionModule);
//# sourceMappingURL=tenant-subscription.module.js.map
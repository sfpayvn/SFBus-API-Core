"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTenantSubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const admin_tenant_subscription_controller_1 = require("./admin-tenant-subscription.controller");
const admin_tenant_subscription_service_1 = require("./admin-tenant-subscription.service");
const tenant_subscription_module_1 = require("../../core/tenant-subscription/tenant-subscription.module");
let AdminTenantSubscriptionModule = class AdminTenantSubscriptionModule {
};
exports.AdminTenantSubscriptionModule = AdminTenantSubscriptionModule;
exports.AdminTenantSubscriptionModule = AdminTenantSubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => tenant_subscription_module_1.TenantSubscriptionModule)],
        controllers: [admin_tenant_subscription_controller_1.AdminTenantSubscriptionController],
        providers: [admin_tenant_subscription_service_1.AdminTenantSubscriptionService],
        exports: [admin_tenant_subscription_service_1.AdminTenantSubscriptionService],
    })
], AdminTenantSubscriptionModule);
//# sourceMappingURL=admin-tenant-subscription.module.js.map
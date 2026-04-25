"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverTenantSubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const driver_tenant_subscription_controller_1 = require("./driver-tenant-subscription.controller");
const driver_tenant_subscription_service_1 = require("./driver-tenant-subscription.service");
const tenant_subscription_module_1 = require("../../core/tenant-subscription/tenant-subscription.module");
let DriverTenantSubscriptionModule = class DriverTenantSubscriptionModule {
};
exports.DriverTenantSubscriptionModule = DriverTenantSubscriptionModule;
exports.DriverTenantSubscriptionModule = DriverTenantSubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => tenant_subscription_module_1.TenantSubscriptionModule)],
        controllers: [driver_tenant_subscription_controller_1.DriverTenantSubscriptionController],
        providers: [driver_tenant_subscription_service_1.DriverTenantSubscriptionService],
        exports: [driver_tenant_subscription_service_1.DriverTenantSubscriptionService],
    })
], DriverTenantSubscriptionModule);
//# sourceMappingURL=driver-tenant-subscription.module.js.map
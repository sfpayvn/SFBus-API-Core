"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserDriverModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../../core/user/user/schema/user.schema");
const user_driver_module_1 = require("../../../core/user/user-driver/user-driver.module");
const admin_user_driver_controller_1 = require("./admin-user-driver.controller");
const admin_user_driver_service_1 = require("./admin-user-driver.service");
const interceptors_module_1 = require("../../../../interceptors/interceptors.module");
const tenant_subscription_usage_module_1 = require("../../../core/tenant-subscription-usage/tenant-subscription-usage.module");
let AdminUserDriverModule = class AdminUserDriverModule {
};
exports.AdminUserDriverModule = AdminUserDriverModule;
exports.AdminUserDriverModule = AdminUserDriverModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.UserDocument.name, schema: user_schema_1.UserSchema }]),
            (0, common_1.forwardRef)(() => user_driver_module_1.UserDriverModule),
            interceptors_module_1.InterceptorModule,
            tenant_subscription_usage_module_1.TenantSubscriptionUsageModule,
        ],
        providers: [admin_user_driver_service_1.AdminUserDriverService],
        controllers: [admin_user_driver_controller_1.AdminUserDriverController],
        exports: [admin_user_driver_service_1.AdminUserDriverService],
    })
], AdminUserDriverModule);
//# sourceMappingURL=admin-user-driver.module.js.map
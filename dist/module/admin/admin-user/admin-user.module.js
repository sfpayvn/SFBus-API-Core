"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModule = void 0;
const common_1 = require("@nestjs/common");
const admin_user_client_module_1 = require("./admin-user-client/admin-user-client.module");
const admin_user_pos_module_1 = require("./admin-user-pos/admin-user-pos.module");
const admin_user_tenant_module_1 = require("./admin-user-tenant/admin-user-tenant.module");
const admin_user_tenant_operator_module_1 = require("./admin-user-tenant-operator/admin-user-tenant-operator.module");
const admin_user_driver_module_1 = require("./admin-user-driver/admin-user-driver.module");
const admin_user_main_module_1 = require("./admin-user-main/admin-user-main.module");
let AdminUserModule = class AdminUserModule {
};
exports.AdminUserModule = AdminUserModule;
exports.AdminUserModule = AdminUserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_user_main_module_1.AdminUserMainModule,
            admin_user_pos_module_1.AdminUserPosModule,
            admin_user_client_module_1.AdminUserClientModule,
            admin_user_driver_module_1.AdminUserDriverModule,
            admin_user_tenant_module_1.AdminUserTenantModule,
            admin_user_tenant_operator_module_1.AdminUserTenantOperatorModule,
        ],
        exports: [
            admin_user_main_module_1.AdminUserMainModule,
            admin_user_pos_module_1.AdminUserPosModule,
            admin_user_client_module_1.AdminUserClientModule,
            admin_user_driver_module_1.AdminUserDriverModule,
            admin_user_tenant_module_1.AdminUserTenantModule,
            admin_user_tenant_operator_module_1.AdminUserTenantOperatorModule,
        ],
    })
], AdminUserModule);
//# sourceMappingURL=admin-user.module.js.map
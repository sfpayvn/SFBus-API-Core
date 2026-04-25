"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const tenant_controller_1 = require("./tenant.controller");
const tenant_service_1 = require("./tenant.service");
const tenant_schema_1 = require("./schema/tenant.schema");
const tenant_subscription_module_1 = require("../tenant-subscription/tenant-subscription.module");
const file_module_1 = require("../file/file/file.module");
const user_module_1 = require("../user/user/user.module");
const subscription_module_1 = require("../subscription/subscription.module");
const settings_module_1 = require("../settings/settings.module");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tenant_schema_1.TenantDocument.name, schema: tenant_schema_1.TenantSchema }]),
            (0, common_1.forwardRef)(() => tenant_subscription_module_1.TenantSubscriptionModule),
            (0, common_1.forwardRef)(() => file_module_1.FileModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => subscription_module_1.SubscriptionModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map
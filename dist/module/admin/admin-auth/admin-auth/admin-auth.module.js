"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const admin_auth_service_1 = require("./admin-auth.service");
const jwt_1 = require("@nestjs/jwt");
const admin_auth_controller_1 = require("./admin-auth.controller");
const config_1 = require("@nestjs/config");
const local_strategy_1 = require("../../../../jwt/local.strategy");
const jwt_strategy_1 = require("../../../../jwt/jwt.strategy");
const admin_user_main_module_1 = require("../../admin-user/admin-user-main/admin-user-main.module");
const admin_tenant_module_1 = require("../../admin-tenant/admin-tenant.module");
const user_module_1 = require("../../../core/user/user/user.module");
const auth_module_1 = require("../../../core/auth/auth/auth.module");
const auto_job_tracking_1 = require("../../../core/auto-job-tracking");
const admin_bus_schedule_autogenerator_module_1 = require("../../admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.module");
const settings_module_1 = require("../../../core/settings/settings.module");
let AdminAuthModule = class AdminAuthModule {
};
exports.AdminAuthModule = AdminAuthModule;
exports.AdminAuthModule = AdminAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auto_job_tracking_1.AutoJobTrackingModule),
            (0, common_1.forwardRef)(() => admin_user_main_module_1.AdminUserMainModule),
            (0, common_1.forwardRef)(() => admin_tenant_module_1.AdminTenantModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
            (0, common_1.forwardRef)(() => passport_1.PassportModule),
            (0, common_1.forwardRef)(() => admin_bus_schedule_autogenerator_module_1.AdminBusScheduleAutogeneratorModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1y' },
                }),
            }),
        ],
        providers: [admin_auth_service_1.AdminAuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [admin_auth_controller_1.AuthController],
    })
], AdminAuthModule);
//# sourceMappingURL=admin-auth.module.js.map
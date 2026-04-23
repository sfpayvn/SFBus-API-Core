"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverAuthRescueModule = void 0;
const common_1 = require("@nestjs/common");
const driver_auth_rescue_controller_1 = require("./driver-auth-rescue.controller");
const driver_auth_rescue_service_1 = require("./driver-auth-rescue.service");
const auth_rescue_module_1 = require("../../../core/auth/auth-rescue/auth-rescue.module");
const driver_tenant_module_1 = require("../../driver-tenant/driver-tenant.module");
const driver_user_module_1 = require("../../driver-user/driver-user-main/driver-user.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let DriverAuthRescueModule = class DriverAuthRescueModule {
};
exports.DriverAuthRescueModule = DriverAuthRescueModule;
exports.DriverAuthRescueModule = DriverAuthRescueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_rescue_module_1.AuthRescueModule),
            (0, common_1.forwardRef)(() => driver_tenant_module_1.DriverTenantModule),
            (0, common_1.forwardRef)(() => driver_user_module_1.DriverUserModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1y' },
                }),
            }),
        ],
        providers: [driver_auth_rescue_service_1.DriverAuthRescueService],
        controllers: [driver_auth_rescue_controller_1.DriverAuthRescueController],
        exports: [driver_auth_rescue_service_1.DriverAuthRescueService],
    })
], DriverAuthRescueModule);
//# sourceMappingURL=driver-auth-rescue.module.js.map
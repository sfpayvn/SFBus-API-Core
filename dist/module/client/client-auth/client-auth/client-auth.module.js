"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const client_auth_service_1 = require("./client-auth.service");
const jwt_1 = require("@nestjs/jwt");
const client_auth_controller_1 = require("./client-auth.controller");
const config_1 = require("@nestjs/config");
const local_strategy_1 = require("../../../../jwt/local.strategy");
const jwt_strategy_1 = require("../../../../jwt/jwt.strategy");
const client_user_module_1 = require("../../client-user/client-user-main/client-user.module");
const client_tenant_module_1 = require("../../client-tenant/client-tenant.module");
const user_module_1 = require("../../../core/user/user/user.module");
const auth_module_1 = require("../../../core/auth/auth/auth.module");
const client_auth_rescue_module_1 = require("../client-auth-rescue/client-auth-rescue.module");
const settings_module_1 = require("../../../core/settings/settings.module");
let ClientAuthModule = class ClientAuthModule {
};
exports.ClientAuthModule = ClientAuthModule;
exports.ClientAuthModule = ClientAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => client_user_module_1.ClientUserModule),
            (0, common_1.forwardRef)(() => client_tenant_module_1.ClientTenantModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
            (0, common_1.forwardRef)(() => passport_1.PassportModule),
            (0, common_1.forwardRef)(() => client_auth_rescue_module_1.ClientAuthRescueModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1y' },
                }),
            }),
        ],
        providers: [client_auth_service_1.ClientAuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [client_auth_controller_1.AuthController],
    })
], ClientAuthModule);
//# sourceMappingURL=client-auth.module.js.map
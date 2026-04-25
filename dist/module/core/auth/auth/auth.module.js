"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const config_1 = require("@nestjs/config");
const local_strategy_1 = require("../../../../jwt/local.strategy");
const jwt_strategy_1 = require("../../../../jwt/jwt.strategy");
const user_module_1 = require("../../user/user/user.module");
const auth_rescue_module_1 = require("../auth-rescue/auth-rescue.module");
const tenant_module_1 = require("../../tenant/tenant.module");
const settings_module_1 = require("../../settings/settings.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_rescue_module_1.AuthRescueModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
            (0, common_1.forwardRef)(() => passport_1.PassportModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1y' },
                }),
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            {
                provide: 'RESET_JWT',
                inject: [config_1.ConfigService],
                useFactory: (config) => new jwt_1.JwtService({
                    secret: config.get('RESET_JWT_SECRET'),
                    signOptions: {
                        issuer: 'your-api',
                        audience: 'password-reset',
                        expiresIn: config.get('RESET_TOKEN_TTL') ?? '15m',
                    },
                }),
            },
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, 'RESET_JWT'],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
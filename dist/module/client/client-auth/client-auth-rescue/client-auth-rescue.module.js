"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthRescueModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_auth_rescue_controller_1 = require("./client-auth-rescue.controller");
const client_auth_rescue_service_1 = require("./client-auth-rescue.service");
const auth_rescue_module_1 = require("../../../core/auth/auth-rescue/auth-rescue.module");
const client_user_module_1 = require("../../client-user/client-user-main/client-user.module");
const client_tenant_module_1 = require("../../client-tenant/client-tenant.module");
let ClientAuthRescueModule = class ClientAuthRescueModule {
};
exports.ClientAuthRescueModule = ClientAuthRescueModule;
exports.ClientAuthRescueModule = ClientAuthRescueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_rescue_module_1.AuthRescueModule),
            (0, common_1.forwardRef)(() => client_user_module_1.ClientUserModule),
            (0, common_1.forwardRef)(() => client_tenant_module_1.ClientTenantModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'defaultSecret',
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '30d' },
            }),
        ],
        providers: [client_auth_rescue_service_1.ClientAuthRescueService],
        controllers: [client_auth_rescue_controller_1.ClientAuthRescueController],
        exports: [client_auth_rescue_service_1.ClientAuthRescueService],
    })
], ClientAuthRescueModule);
//# sourceMappingURL=client-auth-rescue.module.js.map
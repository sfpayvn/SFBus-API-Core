"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthRescueService = void 0;
const auth_rescue_service_1 = require("../../../core/auth/auth-rescue/auth-rescue.service");
const auth_rescue_schema_1 = require("../../../core/auth/auth-rescue/schema/auth-rescue.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_user_service_1 = require("../../client-user/client-user-main/client-user.service");
const jwt_1 = require("@nestjs/jwt");
const client_tenant_service_1 = require("../../client-tenant/client-tenant.service");
let ClientAuthRescueService = class ClientAuthRescueService {
    constructor(authRescueModel, authRescueService, clientUserService, clientTenantService, jwtService) {
        this.authRescueModel = authRescueModel;
        this.authRescueService = authRescueService;
        this.clientUserService = clientUserService;
        this.clientTenantService = clientTenantService;
        this.jwtService = jwtService;
    }
    async requestAuthRescue(identifier, tenantCode, purpose) {
        const tenant = await this.clientTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.ForbiddenException('Tenant not found');
        }
        return this.authRescueService.requestAuthRescue(identifier, purpose, tenant._id);
    }
    async verifyAuthRescueAndLogin(identifier, tenantCode, purpose, token) {
        const tenant = await this.clientTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.ForbiddenException('Tenant not found');
        }
        const isValid = await this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
        if (isValid) {
            const user = await this.clientUserService.findByPhoneNumber(identifier, tenant._id);
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            const payload = {
                _id: user._id.toString(),
                roles: user.roles,
                tenantId: user.tenantId?.toString(),
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
    }
    async verifyAuthRescue(identifier, tenantCode, purpose, token) {
        const tenant = await this.clientTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.ForbiddenException('Tenant not found');
        }
        return this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
    }
};
exports.ClientAuthRescueService = ClientAuthRescueService;
exports.ClientAuthRescueService = ClientAuthRescueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_rescue_schema_1.AuthRescueDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_rescue_service_1.AuthRescueService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_user_service_1.ClientUserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_tenant_service_1.ClientTenantService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_rescue_service_1.AuthRescueService,
        client_user_service_1.ClientUserService,
        client_tenant_service_1.ClientTenantService,
        jwt_1.JwtService])
], ClientAuthRescueService);
//# sourceMappingURL=client-auth-rescue.service.js.map
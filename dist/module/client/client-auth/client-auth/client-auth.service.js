"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_user_service_1 = require("../../client-user/client-user-main/client-user.service");
const client_user_dto_1 = require("../../client-user/client-user-main/dto/client-user.dto");
const client_tenant_service_1 = require("../../client-tenant/client-tenant.service");
const auth_service_1 = require("../../../core/auth/auth/auth.service");
const crypto = __importStar(require("crypto"));
const client_auth_rescue_service_1 = require("../client-auth-rescue/client-auth-rescue.service");
const class_transformer_1 = require("class-transformer");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const settings_service_1 = require("../../../core/settings/settings.service");
let ClientAuthService = class ClientAuthService {
    constructor(clientUserService, clientTenantService, authService, clientAuthRescueService, settingsService, jwtService) {
        this.clientUserService = clientUserService;
        this.clientTenantService = clientTenantService;
        this.authService = authService;
        this.clientAuthRescueService = clientAuthRescueService;
        this.settingsService = settingsService;
        this.jwtService = jwtService;
    }
    async login(clientUser) {
        const clientUserDocument = await this.clientUserService.findById(clientUser._id, clientUser.tenantId);
        let tokenVersion = clientUserDocument?.tokenVersion ?? 0;
        if (tokenVersion === 0) {
            tokenVersion = 1;
            await this.clientUserService.updateUserField(clientUser._id, 'tokenVersion', tokenVersion, clientUser.tenantId);
        }
        const appVersion = await this.settingsService.getAppVersion(clientUser.tenantId);
        const payload = {
            _id: clientUser._id.toString(),
            roles: clientUser.roles,
            tenantId: clientUser.tenantId?.toString(),
            tokenVersion: tokenVersion,
            appVersion: appVersion,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signUp(phoneNumber, tenantCode) {
        const tenant = await this.clientTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant không tồn tại.');
        }
        const user2Create = {
            name: '',
            phoneNumber: phoneNumber,
            password: crypto.randomBytes(32).toString('hex'),
            roles: [roles_constants_1.ROLE_CONSTANTS.CLIENT],
            tenantId: tenant._id,
            avatarId: '',
            gender: 'other',
            email: '',
            isTempPassWord: true,
            isEmailVerified: false,
            isPhoneNumberVerified: false,
            resetTokenVersion: 0,
        };
        const user = await this.clientUserService.create(user2Create, tenant._id);
        if (!user) {
            throw new common_1.UnauthorizedException('Đăng ký không thành công.');
        }
        return { phoneNumber: user.phoneNumber };
    }
    async verifyPhoneNumber(phoneNumber, tenantCode) {
        const tenant = await this.clientTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant không tồn tại.');
        }
        const user = await this.clientUserService.findByPhoneNumber(phoneNumber, tenant._id);
        if (!user) {
            return null;
        }
        return {
            name: user.name,
            isTempPassWord: user.isTempPassWord,
        };
    }
    async verifyForgotPasswordOtp(identifier, tenantCode, purpose, token) {
        const result = await this.clientAuthRescueService.verifyAuthRescue(identifier, tenantCode, purpose, token);
        if (result) {
            const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
            return { token: tokenForgotPassword };
        }
        return null;
    }
    async forgotPassword(phoneNumber, redirectBaseUrl) {
        const tenant = await this.clientTenantService.findByPhoneNumber(phoneNumber);
        if (!tenant || !tenant.code) {
            throw new common_1.UnauthorizedException('Số điện thoại không tồn tại.');
        }
        return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
    }
    resetPassword(token, newPassword) {
        return this.authService.resetPassword(token, newPassword);
    }
    async updatePassword(userId, clientUpdatePasswordUserDto, tenantId) {
        return this.clientUserService.updatePassword(userId, clientUpdatePasswordUserDto, tenantId);
    }
    async getCurrentUser(userId, tenantId, tokenVersion) {
        const foundUser = await this.clientUserService.findById(userId, tenantId);
        if (!foundUser) {
            throw new common_1.BadRequestException('User not found.');
        }
        if ((foundUser.tokenVersion ?? 0) !== (tokenVersion ?? 0)) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        return (0, class_transformer_1.plainToInstance)(client_user_dto_1.ClientUserDto, foundUser);
    }
};
exports.ClientAuthService = ClientAuthService;
exports.ClientAuthService = ClientAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_user_service_1.ClientUserService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_tenant_service_1.ClientTenantService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [client_user_service_1.ClientUserService,
        client_tenant_service_1.ClientTenantService,
        auth_service_1.AuthService,
        client_auth_rescue_service_1.ClientAuthRescueService,
        settings_service_1.SettingsService,
        jwt_1.JwtService])
], ClientAuthService);
//# sourceMappingURL=client-auth.service.js.map
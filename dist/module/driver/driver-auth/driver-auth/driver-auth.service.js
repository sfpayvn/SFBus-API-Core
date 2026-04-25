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
exports.DriverAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const driver_user_service_1 = require("../../driver-user/driver-user-main/driver-user.service");
const driver_user_dto_1 = require("../../driver-user/driver-user-main/dto/driver-user.dto");
const driver_tenant_service_1 = require("../../driver-tenant/driver-tenant.service");
const auth_service_1 = require("../../../core/auth/auth/auth.service");
const driver_auth_rescue_service_1 = require("../driver-auth-rescue/driver-auth-rescue.service");
const class_transformer_1 = require("class-transformer");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const settings_service_1 = require("../../../core/settings/settings.service");
let DriverAuthService = class DriverAuthService {
    constructor(driverUserService, driverTenantService, authService, driverAuthRescueService, settingsService, jwtService) {
        this.driverUserService = driverUserService;
        this.driverTenantService = driverTenantService;
        this.authService = authService;
        this.driverAuthRescueService = driverAuthRescueService;
        this.settingsService = settingsService;
        this.jwtService = jwtService;
    }
    async login(driverUser) {
        const allowedRoles = [
            roles_constants_1.ROLE_CONSTANTS.TENANT,
            roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR,
            roles_constants_1.ROLE_CONSTANTS.DRIVER,
            roles_constants_1.ROLE_CONSTANTS.POS,
        ];
        if (!driverUser.roles.some((role) => allowedRoles.includes(role))) {
            throw new common_1.UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
        }
        const driverUserDocument = await this.driverUserService.findById(driverUser._id, driverUser.tenantId);
        let tokenVersion = driverUserDocument?.tokenVersion ?? 0;
        if (tokenVersion === 0) {
            tokenVersion = 1;
            await this.driverUserService.updateUserField(driverUser._id, 'tokenVersion', tokenVersion, driverUser.tenantId);
        }
        const appVersion = await this.settingsService.getAppVersion(driverUser.tenantId);
        const payload = {
            _id: driverUser._id.toString(),
            roles: driverUser.roles,
            tenantId: driverUser.tenantId?.toString(),
            tokenVersion: tokenVersion,
            appVersion: appVersion,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async verifyPhoneNumber(phoneNumber) {
        const user = await this.driverUserService.findByPhoneNumber(phoneNumber);
        if (user) {
            return user.name;
        }
        return null;
    }
    async verifyForgotPasswordOtp(identifier, tenantCode, purpose, token) {
        const tenant = await this.driverTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant not found');
        }
        const result = await this.driverAuthRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
        if (result) {
            const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
            return { token: tokenForgotPassword };
        }
        return null;
    }
    async forgotPassword(phoneNumber, tenantCode, redirectBaseUrl) {
        const tenant = await this.driverTenantService.findByCode(tenantCode);
        if (!tenant || !tenant.code) {
            throw new common_1.UnauthorizedException('Số điện thoại không tồn tại.');
        }
        return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
    }
    resetPassword(token, newPassword) {
        return this.authService.resetPassword(token, newPassword);
    }
    async updatePassword(userId, driverUpdatePasswordUserDto, tenantId) {
        return this.driverUserService.updatePassword(userId, driverUpdatePasswordUserDto, tenantId);
    }
    async getCurrentUser(userId, tenantId, tokenVersion) {
        const foundUser = await this.driverUserService.findById(userId, tenantId);
        if (!foundUser) {
            throw new common_1.BadRequestException('User not found.');
        }
        if ((foundUser.tokenVersion ?? 0) !== (tokenVersion ?? 0)) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        return (0, class_transformer_1.plainToInstance)(driver_user_dto_1.DriverUserDto, foundUser);
    }
};
exports.DriverAuthService = DriverAuthService;
exports.DriverAuthService = DriverAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_user_service_1.DriverUserService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_tenant_service_1.DriverTenantService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_auth_rescue_service_1.DriverAuthRescueService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [driver_user_service_1.DriverUserService,
        driver_tenant_service_1.DriverTenantService,
        auth_service_1.AuthService,
        driver_auth_rescue_service_1.DriverAuthRescueService,
        settings_service_1.SettingsService,
        jwt_1.JwtService])
], DriverAuthService);
//# sourceMappingURL=driver-auth.service.js.map
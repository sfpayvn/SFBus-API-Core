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
exports.PosAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const pos_user_service_1 = require("../../pos-user/pos-user-main/pos-user.service");
const pos_user_dto_1 = require("../../pos-user/pos-user-main/dto/pos-user.dto");
const auth_service_1 = require("../../../core/auth/auth/auth.service");
const pos_auth_rescue_service_1 = require("../pos-auth-rescue/pos-auth-rescue.service");
const class_transformer_1 = require("class-transformer");
const pos_tenant_service_1 = require("../../pos-tenant/pos-tenant.service");
const auto_job_tracking_1 = require("../../../core/auto-job-tracking");
const pos_bus_schedule_autogenerator_service_1 = require("../../pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.service");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const settings_service_1 = require("../../../core/settings/settings.service");
let PosAuthService = class PosAuthService {
    constructor(posUserService, posTenantService, authService, autoJobTrackingService, posBusScheduleAutogeneratorService, settingsService, posAuthRescueService, jwtService) {
        this.posUserService = posUserService;
        this.posTenantService = posTenantService;
        this.authService = authService;
        this.autoJobTrackingService = autoJobTrackingService;
        this.posBusScheduleAutogeneratorService = posBusScheduleAutogeneratorService;
        this.settingsService = settingsService;
        this.posAuthRescueService = posAuthRescueService;
        this.jwtService = jwtService;
    }
    async tryAutoScheduleJobs(posUser, timezoneOffset) {
        const isRun = await this.autoJobTrackingService.tryRunToday(posUser.tenantId, 'auto_schedule', timezoneOffset);
        if (isRun) {
            this.posBusScheduleAutogeneratorService
                .generateSchedulesForToday(posUser.tenantId, timezoneOffset)
                .catch((err) => {
            });
        }
    }
    async login(posUser) {
        const allowedRoles = [
            roles_constants_1.ROLE_CONSTANTS.POS,
            roles_constants_1.ROLE_CONSTANTS.ADMIN,
            roles_constants_1.ROLE_CONSTANTS.TENANT,
            roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR,
        ];
        if (!posUser.roles.some((role) => allowedRoles.includes(role))) {
            throw new common_1.UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
        }
        const posUserDocument = await this.posUserService.findById(posUser._id, posUser.tenantId);
        let tokenVersion = posUserDocument?.tokenVersion ?? 0;
        if (tokenVersion === 0) {
            tokenVersion = 1;
            await this.posUserService.updateUserField(posUser._id, 'tokenVersion', tokenVersion, posUser.tenantId);
        }
        const appVersion = await this.settingsService.getAppVersion(posUser.tenantId);
        const payload = {
            _id: posUser._id.toString(),
            roles: posUser.roles,
            tenantId: posUser.tenantId?.toString(),
            tokenVersion: tokenVersion,
            appVersion: appVersion,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async verifyPhoneNumber(phoneNumber) {
        const user = await this.posUserService.findByPhoneNumber(phoneNumber);
        if (user) {
            return user.name;
        }
        return null;
    }
    async verifyForgotPasswordOtp(identifier, tenantCode, purpose, token) {
        const tenant = await this.posTenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant not found');
        }
        const result = await this.posAuthRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
        if (result) {
            const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
            return { token: tokenForgotPassword };
        }
        return null;
    }
    async forgotPassword(phoneNumber, tenantCode, redirectBaseUrl) {
        const tenant = await this.posTenantService.findByCode(phoneNumber);
        if (!tenant || !tenant.code) {
            throw new common_1.UnauthorizedException('Số điện thoại không tồn tại.');
        }
        return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
    }
    resetPassword(token, newPassword) {
        return this.authService.resetPassword(token, newPassword);
    }
    async updatePassword(userId, posUpdatePasswordUserDto, tenantId) {
        return this.posUserService.updatePassword(userId, posUpdatePasswordUserDto, tenantId);
    }
    async getCurrentUser(userId, tenantId, tokenVersion) {
        const foundUser = await this.posUserService.findById(userId, tenantId);
        if (!foundUser) {
            throw new common_1.BadRequestException('User not found.');
        }
        if ((foundUser.tokenVersion ?? 0) !== (tokenVersion ?? 0)) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        return (0, class_transformer_1.plainToInstance)(pos_user_dto_1.PosUserDto, foundUser);
    }
    async logout(userId, tenantId) {
        const user = await this.posUserService.findById(userId, tenantId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const newTokenVersion = (user.tokenVersion ?? 0) + 1;
        await this.posUserService.updateUserField(userId, 'tokenVersion', newTokenVersion, tenantId);
        return { ok: true };
    }
    async forceLogoutUser(userId, tenantId) {
        const user = await this.posUserService.findById(userId, tenantId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const newTokenVersion = (user.tokenVersion ?? 0) + 1;
        await this.posUserService.updateUserField(userId, 'tokenVersion', newTokenVersion, tenantId);
        return { ok: true, message: `User ${user.name} has been logged out` };
    }
};
exports.PosAuthService = PosAuthService;
exports.PosAuthService = PosAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => pos_user_service_1.PosUserService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pos_tenant_service_1.PosTenantService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auto_job_tracking_1.AutoJobTrackingService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => pos_bus_schedule_autogenerator_service_1.PosBusScheduleAutogeneratorService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [pos_user_service_1.PosUserService,
        pos_tenant_service_1.PosTenantService,
        auth_service_1.AuthService,
        auto_job_tracking_1.AutoJobTrackingService,
        pos_bus_schedule_autogenerator_service_1.PosBusScheduleAutogeneratorService,
        settings_service_1.SettingsService,
        pos_auth_rescue_service_1.PosAuthRescueService,
        jwt_1.JwtService])
], PosAuthService);
//# sourceMappingURL=pos-auth.service.js.map
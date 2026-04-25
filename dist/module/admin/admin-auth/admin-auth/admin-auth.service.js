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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_user_main_service_1 = require("../../admin-user/admin-user-main/admin-user-main.service");
const admin_user_dto_1 = require("../../admin-user/admin-user-main/dto/admin-user.dto");
const admin_tenant_service_1 = require("../../admin-tenant/admin-tenant.service");
const auth_service_1 = require("../../../core/auth/auth/auth.service");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const auto_job_tracking_1 = require("../../../core/auto-job-tracking");
const admin_bus_schedule_autogenerator_service_1 = require("../../admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.service");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const settings_service_1 = require("../../../core/settings/settings.service");
let AdminAuthService = class AdminAuthService {
    constructor(adminUserMainService, adminTenantService, authService, autoJobTrackingService, adminBusScheduleAutogeneratorService, settingsService, jwtService) {
        this.adminUserMainService = adminUserMainService;
        this.adminTenantService = adminTenantService;
        this.authService = authService;
        this.autoJobTrackingService = autoJobTrackingService;
        this.adminBusScheduleAutogeneratorService = adminBusScheduleAutogeneratorService;
        this.settingsService = settingsService;
        this.jwtService = jwtService;
    }
    async tryAutoScheduleJobs(adminUser, timezoneOffset) {
        const isRun = await this.autoJobTrackingService.tryRunToday(adminUser.tenantId, 'auto_schedule', timezoneOffset);
        if (isRun) {
            this.adminBusScheduleAutogeneratorService
                .generateSchedulesForToday(adminUser.tenantId, timezoneOffset)
                .catch((err) => {
            });
        }
    }
    async login(adminUser) {
        const allowedRoles = [roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.ADMIN];
        if (!adminUser.roles.some((role) => allowedRoles.includes(role))) {
            throw new common_1.UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
        }
        const adminUserDocument = await this.adminUserMainService.findById(adminUser._id, adminUser.tenantId);
        let tokenVersion = adminUserDocument?.tokenVersion ?? 0;
        if (tokenVersion === 0) {
            tokenVersion = 1;
            await this.adminUserMainService.updateUserField(adminUser._id, 'tokenVersion', tokenVersion, adminUser.tenantId);
        }
        const appVersion = await this.settingsService.getAppVersion(adminUser.tenantId);
        const payload = {
            _id: adminUser._id.toString(),
            roles: adminUser.roles,
            tenantId: adminUser.tenantId?.toString(),
            tokenVersion: tokenVersion,
            appVersion: appVersion,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signUp(adminSignUpDto) {
        const valid = await this.adminTenantService.validateTenant(adminSignUpDto.phoneNumber);
        if (valid) {
            throw new common_1.UnauthorizedException('Tenant đã tồn tại.');
        }
        const tenantId = new mongoose_1.Types.ObjectId();
        const user2Create = {
            name: adminSignUpDto.tenantName,
            phoneNumber: adminSignUpDto.phoneNumber,
            password: adminSignUpDto.password,
            roles: ['tenant'],
            tenantId: tenantId,
            avatarId: '',
            gender: 'other',
            email: '',
            isTempPassWord: true,
            isEmailVerified: false,
            isPhoneNumberVerified: false,
            resetTokenVersion: 0,
        };
        const user = await this.adminUserMainService.create(user2Create);
        const tenant2Create = {
            name: adminSignUpDto.tenantName,
            code: adminSignUpDto.tenantCode,
            phoneNumber: adminSignUpDto.phoneNumber,
            setting: {
                appearance: 'default',
                timezone: 'UTC',
            },
            status: 'active',
        };
        const tenant = await this.adminTenantService.create({
            ...tenant2Create,
            _id: tenantId,
        });
        if (!tenant) {
            throw new common_1.UnauthorizedException('Đăng ký không thành công.');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Đăng ký không thành công.');
        }
        return this.login(user);
    }
    async verifyPhoneNumber(phoneNumber) {
        const user = await this.adminUserMainService.findByPhoneNumber(phoneNumber);
        if (user) {
            return user.name;
        }
        return null;
    }
    async forgotPassword(phoneNumber, redirectBaseUrl) {
        const tenant = await this.adminTenantService.findByPhoneNumber(phoneNumber);
        if (!tenant || !tenant.code) {
            throw new common_1.UnauthorizedException('Số điện thoại không tồn tại.');
        }
        return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
    }
    resetPassword(token, newPassword) {
        return this.authService.resetPassword(token, newPassword);
    }
    async updatePassword(userId, adminUpdatePasswordUserDto, tenantId) {
        return this.adminUserMainService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
    }
    async getCurrentUser(userId, tenantId, tokenVersion) {
        const foundUser = await this.adminUserMainService.findById(userId, tenantId);
        if (!foundUser) {
            throw new common_1.BadRequestException('User not found.');
        }
        if ((foundUser.tokenVersion ?? 0) !== (tokenVersion ?? 0)) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        const tenant = await this.adminTenantService.findOne(tenantId);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant không tồn tại.');
        }
        Object.assign(foundUser, { tenant: tenant });
        return (0, class_transformer_1.plainToInstance)(admin_user_dto_1.AdminUserDto, foundUser);
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => admin_user_main_service_1.AdminUserMainService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => admin_tenant_service_1.AdminTenantService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auto_job_tracking_1.AutoJobTrackingService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => admin_bus_schedule_autogenerator_service_1.AdminBusScheduleAutogeneratorService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [admin_user_main_service_1.AdminUserMainService,
        admin_tenant_service_1.AdminTenantService,
        auth_service_1.AuthService,
        auto_job_tracking_1.AutoJobTrackingService,
        admin_bus_schedule_autogenerator_service_1.AdminBusScheduleAutogeneratorService,
        settings_service_1.SettingsService,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map
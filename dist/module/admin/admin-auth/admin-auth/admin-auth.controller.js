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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_auth_guard_ts_1 = require("../../../../guards/local-auth.guard.ts");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const admin_auth_dto_1 = require("./dto/admin-auth.dto");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const admin_auth_service_1 = require("./admin-auth.service");
const roles_guard_1 = require("../../../../guards/roles.guard");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const admin_update_user_dto_1 = require("../../admin-user/admin-user-main/dto/admin-update-user.dto");
const timezone_decorator_1 = require("../../../../decorators/timezone.decorator");
let AuthController = class AuthController {
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async login(req, timezoneOffset) {
        this.adminAuthService.tryAutoScheduleJobs(req.user, timezoneOffset).catch(() => {
        });
        return this.adminAuthService.login(req.user);
    }
    async signUp(adminSignUpDto) {
        return this.adminAuthService.signUp(adminSignUpDto);
    }
    async verifyPhoneNumber(phoneNumber) {
        const name = await this.adminAuthService.verifyPhoneNumber(phoneNumber);
        return JSON.stringify(name);
    }
    async validateToken(req) {
        return { valid: true, user: req.user };
    }
    async forgotPassword(adminForgotPasswordDto) {
        return this.adminAuthService.forgotPassword(adminForgotPasswordDto.phoneNumber, adminForgotPasswordDto.redirectBaseUrl);
    }
    async reset(adminResetPasswordDto) {
        return this.adminAuthService.resetPassword(adminResetPasswordDto.token, adminResetPasswordDto.newPassword);
    }
    async updatePassword(user, adminUpdatePasswordUserDto) {
        const { tenantId, _id } = user;
        const result = await this.adminAuthService.updatePassword(_id, adminUpdatePasswordUserDto, tenantId);
        return result;
    }
    async getCurrentUser(user) {
        const { tenantId, _id: userId, tokenVersion } = user;
        return this.adminAuthService.getCurrentUser(userId, tenantId, tokenVersion);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_ts_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_auth_dto_1.AdminSignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('verify-phoneNumber'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPhoneNumber", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('validate-token'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_auth_dto_1.AdminForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_auth_dto_1.AdminResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        admin_update_user_dto_1.AdminUpdatePasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('get-current-user'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('admin/auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService])
], AuthController);
//# sourceMappingURL=admin-auth.controller.js.map
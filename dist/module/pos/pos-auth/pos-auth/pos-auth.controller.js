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
const pos_auth_dto_1 = require("./dto/pos-auth.dto");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const pos_auth_service_1 = require("./pos-auth.service");
const pos_auth_rescue_dto_1 = require("../pos-auth-rescue/dto/pos-auth-rescue.dto");
const roles_guard_1 = require("../../../../guards/roles.guard");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const pos_update_user_dto_1 = require("../../pos-user/pos-user-main/dto/pos-update-user.dto");
const timezone_decorator_1 = require("../../../../decorators/timezone.decorator");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const mongoose_1 = require("mongoose");
let AuthController = class AuthController {
    constructor(posAuthService) {
        this.posAuthService = posAuthService;
    }
    async login(req, timezoneOffset) {
        this.posAuthService.tryAutoScheduleJobs(req.user, timezoneOffset).catch(() => {
        });
        return this.posAuthService.login(req.user);
    }
    async verifyPhoneNumber(phoneNumber) {
        const name = await this.posAuthService.verifyPhoneNumber(phoneNumber);
        return JSON.stringify(name);
    }
    async validateToken(req) {
        return { valid: true, user: req.user };
    }
    async verifyForgotPasswordOtp(posVerifyAuthRescueDto) {
        return this.posAuthService.verifyForgotPasswordOtp(posVerifyAuthRescueDto.identifier, posVerifyAuthRescueDto.tenantCode, posVerifyAuthRescueDto.purpose, posVerifyAuthRescueDto.token);
    }
    async forgotPassword(posForgotPasswordDto) {
        return this.posAuthService.forgotPassword(posForgotPasswordDto.phoneNumber, posForgotPasswordDto.tenantCode, posForgotPasswordDto.redirectBaseUrl);
    }
    async reset(PosResetPasswordDto) {
        return this.posAuthService.resetPassword(PosResetPasswordDto.token, PosResetPasswordDto.newPassword);
    }
    async updatePassword(user, posUpdatePasswordUserDto) {
        const { tenantId, _id } = user;
        const updatedUser = await this.posAuthService.updatePassword(_id, posUpdatePasswordUserDto, tenantId);
        return {
            message: 'Cập nhật thông tin thành công!',
            user: {
                email: updatedUser.email,
                name: updatedUser.name,
            },
        };
    }
    async getCurrentUser(user) {
        const { tenantId, _id: userId, tokenVersion } = user;
        return this.posAuthService.getCurrentUser(userId, tenantId, tokenVersion);
    }
    async logout(user) {
        return this.posAuthService.logout(user._id, user.tenantId);
    }
    async forceLogout(userId, user) {
        return this.posAuthService.forceLogoutUser(userId, user.tenantId);
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
    (0, common_1.Post)('verify-forgot-password-otp'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_auth_rescue_dto_1.PosVerifyAuthRescueDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_auth_dto_1.PosForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_auth_dto_1.PosResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        pos_update_user_dto_1.PosUpdatePasswordUserDto]),
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
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT),
    (0, common_1.Post)('force-logout/:userId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('userId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forceLogout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('pos/auth'),
    __metadata("design:paramtypes", [pos_auth_service_1.PosAuthService])
], AuthController);
//# sourceMappingURL=pos-auth.controller.js.map
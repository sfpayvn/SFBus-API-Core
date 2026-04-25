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
const client_auth_dto_1 = require("./dto/client-auth.dto");
const client_auth_service_1 = require("./client-auth.service");
const client_auth_rescue_dto_1 = require("../client-auth-rescue/dto/client-auth-rescue.dto");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const roles_guard_1 = require("../../../../guards/roles.guard");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const client_update_user_dto_1 = require("../../client-user/client-user-main/dto/client-update-user.dto");
let AuthController = class AuthController {
    constructor(clientAuthService) {
        this.clientAuthService = clientAuthService;
    }
    async login(req) {
        return this.clientAuthService.login(req.user);
    }
    async signUp(phoneNumber, tenantCode) {
        return this.clientAuthService.signUp(phoneNumber, tenantCode);
    }
    async verifyPhoneNumber(phoneNumber, tenantCode) {
        return this.clientAuthService.verifyPhoneNumber(phoneNumber, tenantCode);
    }
    async validateToken(req) {
        return { valid: true, user: req.user };
    }
    async verifyForgotPasswordOtp(clientVerifyAuthRescueDto, tenantCode) {
        return this.clientAuthService.verifyForgotPasswordOtp(clientVerifyAuthRescueDto.identifier, tenantCode, clientVerifyAuthRescueDto.purpose, clientVerifyAuthRescueDto.token);
    }
    async forgotPassword(ClientForgotPasswordDto) {
        return this.clientAuthService.forgotPassword(ClientForgotPasswordDto.phoneNumber, ClientForgotPasswordDto.redirectBaseUrl);
    }
    async reset(ClientResetPasswordDto) {
        return this.clientAuthService.resetPassword(ClientResetPasswordDto.token, ClientResetPasswordDto.newPassword);
    }
    async updatePassword(user, clientUpdatePasswordUserDto) {
        const { tenantId, _id } = user;
        const updatedUser = await this.clientAuthService.updatePassword(_id, clientUpdatePasswordUserDto, tenantId);
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
        return this.clientAuthService.getCurrentUser(userId, tenantId, tokenVersion);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_ts_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signUp/:phoneNumber'),
    __param(0, (0, common_1.Param)('phoneNumber')),
    __param(1, (0, common_1.Headers)('x-tenant-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('verify-phoneNumber'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __param(1, (0, common_1.Headers)('x-tenant-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
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
    __param(1, (0, common_1.Headers)('x-tenant-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_rescue_dto_1.ClientVerifyAuthRescueDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_dto_1.ClientForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_dto_1.ClientResetPasswordDto]),
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
        client_update_user_dto_1.ClientUpdatePasswordUserDto]),
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
    (0, common_1.Controller)('client/auth'),
    __metadata("design:paramtypes", [client_auth_service_1.ClientAuthService])
], AuthController);
//# sourceMappingURL=client-auth.controller.js.map
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
exports.PosUserController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const pos_user_service_1 = require("./pos-user.service");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const pos_user_dto_1 = require("./dto/pos-user.dto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const roles_guard_1 = require("../../../../guards/roles.guard");
const pos_update_user_dto_1 = require("./dto/pos-update-user.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let PosUserController = class PosUserController {
    constructor(posUserService) {
        this.posUserService = posUserService;
    }
    async updateProfile(user, posUpdateUserProfileDto) {
        try {
            const { tenantId } = user;
            const updatedUser = await this.posUserService.update(posUpdateUserProfileDto, tenantId);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updatePassword(user, updatePasswordUserDto) {
        const { tenantId, _id } = user;
        const updatedUser = await this.posUserService.updatePassword(_id, updatePasswordUserDto, tenantId);
        return {
            message: 'Cập nhật mật khẩu thành công.',
            user: {
                email: updatedUser.email,
                name: updatedUser.name,
            },
        };
    }
    async updateUserField(PosRequestUpdateUserFieldDto, user) {
        const { tenantId, _id } = user;
        const { fieldName, value } = PosRequestUpdateUserFieldDto;
        return this.posUserService.updateUserField(_id, fieldName, value, tenantId);
    }
};
exports.PosUserController = PosUserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        pos_update_user_dto_1.PosUpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], PosUserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        pos_update_user_dto_1.PosUpdatePasswordUserDto]),
    __metadata("design:returntype", Promise)
], PosUserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-user-field'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_user_dto_1.PosRequestUpdateUserFieldDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosUserController.prototype, "updateUserField", null);
exports.PosUserController = PosUserController = __decorate([
    (0, common_1.Controller)('pos/users'),
    __metadata("design:paramtypes", [pos_user_service_1.PosUserService])
], PosUserController);
//# sourceMappingURL=pos-user.controller.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const user_dto_1 = require("./dto/user.dto");
const class_transformer_1 = require("class-transformer");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const roles_guard_1 = require("../../../../guards/roles.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(createUserDto) {
        try {
            const user = await this.userService.create(createUserDto);
            return {
                message: 'Đăng ký thành công!',
                user: { phoneNumber: user.phoneNumber, _id: user._id },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updatePassword(user, updatePasswordUserDto) {
        const { tenantId, _id } = user;
        const updatedUser = await this.userService.updatePassword(_id, updatePasswordUserDto, tenantId);
        return {
            message: 'Cập nhật thông tin thành công!',
            user: {
                email: updatedUser.email,
                name: updatedUser.name,
            },
        };
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.userService.findOne(id, tenantId);
    }
    findOneByRole(role, user) {
        const { tenantId } = user;
        return this.userService.findOneByRole(role, tenantId);
    }
    findAllByRole(role, user) {
        const { tenantId } = user;
        return this.userService.findAllByRole(role, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.userService.findAll(tenantId);
    }
    async getCurrentUser(user) {
        const { tenantId, _id: userId, tokenVersion } = user;
        const foundUser = await this.userService.findById(userId, tenantId);
        if (!foundUser) {
            throw new common_1.BadRequestException('User not found.');
        }
        if ((foundUser.tokenVersion ?? 0) !== (tokenVersion ?? 0)) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, foundUser);
    }
    search(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
        const { tenantId } = user;
        return this.userService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        update_user_dto_1.UpdatePasswordUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('role/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('find-all/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('get-current-user'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SearchUsersTypesQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "search", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
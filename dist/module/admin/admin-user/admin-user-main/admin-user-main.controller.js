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
exports.AdminUserMainController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const admin_create_user_dto_1 = require("./dto/admin-create-user.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const admin_user_dto_1 = require("./dto/admin-user.dto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const roles_guard_1 = require("../../../../guards/roles.guard");
const admin_update_user_dto_1 = require("./dto/admin-update-user.dto");
const mongoose_1 = require("mongoose");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const admin_user_main_service_1 = require("./admin-user-main.service");
let AdminUserMainController = class AdminUserMainController {
    constructor(adminUserMainService) {
        this.adminUserMainService = adminUserMainService;
    }
    async register(adminCreateUserDto, cUser) {
        try {
            const { tenantId } = cUser;
            return await this.adminUserMainService.create(adminCreateUserDto, tenantId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateProfile(user, adminUpdateUserProfileDto) {
        try {
            const { tenantId } = user;
            const updatedUser = await this.adminUserMainService.update(adminUpdateUserProfileDto, tenantId);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateUserField(adminRequestUpdateUserFieldDto, user) {
        const { tenantId, _id } = user;
        const { fieldName, value } = adminRequestUpdateUserFieldDto;
        return this.adminUserMainService.updateUserField(_id, fieldName, value, tenantId);
    }
    async setPasswordAsTemp(userId, body, user) {
        const { tenantId } = user;
        const { newPassword } = body;
        return this.adminUserMainService.setPasswordAsTemp(userId, newPassword, tenantId);
    }
    delete(id) {
        return this.adminUserMainService.delete(id);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.adminUserMainService.findOne(id, tenantId);
    }
    findOneByRole(role, user) {
        const { tenantId } = user;
        return this.adminUserMainService.findOneByRole(role, tenantId);
    }
    findAllByRole(role, user) {
        const { tenantId } = user;
        return this.adminUserMainService.findAllByRole(role, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.adminUserMainService.findAll(tenantId);
    }
    search(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
        const { tenantId } = user;
        return this.adminUserMainService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminUserMainController = AdminUserMainController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_user_dto_1.AdminCreateUserDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUserMainController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        admin_update_user_dto_1.AdminUpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], AdminUserMainController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-user-field'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminRequestUpdateUserFieldDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUserMainController.prototype, "updateUserField", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('set-password-temp/:userId'),
    __param(0, (0, common_1.Param)('userId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUserMainController.prototype, "setPasswordAsTemp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('role/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "findOneByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('find-all/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "findAllByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminSearchUsersQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserMainController.prototype, "search", null);
exports.AdminUserMainController = AdminUserMainController = __decorate([
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [admin_user_main_service_1.AdminUserMainService])
], AdminUserMainController);
//# sourceMappingURL=admin-user-main.controller.js.map
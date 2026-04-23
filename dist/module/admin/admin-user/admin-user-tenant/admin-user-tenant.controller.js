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
exports.AdminUserTenantController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const mongoose_1 = require("mongoose");
const admin_user_dto_1 = require("../admin-user-main/dto/admin-user.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const admin_update_user_dto_1 = require("../admin-user-main/dto/admin-update-user.dto");
const admin_create_user_dto_1 = require("../admin-user-main/dto/admin-create-user.dto");
const quota_headers_interceptor_1 = require("../../../../interceptors/quota-headers.interceptor");
const admin_user_tenant_service_1 = require("./admin-user-tenant.service");
let AdminUserTenantController = class AdminUserTenantController {
    constructor(adminUserTenantService) {
        this.adminUserTenantService = adminUserTenantService;
    }
    async register(adminCreateUserDto) {
        try {
            return await this.adminUserTenantService.create(adminCreateUserDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateProfile(adminUpdateUserProfileDto) {
        try {
            const updatedUser = await this.adminUserTenantService.update(adminUpdateUserProfileDto);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async setPasswordAsTemp(userId, body, user) {
        const { tenantId } = user;
        const { newPassword } = body;
        return this.adminUserTenantService.setPasswordAsTemp(userId, newPassword);
    }
    delete(id, user) {
        return this.adminUserTenantService.delete(id);
    }
    search(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
        const { tenantId } = user;
        return this.adminUserTenantService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
    }
};
exports.AdminUserTenantController = AdminUserTenantController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password']), quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_user_dto_1.AdminCreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminUserTenantController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_user_dto_1.AdminUpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], AdminUserTenantController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('set-password-temp/:userId'),
    __param(0, (0, common_1.Param)('userId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUserTenantController.prototype, "setPasswordAsTemp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)(quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserTenantController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_dto_1.AdminSearchUsersQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserTenantController.prototype, "search", null);
exports.AdminUserTenantController = AdminUserTenantController = __decorate([
    (0, common_1.Controller)('admin/users/tenant'),
    __metadata("design:paramtypes", [admin_user_tenant_service_1.AdminUserTenantService])
], AdminUserTenantController);
//# sourceMappingURL=admin-user-tenant.controller.js.map
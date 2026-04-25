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
exports.AdminUserClientController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const feature_decorator_1 = require("../../../../decorators/feature.decorator");
const mongoose_1 = require("mongoose");
const admin_user_dto_1 = require("../admin-user-main/dto/admin-user.dto");
const admin_update_user_dto_1 = require("../admin-user-main/dto/admin-update-user.dto");
const admin_create_user_dto_1 = require("../admin-user-main/dto/admin-create-user.dto");
const admin_user_client_service_1 = require("./admin-user-client.service");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const module_function_keys_1 = require("../../../../common/constants/module-function-keys");
const quota_guard_1 = require("../../../../guards/quota.guard");
const quota_headers_interceptor_1 = require("../../../../interceptors/quota-headers.interceptor");
let AdminUserClientController = class AdminUserClientController {
    constructor(adminUserClientService) {
        this.adminUserClientService = adminUserClientService;
    }
    async register(adminCreateUserDto, cUser) {
        try {
            const { tenantId } = cUser;
            return await this.adminUserClientService.create(adminCreateUserDto, tenantId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateProfile(user, adminUpdateUserProfileDto) {
        try {
            const { tenantId } = user;
            const updatedUser = await this.adminUserClientService.update(adminUpdateUserProfileDto, tenantId);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async setPasswordAsTemp(userId, body, user) {
        const { tenantId } = user;
        const { newPassword } = body;
        return this.adminUserClientService.setPasswordAsTemp(userId, newPassword, tenantId);
    }
    delete(id, user) {
        return this.adminUserClientService.delete(id);
    }
    search(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
        const { tenantId } = user;
        return this.adminUserClientService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminUserClientController = AdminUserClientController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, quota_guard_1.QuotaGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password']), quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, common_1.Post)('register'),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.USER_CLIENT, module_function_keys_1.FUNCTION_KEYS.USER_CLIENT.CREATE),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_user_dto_1.AdminCreateUserDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUserClientController.prototype, "register", null);
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
], AdminUserClientController.prototype, "updateProfile", null);
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
], AdminUserClientController.prototype, "setPasswordAsTemp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, quota_guard_1.QuotaGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)(quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.USER_CLIENT, module_function_keys_1.FUNCTION_KEYS.USER_CLIENT.CREATE, module_function_keys_1.ACTIONQUOTA_KEYS.RELEASED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUserClientController.prototype, "delete", null);
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
], AdminUserClientController.prototype, "search", null);
exports.AdminUserClientController = AdminUserClientController = __decorate([
    (0, common_1.Controller)('admin/users/client'),
    __metadata("design:paramtypes", [admin_user_client_service_1.AdminUserClientService])
], AdminUserClientController);
//# sourceMappingURL=admin-user-client.controller.js.map
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
exports.AdminGoodsCategoryController = void 0;
const common_1 = require("@nestjs/common");
const admin_goods_category_service_1 = require("./admin-goods-category-service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const admin_create_goods_category_dto_1 = require("./dto/admin-create-goods-category.dto");
const admin_goods_category_dto_1 = require("./dto/admin-goods-category.dto");
const admin_update_goods_category_dto_1 = require("./dto/admin-update-goods-category.dto");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let AdminGoodsCategoryController = class AdminGoodsCategoryController {
    constructor(adminGoodsCategoryService) {
        this.adminGoodsCategoryService = adminGoodsCategoryService;
    }
    create(adminCreateGoodsCategoryDto, user) {
        const { tenantId } = user;
        return this.adminGoodsCategoryService.create(adminCreateGoodsCategoryDto, tenantId);
    }
    update(adminUpdateGoodsCategoryDto, user) {
        const { tenantId } = user;
        return this.adminGoodsCategoryService.update(adminUpdateGoodsCategoryDto, tenantId);
    }
    remove(id, user) {
        const { tenantId } = user;
        return this.adminGoodsCategoryService.remove(id, tenantId);
    }
    findByIds(ids, tenantScope) {
        const { tenantId, rootTenantId } = tenantScope;
        return this.adminGoodsCategoryService.findByIds(ids, tenantId, rootTenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.adminGoodsCategoryService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.adminGoodsCategoryService.findOne(id, tenantId);
    }
    async searchGoodsCategoryPaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.adminGoodsCategoryService.searchGoodsCategoryPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminGoodsCategoryController = AdminGoodsCategoryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_goods_category_dto_1.AdminCreateGoodsCategoryDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_goods_category_dto_1.AdminUpdateGoodsCategoryDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-by-ids'),
    __param(0, (0, common_1.Query)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "findByIds", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminGoodsCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_goods_category_dto_1.AdminSearchGoodsCategoryPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminGoodsCategoryController.prototype, "searchGoodsCategoryPaging", null);
exports.AdminGoodsCategoryController = AdminGoodsCategoryController = __decorate([
    (0, common_1.Controller)('admin/goods-category'),
    __metadata("design:paramtypes", [admin_goods_category_service_1.AdminGoodsCategoryService])
], AdminGoodsCategoryController);
//# sourceMappingURL=admin-goods-category.controller.js.map
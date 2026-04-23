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
exports.PosGoodsCategoryController = void 0;
const common_1 = require("@nestjs/common");
const pos_goods_category_service_1 = require("./pos-goods-category-service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const pos_create_goods_category_dto_1 = require("./dto/pos-create-goods-category.dto");
const pos_goods_category_dto_1 = require("./dto/pos-goods-category.dto");
const pos_update_goods_category_dto_1 = require("./dto/pos-update-goods-category.dto");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let PosGoodsCategoryController = class PosGoodsCategoryController {
    constructor(PosGoodsCategoryService) {
        this.PosGoodsCategoryService = PosGoodsCategoryService;
    }
    create(PosCreateGoodsCategoryDto, user) {
        const { tenantId } = user;
        return this.PosGoodsCategoryService.create(PosCreateGoodsCategoryDto, tenantId);
    }
    update(PosUpdateGoodsCategoryDto, user) {
        const { tenantId } = user;
        return this.PosGoodsCategoryService.update(PosUpdateGoodsCategoryDto, tenantId);
    }
    remove(id, user) {
        const { tenantId } = user;
        return this.PosGoodsCategoryService.remove(id, tenantId);
    }
    findByIds(ids, tenantScope) {
        const { tenantId, rootTenantId } = tenantScope;
        return this.PosGoodsCategoryService.findByIds(ids, tenantId, rootTenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.PosGoodsCategoryService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.PosGoodsCategoryService.findOne(id, tenantId);
    }
    async searchGoodsCategoryPaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.PosGoodsCategoryService.searchGoodsCategoryPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.PosGoodsCategoryController = PosGoodsCategoryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_create_goods_category_dto_1.PosCreateGoodsCategoryDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_update_goods_category_dto_1.PosUpdateGoodsCategoryDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-by-ids'),
    __param(0, (0, common_1.Query)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "findByIds", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_goods_category_dto_1.PosSearchGoodsCategoryPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosGoodsCategoryController.prototype, "searchGoodsCategoryPaging", null);
exports.PosGoodsCategoryController = PosGoodsCategoryController = __decorate([
    (0, common_1.Controller)('pos/goods-category'),
    __metadata("design:paramtypes", [pos_goods_category_service_1.PosGoodsCategoryService])
], PosGoodsCategoryController);
//# sourceMappingURL=pos-goods-category.controller.js.map
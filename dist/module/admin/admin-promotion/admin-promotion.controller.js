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
exports.AdminPromotionController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const roles_guard_1 = require("../../../guards/roles.guard");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const admin_promotion_service_1 = require("./admin-promotion-service");
const feature_decorator_1 = require("../../../decorators/feature.decorator");
const quota_guard_1 = require("../../../guards/quota.guard");
const admin_create_promotion_dto_1 = require("./dto/admin-create-promotion.dto");
const admin_promotion_dto_1 = require("./dto/admin-promotion.dto");
const admin_update_promotion_dto_1 = require("./dto/admin-update-promotion.dto");
const quota_headers_interceptor_1 = require("../../../interceptors/quota-headers.interceptor");
const tenant_scope_1 = require("../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../interceptors/mark-default-tenant");
const module_function_keys_1 = require("../../../common/constants/module-function-keys");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminPromotionController = class AdminPromotionController {
    constructor(adminPromotionService) {
        this.adminPromotionService = adminPromotionService;
    }
    create(adminCreatePromotionDto, user) {
        const { tenantId } = user;
        return this.adminPromotionService.create(adminCreatePromotionDto, tenantId);
    }
    update(adminUpdatePromotionDto, user) {
        const { tenantId } = user;
        return this.adminPromotionService.update(adminUpdatePromotionDto, tenantId);
    }
    updates(adminUpdatePromotionDto, user) {
        const { tenantId } = user;
        return this.adminPromotionService.updates(adminUpdatePromotionDto, tenantId);
    }
    remove(id, user) {
        const { tenantId } = user;
        return this.adminPromotionService.remove(id, tenantId);
    }
    redeem(adminRedeemPromotionDto, user) {
        const { tenantId } = user;
        return this.adminPromotionService.redeem(adminRedeemPromotionDto, tenantId);
    }
    findAll(tenantScope) {
        const { tenantIds } = tenantScope;
        return this.adminPromotionService.findAll(tenantIds);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.adminPromotionService.findOne(id, tenantId);
    }
    findAllByRule(query, user) {
        const { userId, bookingIds } = query;
        const { tenantId } = user;
        return this.adminPromotionService.findAllByRule(userId, bookingIds, tenantId);
    }
    findMassPromotion(query, user) {
        const { tenantId } = user;
        return this.adminPromotionService.findMassPromotion(tenantId);
    }
    async searchPromotionPaging(query, tenantScope) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantIds } = tenantScope;
        return this.adminPromotionService.searchPromotionPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminPromotionController = AdminPromotionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, quota_guard_1.QuotaGuard),
    (0, common_1.UseInterceptors)(quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.PROMOTION_MANAGEMENT, module_function_keys_1.FUNCTION_KEYS.PROMOTION_MANAGEMENT.CREATE),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_promotion_dto_1.AdminCreatePromotionDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_promotion_dto_1.AdminUpdatePromotionDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)('updates'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "updates", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('redeem'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_promotion_dto_1.AdminRedeemPromotionDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "redeem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)(),
    __param(0, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('find-all-by-rule'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_promotion_dto_1.AdminRequestPromotionByRule,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findAllByRule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('find-mass-promotion'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_promotion_dto_1.AdminRequestPromotionMass,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findMassPromotion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_promotion_dto_1.AdminSearchPromotionPagingQuery, Object]),
    __metadata("design:returntype", Promise)
], AdminPromotionController.prototype, "searchPromotionPaging", null);
exports.AdminPromotionController = AdminPromotionController = __decorate([
    (0, common_1.Controller)('admin/promotion'),
    __metadata("design:paramtypes", [admin_promotion_service_1.AdminPromotionService])
], AdminPromotionController);
//# sourceMappingURL=admin-promotion.controller.js.map
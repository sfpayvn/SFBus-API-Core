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
exports.AdminTenantSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const admin_tenant_subscription_dto_1 = require("./dto/admin-tenant-subscription.dto");
const admin_tenant_subscription_service_1 = require("./admin-tenant-subscription.service");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminTenantSubscriptionController = class AdminTenantSubscriptionController {
    constructor(adminTenantSubscriptionService) {
        this.adminTenantSubscriptionService = adminTenantSubscriptionService;
    }
    register(adminRegisterSubscriptionDto, user) {
        const tenantId = new mongoose_1.Types.ObjectId(user.tenantId);
        return this.adminTenantSubscriptionService.registerForTenant(tenantId, adminRegisterSubscriptionDto);
    }
    registerForTenant(dto) {
        return this.adminTenantSubscriptionService.registerForTenant(dto.tenantId, dto);
    }
    search(query) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.adminTenantSubscriptionService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
    }
    searchMySubscriptions(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const tenantId = new mongoose_1.Types.ObjectId(user.tenantId);
        filters.push({ key: 'tenantId', value: tenantId });
        return this.adminTenantSubscriptionService.searchMySubscriptions(+pageIdx, +pageSize, keyword, sortBy, filters);
    }
};
exports.AdminTenantSubscriptionController = AdminTenantSubscriptionController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_tenant_subscription_dto_1.AdminRegisterSubscriptionDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminTenantSubscriptionController.prototype, "register", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('register-for-tenant'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_tenant_subscription_dto_1.AdminRegisterSubscriptionForTenantDto]),
    __metadata("design:returntype", void 0)
], AdminTenantSubscriptionController.prototype, "registerForTenant", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_tenant_subscription_dto_1.AdminSearchTenantSubscriptionQuery]),
    __metadata("design:returntype", void 0)
], AdminTenantSubscriptionController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('search/my-subscription'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_tenant_subscription_dto_1.AdminSearchTenantSubscriptionQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminTenantSubscriptionController.prototype, "searchMySubscriptions", null);
exports.AdminTenantSubscriptionController = AdminTenantSubscriptionController = __decorate([
    (0, common_1.Controller)('admin/tenant-subscription'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [admin_tenant_subscription_service_1.AdminTenantSubscriptionService])
], AdminTenantSubscriptionController);
//# sourceMappingURL=admin-tenant-subscription.controller.js.map
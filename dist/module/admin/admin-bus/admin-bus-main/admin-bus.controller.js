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
exports.AdminBusController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const admin_bus_service_1 = require("./admin-bus.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const mongoose_1 = require("mongoose");
const admin_create_bus_dto_1 = require("./dto/admin-create-bus.dto");
const admin_update_bus_dto_1 = require("./dto/admin-update-bus.dto");
const admin_bus_dto_1 = require("./dto/admin-bus.dto");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../../interceptors/mark-default-tenant");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let AdminBusController = class AdminBusController {
    constructor(adminBusService) {
        this.adminBusService = adminBusService;
    }
    async create(adminCreateBusDto, user) {
        const { tenantId } = user;
        return await this.adminBusService.create(adminCreateBusDto, tenantId);
    }
    update(adminUpdateBusDto, user) {
        const { tenantId } = user;
        return this.adminBusService.update(adminUpdateBusDto, tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.adminBusService.delete(id, tenantId);
    }
    async findAll(user) {
        const { tenantId } = user;
        return this.adminBusService.findAll(tenantId);
    }
    async findOne(id, user) {
        const { tenantId } = user;
        return this.adminBusService.findOne(id, tenantId);
    }
    async findByBusTemplate(busTemplateId, tenantScope) {
        const { tenantId, rootTenantId } = tenantScope;
        return this.adminBusService.findByBusTemplate(busTemplateId, tenantId, rootTenantId);
    }
    search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = { key: 'createdAt', value: 'desc' }, filters = [], } = query;
        return this.adminBusService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminBusController = AdminBusController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_bus_dto_1.AdminCreateBusDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminBusController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_bus_dto_1.AdminUpdateBusDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminBusController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminBusController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)('find-by-bus-template/:busTemplateId'),
    __param(0, (0, common_1.Param)('busTemplateId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], AdminBusController.prototype, "findByBusTemplate", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_bus_dto_1.AdminSearchBusQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusController.prototype, "search", null);
exports.AdminBusController = AdminBusController = __decorate([
    (0, common_1.Controller)('admin/buses'),
    __metadata("design:paramtypes", [admin_bus_service_1.AdminBusService])
], AdminBusController);
//# sourceMappingURL=admin-bus.controller.js.map
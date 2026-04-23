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
exports.AdminBusScheduleController = void 0;
const common_1 = require("@nestjs/common");
const admin_bus_schedule_service_1 = require("./admin-bus-schedule.service");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const admin_bus_schedule_dto_1 = require("./dto/admin-bus-schedule.dto");
const admin_update_bus_schedule_dto_1 = require("./dto/admin-update-bus-schedule.dto");
const admin_create_bus_schedule_dto_1 = require("./dto/admin-create-bus-schedule.dto");
const mongoose_1 = require("mongoose");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../../interceptors/mark-default-tenant");
const feature_decorator_1 = require("../../../../decorators/feature.decorator");
const quota_headers_interceptor_1 = require("../../../../interceptors/quota-headers.interceptor");
const quota_guard_1 = require("../../../../guards/quota.guard");
const module_function_keys_1 = require("../../../../common/constants/module-function-keys");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let AdminBusScheduleController = class AdminBusScheduleController {
    constructor(adminBusScheduleService) {
        this.adminBusScheduleService = adminBusScheduleService;
    }
    create(adminCreateBusScheduleDto, tenantScope) {
        const { rootTenantId, tenantId } = tenantScope;
        return this.adminBusScheduleService.create(adminCreateBusScheduleDto, rootTenantId, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.adminBusScheduleService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.adminBusScheduleService.findOne(id, tenantId);
    }
    update(adminUpdateBusScheduleDto, user) {
        const { tenantId } = user;
        return this.adminBusScheduleService.update(adminUpdateBusScheduleDto, tenantId);
    }
    updateCurrentStation(currentStationId, busScheduleId, user) {
        const { tenantId } = user;
        return this.adminBusScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.adminBusScheduleService.delete(id, tenantId);
    }
    async searchBusSchedulePaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.adminBusScheduleService.searchBusSchedulePaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminBusScheduleController = AdminBusScheduleController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, quota_guard_1.QuotaGuard),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.BUS_SCHEDULE, module_function_keys_1.FUNCTION_KEYS.BUS_SCHEDULE.CREATE),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)(), quota_headers_interceptor_1.QuotaHeadersInterceptor),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_bus_schedule_dto_1.AdminCreateBusScheduleDto, Object]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_bus_schedule_dto_1.AdminUpdateBusScheduleDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)('update-current-station/:busScheduleId'),
    __param(0, (0, common_1.Body)('currentStationId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "updateCurrentStation", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBusScheduleController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_bus_schedule_dto_1.AdminSearchBusSchedulePagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminBusScheduleController.prototype, "searchBusSchedulePaging", null);
exports.AdminBusScheduleController = AdminBusScheduleController = __decorate([
    (0, common_1.Controller)('admin/bus-schedules'),
    __metadata("design:paramtypes", [admin_bus_schedule_service_1.AdminBusScheduleService])
], AdminBusScheduleController);
//# sourceMappingURL=admin-bus-schedule.controller.js.map
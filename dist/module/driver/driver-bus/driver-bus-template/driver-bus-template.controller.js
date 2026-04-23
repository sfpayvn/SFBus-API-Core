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
exports.DriverBusTemplateController = void 0;
const common_1 = require("@nestjs/common");
const driver_bus_template_service_1 = require("./driver-bus-template.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const driver_bus_template_dto_1 = require("./dto/driver-bus-template.dto");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../../interceptors/mark-default-tenant");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverBusTemplateController = class DriverBusTemplateController {
    constructor(DriverBusTemplateService) {
        this.DriverBusTemplateService = DriverBusTemplateService;
    }
    async findAll(tenantScope) {
        const { tenantIds } = tenantScope;
        return this.DriverBusTemplateService.findAll(tenantIds);
    }
    search(query, tenantScope) {
        const { tenantIds } = tenantScope;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.DriverBusTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.DriverBusTemplateController = DriverBusTemplateController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)('find-all'),
    __param(0, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DriverBusTemplateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_bus_template_dto_1.DriverSearchBusTemplateQuery, Object]),
    __metadata("design:returntype", void 0)
], DriverBusTemplateController.prototype, "search", null);
exports.DriverBusTemplateController = DriverBusTemplateController = __decorate([
    (0, common_1.Controller)('driver/bus-templates'),
    __metadata("design:paramtypes", [driver_bus_template_service_1.DriverBusTemplateService])
], DriverBusTemplateController);
//# sourceMappingURL=driver-bus-template.controller.js.map
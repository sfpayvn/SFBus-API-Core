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
exports.ClientBusTypeController = void 0;
const common_1 = require("@nestjs/common");
const client_bus_type_service_1 = require("./client-bus-type.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const mongoose_1 = require("mongoose");
const client_bus_type_dto_1 = require("./dto/client-bus-type.dto");
const mark_default_tenant_1 = require("../../../../interceptors/mark-default-tenant");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const tenant_by_code_interceptor_1 = require("../../../../interceptors/tenant-by-code.interceptor");
const tenant_by_code_decorator_1 = require("../../../../decorators/tenant-by-code.decorator");
let ClientBusTypeController = class ClientBusTypeController {
    constructor(ClientBusTypeService) {
        this.ClientBusTypeService = ClientBusTypeService;
    }
    findOne(id, tenantIds) {
        return this.ClientBusTypeService.findOne(id, tenantIds);
    }
    findAll(tenantIds) {
        return this.ClientBusTypeService.findAll(tenantIds);
    }
    search(query, tenantIds) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.ClientBusTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.ClientBusTypeController = ClientBusTypeController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Array]),
    __metadata("design:returntype", void 0)
], ClientBusTypeController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Get)('find-all'),
    __param(0, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ClientBusTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_bus_type_dto_1.ClientSearchBusTypesQuery, Array]),
    __metadata("design:returntype", void 0)
], ClientBusTypeController.prototype, "search", null);
exports.ClientBusTypeController = ClientBusTypeController = __decorate([
    (0, common_1.Controller)('client/bus-type'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [client_bus_type_service_1.ClientBusTypeService])
], ClientBusTypeController);
//# sourceMappingURL=client-bus-type.controller.js.map
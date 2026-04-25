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
exports.ClientSeatTypeController = void 0;
const common_1 = require("@nestjs/common");
const client_seat_type_service_1 = require("./client-seat-type.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const client_seat_type_dto_1 = require("./dto/client-seat-type.dto");
const tenant_by_code_interceptor_1 = require("../../../../interceptors/tenant-by-code.interceptor");
const tenant_by_code_decorator_1 = require("../../../../decorators/tenant-by-code.decorator");
let ClientSeatTypeController = class ClientSeatTypeController {
    constructor(ClientSeatTypeService) {
        this.ClientSeatTypeService = ClientSeatTypeService;
    }
    findOne(id, tenantIds) {
        return this.ClientSeatTypeService.findOne(id, tenantIds);
    }
    findAll(tenantIds) {
        return this.ClientSeatTypeService.findAll(tenantIds);
    }
    search(query, tenantIds) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.ClientSeatTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.ClientSeatTypeController = ClientSeatTypeController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Array]),
    __metadata("design:returntype", void 0)
], ClientSeatTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('find-all'),
    __param(0, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ClientSeatTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdsByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_seat_type_dto_1.ClientSearchSeatTypesQuery, Array]),
    __metadata("design:returntype", void 0)
], ClientSeatTypeController.prototype, "search", null);
exports.ClientSeatTypeController = ClientSeatTypeController = __decorate([
    (0, common_1.Controller)('client/seat-types'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [client_seat_type_service_1.ClientSeatTypeService])
], ClientSeatTypeController);
//# sourceMappingURL=client-seat-type.controller.js.map
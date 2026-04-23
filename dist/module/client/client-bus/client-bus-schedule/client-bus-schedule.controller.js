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
exports.ClientBusScheduleController = void 0;
const common_1 = require("@nestjs/common");
const client_bus_schedule_service_1 = require("./client-bus-schedule.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const client_bus_schedule_dto_1 = require("./dto/client-bus-schedule.dto");
const tenant_by_code_decorator_1 = require("../../../../decorators/tenant-by-code.decorator");
const mongoose_1 = require("mongoose");
const tenant_by_code_interceptor_1 = require("../../../../interceptors/tenant-by-code.interceptor");
let ClientBusScheduleController = class ClientBusScheduleController {
    constructor(clientBusScheduleService) {
        this.clientBusScheduleService = clientBusScheduleService;
    }
    async searchBusSchedulePaging(query, tenantId) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.clientBusScheduleService.searchBusSchedulePaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.ClientBusScheduleController = ClientBusScheduleController;
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_bus_schedule_dto_1.ClientSearchBusSchedulePagingQuery, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientBusScheduleController.prototype, "searchBusSchedulePaging", null);
exports.ClientBusScheduleController = ClientBusScheduleController = __decorate([
    (0, common_1.Controller)('client/bus-schedules'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [client_bus_schedule_service_1.ClientBusScheduleService])
], ClientBusScheduleController);
//# sourceMappingURL=client-bus-schedule.controller.js.map
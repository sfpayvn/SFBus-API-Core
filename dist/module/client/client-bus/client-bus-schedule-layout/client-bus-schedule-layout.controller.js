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
exports.ClientBusScheduleLayoutController = void 0;
const common_1 = require("@nestjs/common");
const client_bus_schedule_layout_service_1 = require("./client-bus-schedule-layout.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const tenant_by_code_interceptor_1 = require("../../../../interceptors/tenant-by-code.interceptor");
const tenant_by_code_decorator_1 = require("../../../../decorators/tenant-by-code.decorator");
let ClientBusScheduleLayoutController = class ClientBusScheduleLayoutController {
    constructor(ClientBusScheduleLayoutService) {
        this.ClientBusScheduleLayoutService = ClientBusScheduleLayoutService;
    }
    async findAll(tenantId) {
        return this.ClientBusScheduleLayoutService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.ClientBusScheduleLayoutService.findOne(id, tenantId);
    }
    async findOneByBusSchedule(busScheduleId, tenantId) {
        return this.ClientBusScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
    }
};
exports.ClientBusScheduleLayoutController = ClientBusScheduleLayoutController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientBusScheduleLayoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find-one/:id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientBusScheduleLayoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('find-one-by-bus-schedule/:busScheduleId'),
    __param(0, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientBusScheduleLayoutController.prototype, "findOneByBusSchedule", null);
exports.ClientBusScheduleLayoutController = ClientBusScheduleLayoutController = __decorate([
    (0, common_1.Controller)('client/bus-schedule-layouts'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [client_bus_schedule_layout_service_1.ClientBusScheduleLayoutService])
], ClientBusScheduleLayoutController);
//# sourceMappingURL=client-bus-schedule-layout.controller.js.map
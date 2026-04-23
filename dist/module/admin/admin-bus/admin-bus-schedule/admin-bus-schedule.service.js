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
exports.AdminBusScheduleService = void 0;
const bus_schedule_service_1 = require("../../../core/bus/bus-schedule/bus-schedule.service");
const bus_schedule_schema_1 = require("../../../core/bus/bus-schedule/schema/bus-schedule.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
let AdminBusScheduleService = class AdminBusScheduleService {
    constructor(busScheduleModel, busScheduleService) {
        this.busScheduleModel = busScheduleModel;
        this.busScheduleService = busScheduleService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(adminCreateBusScheduleDto, rootTenantId, tenantId) {
        return this.busScheduleService.create(adminCreateBusScheduleDto, rootTenantId, tenantId);
    }
    async findAll(tenantId) {
        return this.busScheduleService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.busScheduleService.findOne(id, tenantId);
    }
    async update(adminUpdateBusScheduleDto, tenantId) {
        return this.busScheduleService.update(adminUpdateBusScheduleDto, tenantId);
    }
    async delete(id, tenantId) {
        return this.busScheduleService.delete(id, tenantId);
    }
    async searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.busScheduleService.searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
    async updateCurrentStation(busScheduleId, currentStationId, tenantId) {
        return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
    }
};
exports.AdminBusScheduleService = AdminBusScheduleService;
exports.AdminBusScheduleService = AdminBusScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_schema_1.BusScheduleDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_service_1.BusScheduleService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_service_1.BusScheduleService])
], AdminBusScheduleService);
//# sourceMappingURL=admin-bus-schedule.service.js.map
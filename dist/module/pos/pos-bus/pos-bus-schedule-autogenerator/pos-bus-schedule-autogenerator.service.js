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
exports.PosBusScheduleAutogeneratorService = void 0;
const bus_schedule_autogenerator_service_1 = require("../../../core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service");
const bus_schedule_autogenerator_schema_1 = require("../../../core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
let PosBusScheduleAutogeneratorService = class PosBusScheduleAutogeneratorService {
    constructor(busScheduleAutogeneratorModel, busScheduleAutogeneratorService) {
        this.busScheduleAutogeneratorModel = busScheduleAutogeneratorModel;
        this.busScheduleAutogeneratorService = busScheduleAutogeneratorService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(PosCreateBusScheduleAutogeneratorDto, tenantId, timezoneOffset) {
        return this.busScheduleAutogeneratorService.create(PosCreateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    async update(PosUpdateBusScheduleAutogeneratorDto, tenantId, timezoneOffset) {
        return this.busScheduleAutogeneratorService.update(PosUpdateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    async delete(id, tenantId) {
        return this.busScheduleAutogeneratorService.delete(id, tenantId);
    }
    async findAll(tenantId) {
        return this.busScheduleAutogeneratorService.findAll(tenantId);
    }
    async searchBusScheduleAutogenerator(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.busScheduleAutogeneratorService.searchBusScheduleAutogenerator(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
    generateSchedulesForToday(tenantId, timezoneOffset) {
        return this.busScheduleAutogeneratorService.generateSchedulesForToday(tenantId, timezoneOffset);
    }
};
exports.PosBusScheduleAutogeneratorService = PosBusScheduleAutogeneratorService;
exports.PosBusScheduleAutogeneratorService = PosBusScheduleAutogeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService])
], PosBusScheduleAutogeneratorService);
//# sourceMappingURL=pos-bus-schedule-autogenerator.service.js.map
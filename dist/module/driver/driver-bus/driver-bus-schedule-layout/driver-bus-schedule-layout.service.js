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
exports.DriverBusScheduleLayoutService = void 0;
const bus_schedule_layout_service_1 = require("../../../core/bus/bus-schedule-layout/bus-schedule-layout.service");
const bus_schedule_layout_dto_1 = require("../../../core/bus/bus-schedule-layout/dto/bus-schedule-layout.dto");
const bus_schedule_layout_schema_1 = require("../../../core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
let DriverBusScheduleLayoutService = class DriverBusScheduleLayoutService {
    constructor(busScheduleLayoutModel, busScheduleLayoutService) {
        this.busScheduleLayoutModel = busScheduleLayoutModel;
        this.busScheduleLayoutService = busScheduleLayoutService;
    }
    async findAll(tenantId) {
        const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
        return templates.map((template) => (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, template));
    }
    async findOne(busScheduleId, tenantId) {
        return this.busScheduleLayoutService.findOne(busScheduleId, tenantId);
    }
    async findOneByBusSchedule(busScheduleId, tenantId) {
        return this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
    }
};
exports.DriverBusScheduleLayoutService = DriverBusScheduleLayoutService;
exports.DriverBusScheduleLayoutService = DriverBusScheduleLayoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_layout_service_1.BusScheduleLayoutService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_layout_service_1.BusScheduleLayoutService])
], DriverBusScheduleLayoutService);
//# sourceMappingURL=driver-bus-schedule-layout.service.js.map
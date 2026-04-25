"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBusScheduleModule = void 0;
const bus_schedule_schema_1 = require("../../../core/bus/bus-schedule/schema/bus-schedule.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_bus_schedule_controller_1 = require("./driver-bus-schedule.controller");
const driver_bus_schedule_service_1 = require("./driver-bus-schedule.service");
const bus_schedule_module_1 = require("../../../core/bus/bus-schedule/bus-schedule.module");
let DriverBusScheduleModule = class DriverBusScheduleModule {
};
exports.DriverBusScheduleModule = DriverBusScheduleModule;
exports.DriverBusScheduleModule = DriverBusScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_schema_1.BusScheduleDocument.name, schema: bus_schedule_schema_1.BusScheduleSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_module_1.BusScheduleModule),
        ],
        controllers: [driver_bus_schedule_controller_1.DriverBusScheduleController],
        providers: [driver_bus_schedule_service_1.DriverBusScheduleService],
        exports: [driver_bus_schedule_service_1.DriverBusScheduleService],
    })
], DriverBusScheduleModule);
//# sourceMappingURL=driver-bus-schedule.module.js.map
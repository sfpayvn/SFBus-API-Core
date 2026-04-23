"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBusScheduleLayoutModule = void 0;
const bus_schedule_layout_schema_1 = require("../../../core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_bus_schedule_layout_controller_1 = require("./driver-bus-schedule-layout.controller");
const driver_bus_schedule_layout_service_1 = require("./driver-bus-schedule-layout.service");
const bus_schedule_layout_module_1 = require("../../../core/bus/bus-schedule-layout/bus-schedule-layout.module");
let DriverBusScheduleLayoutModule = class DriverBusScheduleLayoutModule {
};
exports.DriverBusScheduleLayoutModule = DriverBusScheduleLayoutModule;
exports.DriverBusScheduleLayoutModule = DriverBusScheduleLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name, schema: bus_schedule_layout_schema_1.BusScheduleLayoutSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
        ],
        controllers: [driver_bus_schedule_layout_controller_1.DriverBusScheduleLayoutController],
        providers: [driver_bus_schedule_layout_service_1.DriverBusScheduleLayoutService],
        exports: [driver_bus_schedule_layout_service_1.DriverBusScheduleLayoutService],
    })
], DriverBusScheduleLayoutModule);
//# sourceMappingURL=driver-bus-schedule-layout.module.js.map
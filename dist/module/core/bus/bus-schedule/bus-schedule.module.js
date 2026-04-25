"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_schedule_service_1 = require("./bus-schedule.service");
const bus_schedule_controller_1 = require("./bus-schedule.controller");
const bus_schedule_schema_1 = require("./schema/bus-schedule.schema");
const bus_module_1 = require("../bus/bus.module");
const bus_schedule_layout_module_1 = require("../bus-schedule-layout/bus-schedule-layout.module");
const bus_layout_template_module_1 = require("../bus-layout-template/bus-layout-template.module");
const settings_module_1 = require("../../settings/settings.module");
const driver_module_1 = require("../../user/driver/driver.module");
const tracking_module_1 = require("../../tracking/tracking.module");
let BusScheduleModule = class BusScheduleModule {
};
exports.BusScheduleModule = BusScheduleModule;
exports.BusScheduleModule = BusScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_schema_1.BusScheduleDocument.name, schema: bus_schedule_schema_1.BusScheduleSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
            (0, common_1.forwardRef)(() => bus_layout_template_module_1.BusLayoutTemplateModule),
            (0, common_1.forwardRef)(() => bus_module_1.BusModule),
            (0, common_1.forwardRef)(() => driver_module_1.DriverModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
            (0, common_1.forwardRef)(() => tracking_module_1.TrackingModule),
        ],
        controllers: [bus_schedule_controller_1.BusScheduleController],
        providers: [bus_schedule_service_1.BusScheduleService],
        exports: [bus_schedule_service_1.BusScheduleService],
    })
], BusScheduleModule);
//# sourceMappingURL=bus-schedule.module.js.map
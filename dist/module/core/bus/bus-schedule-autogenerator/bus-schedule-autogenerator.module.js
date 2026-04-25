"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleAutogeneratorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_schedule_autogenerator_service_1 = require("./bus-schedule-autogenerator.service");
const bus_schedule_autogenerator_schema_1 = require("./schema/bus-schedule-autogenerator.schema");
const bus_schedule_autogenerator_controller_1 = require("./bus-schedule-autogenerator.controller");
const bus_schedule_template_module_1 = require("../bus-schedule-template/bus-schedule-template.module");
const bus_schedule_module_1 = require("../bus-schedule/bus-schedule.module");
const bus_template_module_1 = require("../bus-template/bus-template.module");
const bus_module_1 = require("../bus/bus.module");
const bus_route_module_1 = require("../bus-route/bus-route.module");
const bus_station_module_1 = require("../bus-station/bus-station.module");
const bus_province_module_1 = require("../bus-province/bus-province.module");
const auto_job_tracking_1 = require("../../auto-job-tracking");
const settings_module_1 = require("../../settings/settings.module");
let BusScheduleAutogeneratorModule = class BusScheduleAutogeneratorModule {
};
exports.BusScheduleAutogeneratorModule = BusScheduleAutogeneratorModule;
exports.BusScheduleAutogeneratorModule = BusScheduleAutogeneratorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorDocument.name, schema: bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorSchema },
            ]),
            (0, common_1.forwardRef)(() => bus_schedule_template_module_1.BusScheduleTemplateModule),
            (0, common_1.forwardRef)(() => bus_schedule_module_1.BusScheduleModule),
            (0, common_1.forwardRef)(() => bus_template_module_1.BusTemplateModule),
            (0, common_1.forwardRef)(() => bus_module_1.BusModule),
            (0, common_1.forwardRef)(() => bus_route_module_1.BusRouteModule),
            (0, common_1.forwardRef)(() => bus_station_module_1.BusStationModule),
            (0, common_1.forwardRef)(() => bus_province_module_1.BusProvinceModule),
            (0, common_1.forwardRef)(() => auto_job_tracking_1.AutoJobTrackingModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingsModule),
        ],
        controllers: [bus_schedule_autogenerator_controller_1.BusScheduleAutogeneratorController],
        providers: [bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService],
        exports: [bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService],
    })
], BusScheduleAutogeneratorModule);
//# sourceMappingURL=bus-schedule-autogenerator.module.js.map
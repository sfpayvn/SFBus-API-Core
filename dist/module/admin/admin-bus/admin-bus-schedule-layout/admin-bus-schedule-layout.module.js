"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBusScheduleLayoutModule = void 0;
const bus_schedule_layout_schema_1 = require("../../../core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_bus_schedule_layout_controller_1 = require("./admin-bus-schedule-layout.controller");
const admin_bus_schedule_layout_service_1 = require("./admin-bus-schedule-layout.service");
const bus_schedule_layout_module_1 = require("../../../core/bus/bus-schedule-layout/bus-schedule-layout.module");
let AdminBusScheduleLayoutModule = class AdminBusScheduleLayoutModule {
};
exports.AdminBusScheduleLayoutModule = AdminBusScheduleLayoutModule;
exports.AdminBusScheduleLayoutModule = AdminBusScheduleLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name, schema: bus_schedule_layout_schema_1.BusScheduleLayoutSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
        ],
        controllers: [admin_bus_schedule_layout_controller_1.AdminBusScheduleLayoutController],
        providers: [admin_bus_schedule_layout_service_1.AdminBusScheduleLayoutService],
        exports: [admin_bus_schedule_layout_service_1.AdminBusScheduleLayoutService],
    })
], AdminBusScheduleLayoutModule);
//# sourceMappingURL=admin-bus-schedule-layout.module.js.map
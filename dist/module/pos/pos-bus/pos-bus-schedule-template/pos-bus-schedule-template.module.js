"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBusScheduleTemplateModule = void 0;
const bus_schedule_template_schema_1 = require("../../../core/bus/bus-schedule-template/schema/bus-schedule-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_bus_schedule_template_controller_1 = require("./pos-bus-schedule-template.controller");
const pos_bus_schedule_template_service_1 = require("./pos-bus-schedule-template.service");
const bus_schedule_template_module_1 = require("../../../core/bus/bus-schedule-template/bus-schedule-template.module");
let PosBusScheduleTemplateModule = class PosBusScheduleTemplateModule {
};
exports.PosBusScheduleTemplateModule = PosBusScheduleTemplateModule;
exports.PosBusScheduleTemplateModule = PosBusScheduleTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_template_schema_1.BusScheduleTemplateDocument.name, schema: bus_schedule_template_schema_1.BusScheduleTemplateSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_template_module_1.BusScheduleTemplateModule),
        ],
        controllers: [pos_bus_schedule_template_controller_1.PosBusScheduleTemplateController],
        providers: [pos_bus_schedule_template_service_1.PosBusScheduleTemplateService],
        exports: [pos_bus_schedule_template_service_1.PosBusScheduleTemplateService],
    })
], PosBusScheduleTemplateModule);
//# sourceMappingURL=pos-bus-schedule-template.module.js.map
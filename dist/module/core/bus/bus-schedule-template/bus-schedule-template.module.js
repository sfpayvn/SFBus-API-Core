"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_schedule_template_service_1 = require("./bus-schedule-template.service");
const bus_schedule_template_controller_1 = require("./bus-schedule-template.controller");
const bus_schedule_template_schema_1 = require("./schema/bus-schedule-template.schema");
const bus_module_1 = require("../bus/bus.module");
const bus_layout_template_module_1 = require("../bus-layout-template/bus-layout-template.module");
let BusScheduleTemplateModule = class BusScheduleTemplateModule {
};
exports.BusScheduleTemplateModule = BusScheduleTemplateModule;
exports.BusScheduleTemplateModule = BusScheduleTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_template_schema_1.BusScheduleTemplateDocument.name, schema: bus_schedule_template_schema_1.BusScheduleTemplateSchema }]),
            (0, common_1.forwardRef)(() => bus_layout_template_module_1.BusLayoutTemplateModule),
            (0, common_1.forwardRef)(() => bus_module_1.BusModule),
        ],
        controllers: [bus_schedule_template_controller_1.BusScheduleTemplateController],
        providers: [bus_schedule_template_service_1.BusScheduleTemplateService],
        exports: [bus_schedule_template_service_1.BusScheduleTemplateService],
    })
], BusScheduleTemplateModule);
//# sourceMappingURL=bus-schedule-template.module.js.map
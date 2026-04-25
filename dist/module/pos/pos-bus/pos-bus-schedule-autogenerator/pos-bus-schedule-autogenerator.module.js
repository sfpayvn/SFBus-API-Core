"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBusScheduleAutogeneratorModule = void 0;
const bus_schedule_autogenerator_schema_1 = require("../../../core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_bus_schedule_autogenerator_controller_1 = require("./pos-bus-schedule-autogenerator.controller");
const pos_bus_schedule_autogenerator_service_1 = require("./pos-bus-schedule-autogenerator.service");
const bus_schedule_autogenerator_module_1 = require("../../../core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module");
let PosBusScheduleAutogeneratorModule = class PosBusScheduleAutogeneratorModule {
};
exports.PosBusScheduleAutogeneratorModule = PosBusScheduleAutogeneratorModule;
exports.PosBusScheduleAutogeneratorModule = PosBusScheduleAutogeneratorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorDocument.name, schema: bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorSchema },
            ]),
            (0, common_1.forwardRef)(() => bus_schedule_autogenerator_module_1.BusScheduleAutogeneratorModule),
        ],
        controllers: [pos_bus_schedule_autogenerator_controller_1.PosBusScheduleAutogeneratorController],
        providers: [pos_bus_schedule_autogenerator_service_1.PosBusScheduleAutogeneratorService],
        exports: [pos_bus_schedule_autogenerator_service_1.PosBusScheduleAutogeneratorService],
    })
], PosBusScheduleAutogeneratorModule);
//# sourceMappingURL=pos-bus-schedule-autogenerator.module.js.map
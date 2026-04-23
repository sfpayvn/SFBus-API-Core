"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleLayoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_schedule_layout_controller_1 = require("./bus-schedule-layout.controller");
const bus_schedule_layout_service_1 = require("./bus-schedule-layout.service");
const bus_schedule_layout_schema_1 = require("./schema/bus-schedule-layout.schema");
const booking_module_1 = require("../../booking/booking.module");
const seat_type_module_1 = require("../../seat/seat-type/seat-type.module");
let BusScheduleLayoutModule = class BusScheduleLayoutModule {
};
exports.BusScheduleLayoutModule = BusScheduleLayoutModule;
exports.BusScheduleLayoutModule = BusScheduleLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name, schema: bus_schedule_layout_schema_1.BusScheduleLayoutSchema }]),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => seat_type_module_1.SeatTypeModule),
        ],
        controllers: [bus_schedule_layout_controller_1.BusScheduleLayoutController],
        providers: [bus_schedule_layout_service_1.BusScheduleLayoutService],
        exports: [bus_schedule_layout_service_1.BusScheduleLayoutService],
    })
], BusScheduleLayoutModule);
//# sourceMappingURL=bus-schedule-layout.module.js.map
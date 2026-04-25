"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const booking_controller_1 = require("./booking.controller");
const booking_schema_1 = require("./schema/booking.schema");
const booking_service_1 = require("./booking-service");
const booking_gateway_1 = require("./booking.gateway");
const payment_module_1 = require("../payment/payment.module");
const bus_schedule_module_1 = require("../bus/bus-schedule/bus-schedule.module");
const counter_module_1 = require("../counter/counter.module");
const bus_schedule_layout_module_1 = require("../bus/bus-schedule-layout/bus-schedule-layout.module");
const payment_method_module_1 = require("../payment-method/payment-method.module");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.BookingDocument.name, schema: booking_schema_1.BookingSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_module_1.BusScheduleModule),
            (0, common_1.forwardRef)(() => counter_module_1.CounterModule),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            (0, common_1.forwardRef)(() => payment_method_module_1.PaymentMethodModule),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
        ],
        controllers: [booking_controller_1.BookingController],
        providers: [booking_service_1.BookingService, booking_gateway_1.BookingGateway],
        exports: [booking_service_1.BookingService],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBookingModule = void 0;
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_booking_controller_1 = require("./pos-booking.controller");
const pos_booking_service_1 = require("./pos-booking-service");
const pos_booking_gateway_1 = require("./pos-booking.gateway");
const booking_module_1 = require("../../core/booking/booking.module");
const pos_payment_module_1 = require("../pos-payment/pos-payment.module");
const pos_tracking_module_1 = require("../pos-tracking/pos-tracking.module");
let PosBookingModule = class PosBookingModule {
};
exports.PosBookingModule = PosBookingModule;
exports.PosBookingModule = PosBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.BookingDocument.name, schema: booking_schema_1.BookingSchema }]),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => pos_payment_module_1.PosPaymentModule),
            (0, common_1.forwardRef)(() => pos_payment_module_1.PosPaymentModule),
            (0, common_1.forwardRef)(() => pos_tracking_module_1.PosTrackingModule),
        ],
        controllers: [pos_booking_controller_1.PosBookingController],
        providers: [pos_booking_service_1.PosBookingService, pos_booking_gateway_1.PosBookingGateway],
        exports: [pos_booking_service_1.PosBookingService],
    })
], PosBookingModule);
//# sourceMappingURL=pos-booking.module.js.map
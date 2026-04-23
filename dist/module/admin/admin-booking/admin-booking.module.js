"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBookingModule = void 0;
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_booking_controller_1 = require("./admin-booking.controller");
const admin_booking_service_1 = require("./admin-booking-service");
const admin_booking_gateway_1 = require("./admin-booking.gateway");
const booking_module_1 = require("../../core/booking/booking.module");
const admin_payment_module_1 = require("../admin-payment/admin-payment.module");
let AdminBookingModule = class AdminBookingModule {
};
exports.AdminBookingModule = AdminBookingModule;
exports.AdminBookingModule = AdminBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.BookingDocument.name, schema: booking_schema_1.BookingSchema }]),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => admin_payment_module_1.AdminPaymentModule),
        ],
        controllers: [admin_booking_controller_1.AdminBookingController],
        providers: [admin_booking_service_1.AdminBookingService, admin_booking_gateway_1.AdminBookingGateway],
        exports: [admin_booking_service_1.AdminBookingService],
    })
], AdminBookingModule);
//# sourceMappingURL=admin-booking.module.js.map
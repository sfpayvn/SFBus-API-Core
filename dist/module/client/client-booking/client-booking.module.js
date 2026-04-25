"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBookingModule = void 0;
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_booking_controller_1 = require("./client-booking.controller");
const client_booking_service_1 = require("./client-booking-service");
const client_booking_gateway_1 = require("./client-booking.gateway");
const booking_module_1 = require("../../core/booking/booking.module");
const client_payment_module_1 = require("../client-payment/client-payment.module");
const client_tracking_module_1 = require("../client-tracking/client-tracking.module");
let ClientBookingModule = class ClientBookingModule {
};
exports.ClientBookingModule = ClientBookingModule;
exports.ClientBookingModule = ClientBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.BookingDocument.name, schema: booking_schema_1.BookingSchema }]),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => client_payment_module_1.ClientPaymentModule),
            client_tracking_module_1.ClientTrackingModule,
        ],
        controllers: [client_booking_controller_1.ClientBookingController],
        providers: [client_booking_service_1.ClientBookingService, client_booking_gateway_1.ClientBookingGateway],
        exports: [client_booking_service_1.ClientBookingService],
    })
], ClientBookingModule);
//# sourceMappingURL=client-booking.module.js.map
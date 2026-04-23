"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPaymentModule = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_payment_service_1 = require("./client-payment-service");
const client_booking_module_1 = require("../client-booking/client-booking.module");
const booking_module_1 = require("../../core/booking/booking.module");
const payment_module_1 = require("../../core/payment/payment.module");
let ClientPaymentModule = class ClientPaymentModule {
};
exports.ClientPaymentModule = ClientPaymentModule;
exports.ClientPaymentModule = ClientPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema }]),
            (0, common_1.forwardRef)(() => client_booking_module_1.ClientBookingModule),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
        ],
        providers: [client_payment_service_1.ClientPaymentService],
        exports: [client_payment_service_1.ClientPaymentService],
    })
], ClientPaymentModule);
//# sourceMappingURL=client-payment.module.js.map
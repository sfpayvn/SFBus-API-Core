"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverPaymentModule = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_payment_service_1 = require("./driver-payment-service");
const driver_payment_controller_1 = require("./driver-payment.controller");
const payment_module_1 = require("../../core/payment/payment.module");
const driver_tracking_module_1 = require("../driver-tracking/driver-tracking.module");
let DriverPaymentModule = class DriverPaymentModule {
};
exports.DriverPaymentModule = DriverPaymentModule;
exports.DriverPaymentModule = DriverPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema }]),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            driver_tracking_module_1.DriverTrackingModule,
        ],
        controllers: [driver_payment_controller_1.DriverPaymentController],
        providers: [driver_payment_service_1.DriverPaymentService],
        exports: [driver_payment_service_1.DriverPaymentService],
    })
], DriverPaymentModule);
//# sourceMappingURL=driver-payment.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosPaymentModule = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_payment_service_1 = require("./pos-payment-service");
const pos_payment_controller_1 = require("./pos-payment.controller");
const payment_module_1 = require("../../core/payment/payment.module");
const pos_tracking_module_1 = require("../pos-tracking/pos-tracking.module");
let PosPaymentModule = class PosPaymentModule {
};
exports.PosPaymentModule = PosPaymentModule;
exports.PosPaymentModule = PosPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema }]),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            pos_tracking_module_1.PosTrackingModule,
        ],
        controllers: [pos_payment_controller_1.PosPaymentController],
        providers: [pos_payment_service_1.PosPaymentService],
        exports: [pos_payment_service_1.PosPaymentService],
    })
], PosPaymentModule);
//# sourceMappingURL=pos-payment.module.js.map
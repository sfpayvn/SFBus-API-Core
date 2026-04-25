"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPaymentModule = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_payment_service_1 = require("./admin-payment-service");
const admin_payment_controller_1 = require("./admin-payment.controller");
const payment_module_1 = require("../../core/payment/payment.module");
const admin_tracking_module_1 = require("../admin-tracking/admin-tracking.module");
let AdminPaymentModule = class AdminPaymentModule {
};
exports.AdminPaymentModule = AdminPaymentModule;
exports.AdminPaymentModule = AdminPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema }]),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            (0, common_1.forwardRef)(() => admin_tracking_module_1.AdminTrackingModule),
        ],
        controllers: [admin_payment_controller_1.AdminPaymentController],
        providers: [admin_payment_service_1.AdminPaymentService],
        exports: [admin_payment_service_1.AdminPaymentService],
    })
], AdminPaymentModule);
//# sourceMappingURL=admin-payment.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosPaymentMethodModule = void 0;
const common_1 = require("@nestjs/common");
const pos_payment_method_controller_1 = require("./pos-payment-method.controller");
const pos_payment_method_service_1 = require("./pos-payment-method-service");
const payment_method_module_1 = require("../../core/payment-method/payment-method.module");
let PosPaymentMethodModule = class PosPaymentMethodModule {
};
exports.PosPaymentMethodModule = PosPaymentMethodModule;
exports.PosPaymentMethodModule = PosPaymentMethodModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => payment_method_module_1.PaymentMethodModule)],
        controllers: [pos_payment_method_controller_1.PosPaymentMethodController],
        providers: [pos_payment_method_service_1.PosPaymentMethodService],
        exports: [pos_payment_method_service_1.PosPaymentMethodService],
    })
], PosPaymentMethodModule);
//# sourceMappingURL=pos-payment-method.module.js.map
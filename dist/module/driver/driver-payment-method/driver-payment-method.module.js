"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverPaymentMethodModule = void 0;
const common_1 = require("@nestjs/common");
const driver_payment_method_controller_1 = require("./driver-payment-method.controller");
const driver_payment_method_service_1 = require("./driver-payment-method-service");
const payment_method_module_1 = require("../../core/payment-method/payment-method.module");
let DriverPaymentMethodModule = class DriverPaymentMethodModule {
};
exports.DriverPaymentMethodModule = DriverPaymentMethodModule;
exports.DriverPaymentMethodModule = DriverPaymentMethodModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => payment_method_module_1.PaymentMethodModule)],
        controllers: [driver_payment_method_controller_1.DriverPaymentMethodController],
        providers: [driver_payment_method_service_1.DriverPaymentMethodService],
        exports: [driver_payment_method_service_1.DriverPaymentMethodService],
    })
], DriverPaymentMethodModule);
//# sourceMappingURL=driver-payment-method.module.js.map
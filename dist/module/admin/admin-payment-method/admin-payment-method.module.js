"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPaymentMethodModule = void 0;
const common_1 = require("@nestjs/common");
const admin_payment_method_controller_1 = require("./admin-payment-method.controller");
const admin_payment_method_service_1 = require("./admin-payment-method-service");
const payment_method_module_1 = require("../../core/payment-method/payment-method.module");
let AdminPaymentMethodModule = class AdminPaymentMethodModule {
};
exports.AdminPaymentMethodModule = AdminPaymentMethodModule;
exports.AdminPaymentMethodModule = AdminPaymentMethodModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => payment_method_module_1.PaymentMethodModule)],
        controllers: [admin_payment_method_controller_1.AdminPaymentMethodController],
        providers: [admin_payment_method_service_1.AdminPaymentMethodService],
        exports: [admin_payment_method_service_1.AdminPaymentMethodService],
    })
], AdminPaymentMethodModule);
//# sourceMappingURL=admin-payment-method.module.js.map
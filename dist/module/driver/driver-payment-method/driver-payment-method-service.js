"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverPaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const payment_method_service_1 = require("../../core/payment-method/payment-method-service");
const status_constants_1 = require("../../../common/constants/status.constants");
let DriverPaymentMethodService = class DriverPaymentMethodService {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    async findAll(tenantIds) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.COMMON_STATUS.ACTIVE],
        };
        filters.push(filterByStatus);
        return this.paymentMethodService.findAll(tenantIds, filters);
    }
    async findOne(id, tenantIds) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.COMMON_STATUS.ACTIVE],
        };
        filters.push(filterByStatus);
        return this.paymentMethodService.findOne(id, tenantIds, filters);
    }
    async findDefault(tenantIds) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.COMMON_STATUS.ACTIVE],
        };
        filters.push(filterByStatus);
        return this.paymentMethodService.findDefault(tenantIds, filters);
    }
};
exports.DriverPaymentMethodService = DriverPaymentMethodService;
exports.DriverPaymentMethodService = DriverPaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_method_service_1.PaymentMethodService))),
    __metadata("design:paramtypes", [payment_method_service_1.PaymentMethodService])
], DriverPaymentMethodService);
//# sourceMappingURL=driver-payment-method-service.js.map
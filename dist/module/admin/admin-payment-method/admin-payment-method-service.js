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
exports.AdminPaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const payment_method_service_1 = require("../../core/payment-method/payment-method-service");
let AdminPaymentMethodService = class AdminPaymentMethodService {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    async create(adminCreatePaymentMethodDto, tenantId) {
        return this.paymentMethodService.create(adminCreatePaymentMethodDto, tenantId);
    }
    async update(adminUpdatePaymentMethodDto, tenantId) {
        return this.paymentMethodService.update(adminUpdatePaymentMethodDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.paymentMethodService.remove(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.paymentMethodService.findAll(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.paymentMethodService.findOne(id, tenantIds);
    }
    async findDefault(tenantIds) {
        return this.paymentMethodService.findDefault(tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.paymentMethodService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminPaymentMethodService = AdminPaymentMethodService;
exports.AdminPaymentMethodService = AdminPaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_method_service_1.PaymentMethodService))),
    __metadata("design:paramtypes", [payment_method_service_1.PaymentMethodService])
], AdminPaymentMethodService);
//# sourceMappingURL=admin-payment-method-service.js.map
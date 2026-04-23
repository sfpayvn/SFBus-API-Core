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
exports.DriverPaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../../core/payment/payment-service");
const driver_tracking_service_1 = require("../driver-tracking/driver-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let DriverPaymentService = class DriverPaymentService {
    constructor(paymentService, driverTrackingService) {
        this.paymentService = paymentService;
        this.driverTrackingService = driverTrackingService;
    }
    async processBookingPayment(driverRequestPaymentDto, tenantId, createdBy) {
        const payments = await this.paymentService.processBookingPayment(driverRequestPaymentDto, tenantId);
        for (const payment of payments) {
            await this.driverTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
                platform: roles_constants_1.ROLE_CONSTANTS.DRIVER,
                metadata: {
                    bookingId: payment.referrentId,
                    paymentId: payment._id,
                    paymentStatus: payment.status,
                    paymentMethodId: payment.paymentMethodId,
                    chargedAmount: payment.chargedAmount,
                    paymentAmount: payment.paymentAmount,
                },
                createdBy,
            }, tenantId);
        }
        return payments;
    }
    async processGoodsPayment(driverRequestPaymentDto, tenantId, createdBy) {
        const payment = await this.paymentService.processGoodsPayment(driverRequestPaymentDto, tenantId, createdBy);
        await this.driverTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
            platform: roles_constants_1.ROLE_CONSTANTS.DRIVER,
            metadata: {
                goodsId: payment.referrentId,
                paymentId: payment._id,
                paymentStatus: payment.status,
                paymentMethodId: payment.paymentMethodId,
                chargedAmount: payment.chargedAmount,
                paymentAmount: payment.paymentAmount,
            },
            createdBy,
        }, tenantId);
        return payment;
    }
    async findAllByReferrentId(referrentId, tenantId) {
        return this.paymentService.findAllByReferrentId(referrentId, tenantId);
    }
};
exports.DriverPaymentService = DriverPaymentService;
exports.DriverPaymentService = DriverPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        driver_tracking_service_1.DriverTrackingService])
], DriverPaymentService);
//# sourceMappingURL=driver-payment-service.js.map
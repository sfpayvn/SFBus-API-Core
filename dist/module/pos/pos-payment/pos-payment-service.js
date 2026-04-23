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
exports.PosPaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../../core/payment/payment-service");
const pos_tracking_service_1 = require("../pos-tracking/pos-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosPaymentService = class PosPaymentService {
    constructor(paymentService, posTrackingService) {
        this.paymentService = paymentService;
        this.posTrackingService = posTrackingService;
    }
    async processBookingPayment(posRequestPaymentDto, tenantId, createdBy) {
        const payments = await this.paymentService.processBookingPayment(posRequestPaymentDto, tenantId);
        for (const payment of payments) {
            await this.posTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
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
    async processGoodsPayment(posRequestPaymentDto, tenantId, createdBy) {
        const payment = await this.paymentService.processGoodsPayment(posRequestPaymentDto, tenantId, createdBy);
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
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
exports.PosPaymentService = PosPaymentService;
exports.PosPaymentService = PosPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        pos_tracking_service_1.PosTrackingService])
], PosPaymentService);
//# sourceMappingURL=pos-payment-service.js.map
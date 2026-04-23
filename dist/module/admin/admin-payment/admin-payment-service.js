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
exports.AdminPaymentService = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_service_1 = require("../../core/payment/payment-service");
const admin_tracking_service_1 = require("../admin-tracking/admin-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminPaymentService = class AdminPaymentService {
    constructor(paymentModel, paymentService, adminTrackingService) {
        this.paymentModel = paymentModel;
        this.paymentService = paymentService;
        this.adminTrackingService = adminTrackingService;
    }
    async processBookingPayment(AdminRequestPaymentDto, tenantId, createdBy) {
        const payments = await this.paymentService.processBookingPayment(AdminRequestPaymentDto, tenantId);
        for (const payment of payments) {
            await this.adminTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
                platform: roles_constants_1.ROLE_CONSTANTS.ADMIN,
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
    async processGoodsPayment(AdminRequestPaymentDto, tenantId, createdBy) {
        const payment = await this.paymentService.processGoodsPayment(AdminRequestPaymentDto, tenantId, createdBy);
        await this.adminTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
            platform: roles_constants_1.ROLE_CONSTANTS.ADMIN,
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
exports.AdminPaymentService = AdminPaymentService;
exports.AdminPaymentService = AdminPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.PaymentDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => admin_tracking_service_1.AdminTrackingService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        payment_service_1.PaymentService,
        admin_tracking_service_1.AdminTrackingService])
], AdminPaymentService);
//# sourceMappingURL=admin-payment-service.js.map
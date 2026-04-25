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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const status_constants_1 = require("../../../common/constants/status.constants");
const class_transformer_1 = require("class-transformer");
const payment_schema_1 = require("./schema/payment.schema");
const payment_dto_1 = require("./dto/payment.dto");
const booking_service_1 = require("../booking/booking-service");
const bus_schedule_layout_service_1 = require("../bus/bus-schedule-layout/bus-schedule-layout.service");
const nanoid_1 = require("nanoid");
const goods_service_1 = require("../goods/goods/goods-service");
let PaymentService = class PaymentService {
    constructor(paymentModel, bookingService, goodsService, busScheduleLayoutService) {
        this.paymentModel = paymentModel;
        this.bookingService = bookingService;
        this.goodsService = goodsService;
        this.busScheduleLayoutService = busScheduleLayoutService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(createPayment, tenantId) {
        const createPaymentModel = new this.paymentModel({ ...createPayment, tenantId });
        createPayment.status = status_constants_1.PAYMENT_STATUS.PENDING;
        const savedPayment = await createPaymentModel.save();
        return (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, savedPayment);
    }
    async processBookingPayment(requestPaymentDto, tenantId) {
        const bookings = await this.bookingService.findAllByBookingGroupNumber(requestPaymentDto.referrentGroupNumber, tenantId);
        const totalAfterDiscount = bookings.reduce((sum, b) => sum + b.afterDiscountTotalPrice, 0);
        const payment2Result = [];
        for (const booking of bookings) {
            const ratio = booking.afterDiscountTotalPrice / totalAfterDiscount;
            const paymentAmountForBooking = Math.floor(requestPaymentDto.totalPrice * ratio);
            const bookingOjectId = new mongoose_2.Types.ObjectId(booking._id.toString());
            const payment2Create = {
                tenantId: new mongoose_2.Types.ObjectId(booking.tenantId),
                paymentNumber: this.generateNumberAlphabet(),
                referrentGroupNumber: requestPaymentDto.referrentGroupNumber,
                referrentId: bookingOjectId,
                referrentNumber: booking.bookingNumber,
                userId: new mongoose_2.Types.ObjectId(booking.userId),
                paymentMethodId: requestPaymentDto.paymentMethodId,
                status: status_constants_1.PAYMENT_STATUS.COMPLETED,
                paymentAmount: requestPaymentDto.totalPrice,
                chargedAmount: paymentAmountForBooking,
                transactionReferrentId: requestPaymentDto.transactionId,
            };
            const createPaymentModel = new this.paymentModel(payment2Create);
            const otherPaymentsModel = await this.paymentModel.find({ referrentId: booking._id, tenantId }).lean().exec();
            const totalOtherPaymentByBooking = otherPaymentsModel.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);
            const bookingStatus = Math.round((totalOtherPaymentByBooking + paymentAmountForBooking) / 1000) * 1000 >=
                booking.afterDiscountTotalPrice
                ? 'paid'
                : 'deposited';
            const requestUpdateSeatsStatus = [];
            for (const bookingItem of booking.bookingItems) {
                const updateSeatStatus = {
                    _id: new mongoose_2.Types.ObjectId(bookingItem.seat._id),
                    bookingStatus: bookingStatus,
                    bookingId: bookingOjectId,
                    bookingNumber: booking.bookingNumber,
                };
                requestUpdateSeatsStatus.push(updateSeatStatus);
            }
            await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(new mongoose_2.Types.ObjectId(booking.busScheduleId), requestUpdateSeatsStatus, tenantId);
            if (bookingStatus !== booking.status) {
                await this.bookingService.updateStatusById(bookingOjectId, bookingStatus, tenantId);
            }
            const paymentModel = await createPaymentModel.save();
            payment2Result.push((0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, paymentModel.toObject()));
        }
        return payment2Result;
    }
    async processGoodsPayment(requestPaymentDto, tenantId, createdBy) {
        const goods = await this.goodsService.findAllByBookingGroupNumber(requestPaymentDto.referrentGroupNumber, tenantId);
        const totalPrice = goods.shippingCost + goods.cod;
        const isCOD = goods.cod > 0;
        const paymentAmountForBooking = Math.floor(requestPaymentDto.totalPrice);
        const payment2Create = {
            tenantId: goods.tenantId,
            paymentNumber: this.generateNumberAlphabet(),
            referrentGroupNumber: requestPaymentDto.referrentGroupNumber,
            referrentId: goods._id,
            referrentNumber: goods.goodsNumber,
            userId: createdBy,
            paymentMethodId: requestPaymentDto.paymentMethodId,
            status: requestPaymentDto.totalPrice > 0 ? status_constants_1.PAYMENT_STATUS.COMPLETED : status_constants_1.PAYMENT_STATUS.REFUNDED,
            paymentAmount: requestPaymentDto.totalPrice,
            chargedAmount: paymentAmountForBooking,
            transactionReferrentId: requestPaymentDto.transactionId,
        };
        const createPaymentModel = new this.paymentModel(payment2Create);
        let goodsPaymentStatus;
        if (requestPaymentDto.totalPrice > 0) {
            const otherPaymentsModel = await this.paymentModel
                .find({ referrentId: goods._id, tenantId, status: status_constants_1.PAYMENT_STATUS.COMPLETED })
                .lean()
                .exec();
            const totalOtherPaymentByBooking = otherPaymentsModel.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);
            const cumulativePayment = totalOtherPaymentByBooking + requestPaymentDto.totalPrice;
            if (cumulativePayment >= totalPrice) {
                goodsPaymentStatus = isCOD ? status_constants_1.GOODS_PAYMENT_STATUS.READY_REFUND : status_constants_1.GOODS_PAYMENT_STATUS.PAID;
            }
            else {
                goodsPaymentStatus = status_constants_1.GOODS_PAYMENT_STATUS.DEPOSITED;
            }
        }
        else {
            goodsPaymentStatus = status_constants_1.GOODS_PAYMENT_STATUS.REFUNDED;
        }
        const requestRequestUpdate = {
            _id: goods._id,
            paymentStatus: goodsPaymentStatus,
        };
        await this.goodsService.updatePaymentGoodsStatus(requestRequestUpdate, tenantId);
        const paymentModel = await createPaymentModel.save();
        const payment = (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, paymentModel.toObject());
        return payment;
    }
    async findAll(tenantId) {
        const paymentsModel = await this.paymentModel.find({ tenantId }).lean().exec();
        return paymentsModel.map((payment) => (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, payment));
    }
    async findAllByReferrentId(referrentId, tenantId) {
        const conditions = {
            referrentId: referrentId,
            tenantId,
        };
        const paymentsModel = await this.paymentModel.find(conditions).lean().exec();
        return paymentsModel.map((payment) => (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, payment));
    }
    async findAllByPaymentGroupNumber(paymentGroupNumber, tenantId) {
        const paymentsModel = await this.paymentModel.find({ paymentGroupNumber, tenantId }).lean().exec();
        return paymentsModel.map((payment) => (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, payment));
    }
    async findOne(id, tenantId) {
        const paymentsModel = await this.paymentModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!paymentsModel) {
            throw new common_1.NotFoundException(`payment with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, paymentsModel);
    }
    async update(id, updatePaymentDto, tenantId) {
        const updatedPayment = await this.paymentModel
            .findOneAndUpdate({ _id: id, tenantId }, updatePaymentDto, { new: true })
            .lean()
            .exec();
        if (!updatedPayment) {
            throw new common_1.NotFoundException(`payment with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, updatedPayment);
    }
    async cleanPaymentPromotion(referrentId, tenantId) {
        await this.paymentModel.updateMany({ referrentId, status: status_constants_1.PAYMENT_STATUS.PENDING, tenantId }, { $unset: { promotionId: '', discountAmount: 0 } });
    }
    async remove(id, tenantId) {
        const result = await this.paymentModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        if (!result) {
            throw new common_1.NotFoundException(`payment with ID "${id}" not found.`);
        }
    }
    async removePaymentsByReferrentIds(referrentIds, tenantId) {
        const result = await this.paymentModel
            .deleteMany({ referrentId: { $in: referrentIds }, tenantId })
            .lean()
            .exec();
        if (!result) {
            throw new common_1.NotFoundException(`payment with ID "${JSON.stringify(referrentIds)}" not found.`);
        }
    }
    async updatePaymentByRedeemPromotion(dto, tenantId) {
        const updatedPayment = await this.paymentModel
            .findOneAndUpdate({ referrentId: dto.referrentId, bookingItemId: dto.bookingItemId, status: status_constants_1.PAYMENT_STATUS.PENDING, tenantId }, { promotionId: dto.promotionId, discountAmount: dto.discountAmount })
            .exec();
        if (!updatedPayment) {
            throw new common_1.NotFoundException(`payment not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(payment_dto_1.PaymentDto, updatedPayment);
    }
    generateNumberAlphabet() {
        return this.nanoid();
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.PaymentDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_service_1.GoodsService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_layout_service_1.BusScheduleLayoutService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        goods_service_1.GoodsService,
        bus_schedule_layout_service_1.BusScheduleLayoutService])
], PaymentService);
//# sourceMappingURL=payment-service.js.map
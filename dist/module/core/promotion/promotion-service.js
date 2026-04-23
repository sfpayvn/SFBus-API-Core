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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const promotion_schema_1 = require("./schema/promotion.schema");
const nanoid_1 = require("nanoid");
const promotion_dto_1 = require("./dto/promotion.dto");
const class_transformer_1 = require("class-transformer");
const booking_service_1 = require("../booking/booking-service");
const payment_service_1 = require("../payment/payment-service");
let PromotionService = class PromotionService {
    constructor(promotionModel, paymentService, bookingService) {
        this.promotionModel = promotionModel;
        this.paymentService = paymentService;
        this.bookingService = bookingService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(createPromotionDto, tenantId) {
        const promotionModel = await this.promotionModel.create({ ...createPromotionDto, tenantId });
        const promotion = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
        const [result] = this.mapImageUrl([promotion]);
        return result || null;
    }
    async findAll(tenantIds) {
        const promotionModel = await this.promotionModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        const promotions = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
        return this.mapImageUrl(promotions);
    }
    async findOne(id, tenantId) {
        const promotionModel = await this.promotionModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!promotionModel) {
            throw new common_1.NotFoundException('promotion not found.');
        }
        const promotion = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
        const [result] = this.mapImageUrl([promotion]);
        return result || null;
    }
    async findAllByRule(userId, bookingIds, tenantId) {
        const promotionModel = await this.promotionModel.find({ tenantId }).lean().exec();
        const promotions = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
        return this.mapImageUrl(promotions);
    }
    async findMassPromotion(tenantId) {
        const promotionModel = await this.promotionModel
            .find({ tenantId, expireDate: { $gte: new Date() } })
            .lean()
            .exec();
        const promotions = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
        return this.mapImageUrl(promotions);
    }
    async update(updatePromotionDto, tenantId) {
        const promotion = await this.promotionModel.findOneAndUpdate({ _id: updatePromotionDto._id, tenantId }, updatePromotionDto, { new: true });
        if (!promotion) {
            throw new common_1.NotFoundException('promotion not found.');
        }
        const dto = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotion);
        const [result] = this.mapImageUrl([dto]);
        return result || null;
    }
    async updates(updatePromotionDto, tenantId) {
        const updatePromises = await Promise.all(updatePromotionDto.map(async (dto) => {
            const updatedPromotion = await this.promotionModel
                .findOneAndUpdate({ _id: dto._id, tenantId }, dto, { new: true })
                .exec();
            if (!updatedPromotion) {
                throw new common_1.NotFoundException('Promotion not found');
            }
            return (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, updatedPromotion);
        }));
        return this.mapImageUrl(updatePromises);
    }
    async remove(id, tenantId) {
        const promotion = await this.promotionModel.findOneAndDelete({ _id: id, tenantId });
        if (!promotion) {
            throw new common_1.NotFoundException('promotion not found.');
        }
        return promotion !== null;
    }
    async redeem(redeemPromotionDto, tenantId) {
        const promotion = await this.checkRedeemRules(redeemPromotionDto, tenantId);
        if (!promotion) {
            return false;
        }
        const bookings = await this.bookingService.findByIds(redeemPromotionDto.bookingIds, tenantId);
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException('bookings not found.');
        }
        const totalPrice = bookings.reduce((sum, bk) => sum + bk.totalPrice, 0);
        const totalItems = bookings.reduce((sum, bk) => sum + bk.bookingItems.length, 0);
        for (const booking of bookings) {
            let totalDisacount = 0;
            for (const item of booking.bookingItems) {
                let discount = 0;
                if (promotion.discountType === 'percentage') {
                    discount = Math.round((totalPrice * promotion.discountValue) / 100);
                }
                else if (promotion.discountType === 'fixed') {
                    discount = promotion.discountValue;
                }
                item.discountAmount = Math.floor(discount / totalItems);
                item.afterDiscountPrice = item.price - item.discountAmount;
                totalDisacount += item.discountAmount;
            }
            booking.discountTotalAmount = totalDisacount;
            booking.afterDiscountTotalPrice = booking.totalPrice - totalDisacount;
            const booking2Update = {
                ...booking,
                _id: new mongoose_2.Types.ObjectId(booking._id),
                tenantId: new mongoose_2.Types.ObjectId(booking.tenantId),
                userId: new mongoose_2.Types.ObjectId(booking.userId),
                busScheduleId: new mongoose_2.Types.ObjectId(booking.busScheduleId),
                busRouteId: new mongoose_2.Types.ObjectId(booking.busRouteId),
                bookingItems: booking.bookingItems.map((item) => ({
                    ...item,
                    _id: new mongoose_2.Types.ObjectId(item._id),
                    departure: new mongoose_2.Types.ObjectId(item.departure),
                    destination: new mongoose_2.Types.ObjectId(item.destination),
                    seat: {
                        ...item.seat,
                        _id: new mongoose_2.Types.ObjectId(item.seat._id),
                    },
                })),
            };
            await this.bookingService.update(booking2Update, tenantId);
        }
        return true;
    }
    async checkRedeemRules(redeemPromotionDto, tenantId) {
        const promotionModel = await this.promotionModel
            .findOne({ _id: redeemPromotionDto.promotionId, tenantId })
            .lean()
            .exec();
        if (!promotionModel) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionModel);
    }
    async searchPromotionPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        {
            const pipeline = await this.buildQuerySearchPromotionPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
            const promotionData = await this.promotionModel.aggregate(pipeline).exec();
            const totalItem = await this.promotionModel.countDocuments({ tenantId: { $in: tenantIds } });
            const promotions = (0, class_transformer_1.plainToInstance)(promotion_dto_1.PromotionDto, promotionData);
            const filteredPromotion = this.mapImageUrl(promotions);
            return {
                pageIdx,
                promotions: filteredPromotion,
                totalPage: Math.ceil(totalItem / pageSize),
                totalItem,
            };
        }
    }
    async buildQuerySearchPromotionPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [
            {
                $match: { tenantId: { $in: tenantIds } },
            },
        ];
        const matchConditions = [];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { promotionNumber: { $regex: keyword, $options: 'i' } },
                    { customerName: { $regex: keyword, $options: 'i' } },
                    { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
                    { customerAddress: { $regex: keyword, $options: 'i' } },
                    { senderName: { $regex: keyword, $options: 'i' } },
                    { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = new Date(value);
                }
                else if (key === 'endDate') {
                    endDateValue = new Date(value);
                }
                else if (key === 'phoneNumber') {
                    matchConditions.push({ customerPhoneNumber: { $regex: value, $options: 'i' } });
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createdAt: rangeCond });
        }
        if (matchConditions.length) {
            pipeline.push({
                $match: { $and: matchConditions },
            });
        }
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
    generatePromotionNumber() {
        return this.nanoid();
    }
    mapImageUrl(promotions) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return promotions.map((promotion) => ({
            ...promotion,
            image: `${process.env.DOMAIN}${port}/file/view/${promotion.imageId.toString()}`,
        }));
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(promotion_schema_1.PromotionDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        payment_service_1.PaymentService,
        booking_service_1.BookingService])
], PromotionService);
//# sourceMappingURL=promotion-service.js.map
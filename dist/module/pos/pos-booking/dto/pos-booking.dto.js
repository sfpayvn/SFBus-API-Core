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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosCancelBookingDto = exports.PosRequestUpdatePaymentMethodByIdsDto = exports.PosSearchBookingPagingRes = exports.PosSearchBookingPagingQuery = exports.PosBookingSortFilter = exports.PosBookingDto = exports.PosBookingItemDto = exports.PosBookingItemSeatDto = exports.PosUserInforBookingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const pos_bus_schedule_dto_1 = require("../../pos-bus/pos-bus-schedule/dto/pos-bus-schedule.dto");
const pos_payment_dto_1 = require("../../pos-payment/dto/pos-payment.dto");
const pos_promotion_dto_1 = require("../../pos-promotion/dto/pos-promotion.dto");
class PosUserInforBookingDto {
}
exports.PosUserInforBookingDto = PosUserInforBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosUserInforBookingDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosUserInforBookingDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosUserInforBookingDto.prototype, "phoneNumber", void 0);
class PosBookingItemSeatDto {
}
exports.PosBookingItemSeatDto = PosBookingItemSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemSeatDto.prototype, "seatNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemSeatDto.prototype, "status", void 0);
class PosBookingItemDto {
}
exports.PosBookingItemDto = PosBookingItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemDto.prototype, "bookingItemNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PosBookingItemSeatDto),
    __metadata("design:type", PosBookingItemSeatDto)
], PosBookingItemDto.prototype, "seat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingItemDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingItemDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingItemDto.prototype, "afterDiscountPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemDto.prototype, "departure", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingItemDto.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBookingItemDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBookingItemDto.prototype, "updatedBy", void 0);
class PosBookingDto {
}
exports.PosBookingDto = PosBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PosUserInforBookingDto),
    __metadata("design:type", PosUserInforBookingDto)
], PosBookingDto.prototype, "userInfo", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "bookingNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => pos_bus_schedule_dto_1.PosBusScheduleDto),
    __metadata("design:type", pos_bus_schedule_dto_1.PosBusScheduleDto)
], PosBookingDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PosBookingItemDto),
    __metadata("design:type", Array)
], PosBookingDto.prototype, "bookingItems", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => pos_promotion_dto_1.PosPromotionDto),
    __metadata("design:type", pos_promotion_dto_1.PosPromotionDto)
], PosBookingDto.prototype, "promotion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => pos_payment_dto_1.PosPaymentDto),
    __metadata("design:type", Array)
], PosBookingDto.prototype, "payments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingDto.prototype, "discountTotalAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosBookingDto.prototype, "afterDiscountTotalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PosBookingDto.prototype, "paymentTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "bookingGroupNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosBookingDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PosBookingDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBookingDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PosBookingDto.prototype, "__v", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBookingDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBookingDto.prototype, "updatedBy", void 0);
class PosBookingSortFilter {
}
exports.PosBookingSortFilter = PosBookingSortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PosBookingSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PosBookingSortFilter.prototype, "value", void 0);
class PosSearchBookingPagingQuery {
}
exports.PosSearchBookingPagingQuery = PosSearchBookingPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBookingPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBookingPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PosSearchBookingPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => PosBookingSortFilter),
    __metadata("design:type", PosBookingSortFilter)
], PosSearchBookingPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => PosBookingSortFilter),
    __metadata("design:type", Array)
], PosSearchBookingPagingQuery.prototype, "filters", void 0);
class PosSearchBookingPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.PosSearchBookingPagingRes = PosSearchBookingPagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosSearchBookingPagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PosBookingDto),
    __metadata("design:type", Array)
], PosSearchBookingPagingRes.prototype, "bookings", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosSearchBookingPagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PosSearchBookingPagingRes.prototype, "totalItem", void 0);
class PosRequestUpdatePaymentMethodByIdsDto {
}
exports.PosRequestUpdatePaymentMethodByIdsDto = PosRequestUpdatePaymentMethodByIdsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], PosRequestUpdatePaymentMethodByIdsDto.prototype, "bookingIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosRequestUpdatePaymentMethodByIdsDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosRequestUpdatePaymentMethodByIdsDto.prototype, "userId", void 0);
class PosCancelBookingDto {
}
exports.PosCancelBookingDto = PosCancelBookingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosCancelBookingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], PosCancelBookingDto.prototype, "bookingIds", void 0);
//# sourceMappingURL=pos-booking.dto.js.map
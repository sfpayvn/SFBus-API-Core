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
exports.DriverRequestUpdatePaymentMethodByIdsDto = exports.DriverSearchBookingPagingRes = exports.DriverSearchBookingPagingQuery = exports.DriverBookingSortFilter = exports.DriverBookingDto = exports.DriverBookingItemDto = exports.DriverBookingItemSeatDto = exports.DriverUserInforBookingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const driver_bus_schedule_dto_1 = require("../../driver-bus/driver-bus-schedule/dto/driver-bus-schedule.dto");
const driver_payment_dto_1 = require("../../driver-payment/dto/driver-payment.dto");
const driver_promotion_dto_1 = require("../../driver-promotion/dto/driver-promotion.dto");
class DriverUserInforBookingDto {
}
exports.DriverUserInforBookingDto = DriverUserInforBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverUserInforBookingDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverUserInforBookingDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverUserInforBookingDto.prototype, "phoneNumber", void 0);
class DriverBookingItemSeatDto {
}
exports.DriverBookingItemSeatDto = DriverBookingItemSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemSeatDto.prototype, "seatNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemSeatDto.prototype, "status", void 0);
class DriverBookingItemDto {
}
exports.DriverBookingItemDto = DriverBookingItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemDto.prototype, "bookingItemNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DriverBookingItemSeatDto),
    __metadata("design:type", DriverBookingItemSeatDto)
], DriverBookingItemDto.prototype, "seat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingItemDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingItemDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingItemDto.prototype, "afterDiscountPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemDto.prototype, "departure", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingItemDto.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBookingItemDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBookingItemDto.prototype, "updatedBy", void 0);
class DriverBookingDto {
}
exports.DriverBookingDto = DriverBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DriverUserInforBookingDto),
    __metadata("design:type", DriverUserInforBookingDto)
], DriverBookingDto.prototype, "userInfo", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "bookingNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => driver_bus_schedule_dto_1.DriverBusScheduleDto),
    __metadata("design:type", driver_bus_schedule_dto_1.DriverBusScheduleDto)
], DriverBookingDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DriverBookingItemDto),
    __metadata("design:type", Array)
], DriverBookingDto.prototype, "bookingItems", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => driver_promotion_dto_1.DriverPromotionDto),
    __metadata("design:type", driver_promotion_dto_1.DriverPromotionDto)
], DriverBookingDto.prototype, "promotion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => driver_payment_dto_1.DriverPaymentDto),
    __metadata("design:type", Array)
], DriverBookingDto.prototype, "payments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingDto.prototype, "discountTotalAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverBookingDto.prototype, "afterDiscountTotalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], DriverBookingDto.prototype, "paymentTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "bookingGroupNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverBookingDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBookingDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBookingDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverBookingDto.prototype, "__v", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBookingDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBookingDto.prototype, "updatedBy", void 0);
class DriverBookingSortFilter {
}
exports.DriverBookingSortFilter = DriverBookingSortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverBookingSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], DriverBookingSortFilter.prototype, "value", void 0);
class DriverSearchBookingPagingQuery {
}
exports.DriverSearchBookingPagingQuery = DriverSearchBookingPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBookingPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBookingPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverSearchBookingPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => DriverBookingSortFilter),
    __metadata("design:type", DriverBookingSortFilter)
], DriverSearchBookingPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => DriverBookingSortFilter),
    __metadata("design:type", Array)
], DriverSearchBookingPagingQuery.prototype, "filters", void 0);
class DriverSearchBookingPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchBookingPagingRes = DriverSearchBookingPagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverSearchBookingPagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DriverBookingDto),
    __metadata("design:type", Array)
], DriverSearchBookingPagingRes.prototype, "bookings", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverSearchBookingPagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DriverSearchBookingPagingRes.prototype, "totalItem", void 0);
class DriverRequestUpdatePaymentMethodByIdsDto {
}
exports.DriverRequestUpdatePaymentMethodByIdsDto = DriverRequestUpdatePaymentMethodByIdsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], DriverRequestUpdatePaymentMethodByIdsDto.prototype, "bookingIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRequestUpdatePaymentMethodByIdsDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRequestUpdatePaymentMethodByIdsDto.prototype, "userId", void 0);
//# sourceMappingURL=driver-booking.dto.js.map
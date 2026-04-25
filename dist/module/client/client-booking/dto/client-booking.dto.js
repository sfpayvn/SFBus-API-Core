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
exports.ClientRequestUpdatePaymentMethodByIdsDto = exports.ClientSearchBookingPagingRes = exports.ClientSearchBookingPagingQuery = exports.ClientBookingSortFilter = exports.ClientBookingDto = exports.ClientBookingItemDto = exports.ClientBookingItemSeatDto = exports.ClientUserInforBookingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const client_bus_schedule_dto_1 = require("../../client-bus/client-bus-schedule/dto/client-bus-schedule.dto");
const client_payment_dto_1 = require("../../client-payment/dto/client-payment.dto");
const client_promotion_dto_1 = require("../../client-promotion/dto/client-promotion.dto");
class ClientUserInforBookingDto {
}
exports.ClientUserInforBookingDto = ClientUserInforBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientUserInforBookingDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientUserInforBookingDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientUserInforBookingDto.prototype, "phoneNumber", void 0);
class ClientBookingItemSeatDto {
}
exports.ClientBookingItemSeatDto = ClientBookingItemSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingItemSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingItemSeatDto.prototype, "seatNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingItemSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingItemSeatDto.prototype, "status", void 0);
class ClientBookingItemDto {
}
exports.ClientBookingItemDto = ClientBookingItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingItemDto.prototype, "bookingItemNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ClientBookingItemSeatDto),
    __metadata("design:type", ClientBookingItemSeatDto)
], ClientBookingItemDto.prototype, "seat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingItemDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingItemDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingItemDto.prototype, "afterDiscountPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingItemDto.prototype, "departure", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingItemDto.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBookingItemDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBookingItemDto.prototype, "updatedBy", void 0);
class ClientBookingDto {
}
exports.ClientBookingDto = ClientBookingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ClientBookingDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ClientUserInforBookingDto),
    __metadata("design:type", ClientUserInforBookingDto)
], ClientBookingDto.prototype, "userInfo", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "bookingNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => client_bus_schedule_dto_1.ClientBusScheduleDto),
    __metadata("design:type", client_bus_schedule_dto_1.ClientBusScheduleDto)
], ClientBookingDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ClientBookingItemDto),
    __metadata("design:type", Array)
], ClientBookingDto.prototype, "bookingItems", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => client_promotion_dto_1.ClientPromotionDto),
    __metadata("design:type", client_promotion_dto_1.ClientPromotionDto)
], ClientBookingDto.prototype, "promotion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => client_payment_dto_1.ClientPaymentDto),
    __metadata("design:type", Array)
], ClientBookingDto.prototype, "payments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingDto.prototype, "discountTotalAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBookingDto.prototype, "afterDiscountTotalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ClientBookingDto.prototype, "paymentTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "bookingGroupNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBookingDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBookingDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBookingDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBookingDto.prototype, "__v", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBookingDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBookingDto.prototype, "updatedBy", void 0);
class ClientBookingSortFilter {
}
exports.ClientBookingSortFilter = ClientBookingSortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientBookingSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ClientBookingSortFilter.prototype, "value", void 0);
class ClientSearchBookingPagingQuery {
}
exports.ClientSearchBookingPagingQuery = ClientSearchBookingPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBookingPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBookingPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBookingPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientBookingSortFilter)
], ClientSearchBookingPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchBookingPagingQuery.prototype, "filters", void 0);
class ClientSearchBookingPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBookingPagingRes = ClientSearchBookingPagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBookingPagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBookingPagingRes.prototype, "bookings", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBookingPagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBookingPagingRes.prototype, "totalItem", void 0);
class ClientRequestUpdatePaymentMethodByIdsDto {
}
exports.ClientRequestUpdatePaymentMethodByIdsDto = ClientRequestUpdatePaymentMethodByIdsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], ClientRequestUpdatePaymentMethodByIdsDto.prototype, "bookingIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientRequestUpdatePaymentMethodByIdsDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientRequestUpdatePaymentMethodByIdsDto.prototype, "userId", void 0);
//# sourceMappingURL=client-booking.dto.js.map
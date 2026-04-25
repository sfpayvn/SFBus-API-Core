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
exports.DriverRequestUpdateBookingItemBoardingDto = exports.DriverUpdateBookingDto = exports.DriverUpdateBookingItemDto = exports.DriverUpdateBookingItemSeatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const driver_create_booking_dto_1 = require("./driver-create-booking.dto");
const status_constants_1 = require("../../../../common/constants/status.constants");
class DriverUpdateBookingItemSeatDto extends (0, mapped_types_1.PartialType)(driver_create_booking_dto_1.DriverCreateBookingItemSeatDto) {
}
exports.DriverUpdateBookingItemSeatDto = DriverUpdateBookingItemSeatDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverUpdateBookingItemSeatDto.prototype, "_id", void 0);
class DriverUpdateBookingItemDto extends (0, mapped_types_1.OmitType)(driver_create_booking_dto_1.DriverCreateBookingItemDto, ['seat']) {
}
exports.DriverUpdateBookingItemDto = DriverUpdateBookingItemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverUpdateBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DriverUpdateBookingItemSeatDto),
    __metadata("design:type", DriverUpdateBookingItemSeatDto)
], DriverUpdateBookingItemDto.prototype, "seat", void 0);
class DriverUpdateBookingDto extends (0, mapped_types_1.OmitType)(driver_create_booking_dto_1.DriverCreateBookingDto, ['bookingItems', 'status']) {
}
exports.DriverUpdateBookingDto = DriverUpdateBookingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverUpdateBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DriverUpdateBookingItemDto),
    __metadata("design:type", Array)
], DriverUpdateBookingDto.prototype, "bookingItems", void 0);
class DriverRequestUpdateBookingItemBoardingDto {
}
exports.DriverRequestUpdateBookingItemBoardingDto = DriverRequestUpdateBookingItemBoardingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([status_constants_1.SEAT_STATUS.ON_BOARD, status_constants_1.SEAT_STATUS.DROPPED_OFF]),
    __metadata("design:type", String)
], DriverRequestUpdateBookingItemBoardingDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], DriverRequestUpdateBookingItemBoardingDto.prototype, "bookingItemIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRequestUpdateBookingItemBoardingDto.prototype, "busScheduleId", void 0);
//# sourceMappingURL=driver-update-booking.dto.js.map
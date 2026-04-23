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
exports.PosUpdateBookingDto = exports.PosUpdateBookingItemDto = exports.PosUpdateBookingItemSeatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pos_create_booking_dto_1 = require("./pos-create-booking.dto");
class PosUpdateBookingItemSeatDto extends (0, mapped_types_1.PartialType)(pos_create_booking_dto_1.PosCreateBookingItemSeatDto) {
}
exports.PosUpdateBookingItemSeatDto = PosUpdateBookingItemSeatDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosUpdateBookingItemSeatDto.prototype, "_id", void 0);
class PosUpdateBookingItemDto extends (0, mapped_types_1.OmitType)(pos_create_booking_dto_1.PosCreateBookingItemDto, ['seat']) {
}
exports.PosUpdateBookingItemDto = PosUpdateBookingItemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosUpdateBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PosUpdateBookingItemSeatDto),
    __metadata("design:type", PosUpdateBookingItemSeatDto)
], PosUpdateBookingItemDto.prototype, "seat", void 0);
class PosUpdateBookingDto extends (0, mapped_types_1.OmitType)(pos_create_booking_dto_1.PosCreateBookingDto, ['bookingItems', 'status']) {
}
exports.PosUpdateBookingDto = PosUpdateBookingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosUpdateBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PosUpdateBookingItemDto),
    __metadata("design:type", Array)
], PosUpdateBookingDto.prototype, "bookingItems", void 0);
//# sourceMappingURL=pos-update-booking.dto.js.map
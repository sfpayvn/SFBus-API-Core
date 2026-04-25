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
exports.UpdateBookingDto = exports.UpdateBookingItemDto = exports.UpdateBookingItemSeatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_booking_dto_1 = require("./create-booking.dto");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateBookingItemSeatDto extends (0, mapped_types_1.PartialType)(create_booking_dto_1.CreateBookingItemSeatDto) {
}
exports.UpdateBookingItemSeatDto = UpdateBookingItemSeatDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateBookingItemSeatDto.prototype, "_id", void 0);
class UpdateBookingItemDto extends (0, mapped_types_1.OmitType)(create_booking_dto_1.CreateBookingItemDto, ['seat']) {
}
exports.UpdateBookingItemDto = UpdateBookingItemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBookingItemSeatDto),
    __metadata("design:type", UpdateBookingItemSeatDto)
], UpdateBookingItemDto.prototype, "seat", void 0);
class UpdateBookingDto extends (0, mapped_types_1.OmitType)(create_booking_dto_1.CreateBookingDto, ['bookingItems', 'status']) {
}
exports.UpdateBookingDto = UpdateBookingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateBookingItemDto),
    __metadata("design:type", Array)
], UpdateBookingDto.prototype, "bookingItems", void 0);
//# sourceMappingURL=update-booking.dto.js.map
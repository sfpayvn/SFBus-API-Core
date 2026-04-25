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
exports.AdminUpdateBookingDto = exports.AdminUpdateBookingItemDto = exports.AdminUpdateBookingItemSeatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const admin_create_booking_dto_1 = require("./admin-create-booking.dto");
class AdminUpdateBookingItemSeatDto extends (0, mapped_types_1.PartialType)(admin_create_booking_dto_1.AdminCreateBookingItemSeatDto) {
}
exports.AdminUpdateBookingItemSeatDto = AdminUpdateBookingItemSeatDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBookingItemSeatDto.prototype, "_id", void 0);
class AdminUpdateBookingItemDto extends (0, mapped_types_1.OmitType)(admin_create_booking_dto_1.AdminCreateBookingItemDto, ['seat']) {
}
exports.AdminUpdateBookingItemDto = AdminUpdateBookingItemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBookingItemDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminUpdateBookingItemSeatDto),
    __metadata("design:type", AdminUpdateBookingItemSeatDto)
], AdminUpdateBookingItemDto.prototype, "seat", void 0);
class AdminUpdateBookingDto extends (0, mapped_types_1.OmitType)(admin_create_booking_dto_1.AdminCreateBookingDto, ['bookingItems', 'status']) {
}
exports.AdminUpdateBookingDto = AdminUpdateBookingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBookingDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminUpdateBookingItemDto),
    __metadata("design:type", Array)
], AdminUpdateBookingDto.prototype, "bookingItems", void 0);
//# sourceMappingURL=admin-update-booking.dto.js.map
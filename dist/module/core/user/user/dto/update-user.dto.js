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
exports.UpdatePasswordUserDto = exports.UpdateUserProfileDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
class UpdateUserProfileDto {
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateUserProfileDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateUserProfileDto.prototype, "avatarId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUserProfileDto.prototype, "addresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['male', 'female', 'other'], {
        message: 'Giới tính không đúng',
    }),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "birthdate", void 0);
class UpdatePasswordUserDto {
}
exports.UpdatePasswordUserDto = UpdatePasswordUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordUserDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordUserDto.prototype, "password", void 0);
//# sourceMappingURL=update-user.dto.js.map
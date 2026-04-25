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
exports.DriverUpdatePasswordUserDto = exports.DriverUpdateUserProfileDto = exports.DriverUpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const driver_create_user_dto_1 = require("./driver-create-user.dto");
class DriverUpdateUserDto extends (0, mapped_types_1.PartialType)(driver_create_user_dto_1.DriverCreateUserDto) {
    constructor() {
        super(...arguments);
        this.isEmailVerified = false;
        this.isLocked = false;
        this.isDeleted = false;
    }
}
exports.DriverUpdateUserDto = DriverUpdateUserDto;
class DriverUpdateUserProfileDto {
}
exports.DriverUpdateUserProfileDto = DriverUpdateUserProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverUpdateUserProfileDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverUpdateUserProfileDto.prototype, "avatarId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverUpdateUserProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DriverUpdateUserProfileDto.prototype, "addresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], DriverUpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['male', 'female', 'other'], {
        message: 'Giới tính không đúng',
    }),
    __metadata("design:type", String)
], DriverUpdateUserProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DriverUpdateUserProfileDto.prototype, "birthdate", void 0);
class DriverUpdatePasswordUserDto {
}
exports.DriverUpdatePasswordUserDto = DriverUpdatePasswordUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverUpdatePasswordUserDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverUpdatePasswordUserDto.prototype, "password", void 0);
//# sourceMappingURL=driver-update-user.dto.js.map
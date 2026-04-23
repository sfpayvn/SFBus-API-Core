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
exports.AdminUpdatePasswordUserDto = exports.AdminUpdateUserProfileDto = exports.AdminUpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const admin_create_user_dto_1 = require("./admin-create-user.dto");
class AdminUpdateUserDto extends (0, mapped_types_1.PartialType)(admin_create_user_dto_1.AdminCreateUserDto) {
    constructor() {
        super(...arguments);
        this.isEmailVerified = false;
        this.isLocked = false;
        this.isDeleted = false;
    }
}
exports.AdminUpdateUserDto = AdminUpdateUserDto;
class AdminUpdateUserProfileDto {
}
exports.AdminUpdateUserProfileDto = AdminUpdateUserProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateUserProfileDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateUserProfileDto.prototype, "avatarId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateUserProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminUpdateUserProfileDto.prototype, "addresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminUpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['male', 'female', 'other'], {
        message: 'Giới tính không đúng',
    }),
    __metadata("design:type", String)
], AdminUpdateUserProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdminUpdateUserProfileDto.prototype, "birthdate", void 0);
class AdminUpdatePasswordUserDto {
}
exports.AdminUpdatePasswordUserDto = AdminUpdatePasswordUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdatePasswordUserDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdatePasswordUserDto.prototype, "password", void 0);
//# sourceMappingURL=admin-update-user.dto.js.map
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
exports.ClientUpdatePasswordUserDto = exports.ClientUpdateUserProfileDto = exports.ClientUpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_1 = require("mongoose");
const client_create_user_dto_1 = require("./client-create-user.dto");
const class_validator_1 = require("class-validator");
class ClientUpdateUserDto extends (0, mapped_types_1.OmitType)(client_create_user_dto_1.ClientCreateUserDto, ['password']) {
    constructor() {
        super(...arguments);
        this.isEmailVerified = false;
        this.isLocked = false;
        this.isDeleted = false;
    }
}
exports.ClientUpdateUserDto = ClientUpdateUserDto;
class ClientUpdateUserProfileDto {
}
exports.ClientUpdateUserProfileDto = ClientUpdateUserProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientUpdateUserProfileDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientUpdateUserProfileDto.prototype, "avatarId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientUpdateUserProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientUpdateUserProfileDto.prototype, "addresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ClientUpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['male', 'female', 'other'], {
        message: 'Giới tính không đúng',
    }),
    __metadata("design:type", String)
], ClientUpdateUserProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ClientUpdateUserProfileDto.prototype, "birthdate", void 0);
class ClientUpdatePasswordUserDto {
}
exports.ClientUpdatePasswordUserDto = ClientUpdatePasswordUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientUpdatePasswordUserDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientUpdatePasswordUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientUpdatePasswordUserDto.prototype, "otpToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientUpdatePasswordUserDto.prototype, "phoneNumber", void 0);
//# sourceMappingURL=client-update-user.dto.js.map
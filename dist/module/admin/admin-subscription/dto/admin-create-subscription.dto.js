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
exports.AdminCreateSubscriptionDto = exports.AdminCreateSubscriptionLimitationDto = exports.AdminCreteModuleRuleDto = exports.AdminCreateFunctionRuleDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AdminCreateFunctionRuleDto {
}
exports.AdminCreateFunctionRuleDto = AdminCreateFunctionRuleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateFunctionRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateFunctionRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateFunctionRuleDto.prototype, "quota", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateFunctionRuleDto.prototype, "windowType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateFunctionRuleDto.prototype, "windowUnit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateFunctionRuleDto.prototype, "windowSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateFunctionRuleDto.prototype, "burst", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateFunctionRuleDto.prototype, "concurrency", void 0);
class AdminCreteModuleRuleDto {
}
exports.AdminCreteModuleRuleDto = AdminCreteModuleRuleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreteModuleRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => AdminCreateFunctionRuleDto),
    __metadata("design:type", AdminCreateFunctionRuleDto)
], AdminCreteModuleRuleDto.prototype, "moduleRule", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => AdminCreateFunctionRuleDto),
    __metadata("design:type", Array)
], AdminCreteModuleRuleDto.prototype, "functions", void 0);
class AdminCreateSubscriptionLimitationDto {
}
exports.AdminCreateSubscriptionLimitationDto = AdminCreateSubscriptionLimitationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => AdminCreteModuleRuleDto),
    __metadata("design:type", Array)
], AdminCreateSubscriptionLimitationDto.prototype, "modules", void 0);
class AdminCreateSubscriptionDto {
}
exports.AdminCreateSubscriptionDto = AdminCreateSubscriptionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateSubscriptionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminCreateSubscriptionLimitationDto),
    __metadata("design:type", AdminCreateSubscriptionLimitationDto)
], AdminCreateSubscriptionDto.prototype, "limitation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateSubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], AdminCreateSubscriptionDto.prototype, "popular", void 0);
//# sourceMappingURL=admin-create-subscription.dto.js.map
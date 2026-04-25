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
exports.AdminSearchSubscriptionsRes = exports.AdminSearchSubscriptionQuery = exports.AdminSearchSubscriptionQuerySortFilter = exports.AdminSubscriptionDto = exports.AdminSubscriptionLimitationDto = exports.AdminModuleRuleDto = exports.AdminFunctionRuleDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class AdminFunctionRuleDto {
}
exports.AdminFunctionRuleDto = AdminFunctionRuleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminFunctionRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminFunctionRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminFunctionRuleDto.prototype, "quota", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminFunctionRuleDto.prototype, "windowType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminFunctionRuleDto.prototype, "windowUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminFunctionRuleDto.prototype, "windowSize", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminFunctionRuleDto.prototype, "burst", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminFunctionRuleDto.prototype, "concurrency", void 0);
class AdminModuleRuleDto {
}
exports.AdminModuleRuleDto = AdminModuleRuleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminModuleRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AdminFunctionRuleDto),
    __metadata("design:type", AdminFunctionRuleDto)
], AdminModuleRuleDto.prototype, "moduleRule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AdminFunctionRuleDto),
    __metadata("design:type", Array)
], AdminModuleRuleDto.prototype, "functions", void 0);
class AdminSubscriptionLimitationDto {
}
exports.AdminSubscriptionLimitationDto = AdminSubscriptionLimitationDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminSubscriptionLimitationDto.prototype, "defaultAction", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AdminModuleRuleDto),
    __metadata("design:type", Array)
], AdminSubscriptionLimitationDto.prototype, "modules", void 0);
class AdminSubscriptionDto {
}
exports.AdminSubscriptionDto = AdminSubscriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSubscriptionDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminSubscriptionDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AdminSubscriptionLimitationDto),
    __metadata("design:type", AdminSubscriptionLimitationDto)
], AdminSubscriptionDto.prototype, "limitation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminSubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], AdminSubscriptionDto.prototype, "popular", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminSubscriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminSubscriptionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminSubscriptionDto.prototype, "__v", void 0);
class AdminSearchSubscriptionQuerySortFilter {
}
exports.AdminSearchSubscriptionQuerySortFilter = AdminSearchSubscriptionQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchSubscriptionQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchSubscriptionQuerySortFilter.prototype, "value", void 0);
class AdminSearchSubscriptionQuery {
}
exports.AdminSearchSubscriptionQuery = AdminSearchSubscriptionQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchSubscriptionQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchSubscriptionQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchSubscriptionQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchSubscriptionQuerySortFilter)
], AdminSearchSubscriptionQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchSubscriptionQuery.prototype, "filters", void 0);
class AdminSearchSubscriptionsRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchSubscriptionsRes = AdminSearchSubscriptionsRes;
//# sourceMappingURL=admin-subscription.dto.js.map
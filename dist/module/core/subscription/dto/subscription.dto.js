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
exports.SearchSubscriptionsRes = exports.SearchSubscriptionQuery = exports.SearchSubscriptionQuerySortFilter = exports.SubscriptionDto = exports.SubscriptionLimitationDto = exports.ModuleRuleDto = exports.FunctionRuleDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class FunctionRuleDto {
}
exports.FunctionRuleDto = FunctionRuleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FunctionRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FunctionRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FunctionRuleDto.prototype, "quota", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FunctionRuleDto.prototype, "windowType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FunctionRuleDto.prototype, "windowUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FunctionRuleDto.prototype, "windowSize", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FunctionRuleDto.prototype, "burst", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FunctionRuleDto.prototype, "concurrency", void 0);
class ModuleRuleDto {
}
exports.ModuleRuleDto = ModuleRuleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ModuleRuleDto.prototype, "key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => FunctionRuleDto),
    __metadata("design:type", FunctionRuleDto)
], ModuleRuleDto.prototype, "moduleRule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => FunctionRuleDto),
    __metadata("design:type", Array)
], ModuleRuleDto.prototype, "functions", void 0);
class SubscriptionLimitationDto {
}
exports.SubscriptionLimitationDto = SubscriptionLimitationDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SubscriptionLimitationDto.prototype, "defaultAction", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ModuleRuleDto),
    __metadata("design:type", Array)
], SubscriptionLimitationDto.prototype, "modules", void 0);
class SubscriptionDto {
}
exports.SubscriptionDto = SubscriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SubscriptionDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SubscriptionDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SubscriptionLimitationDto),
    __metadata("design:type", SubscriptionLimitationDto)
], SubscriptionDto.prototype, "limitation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SubscriptionDto.prototype, "popular", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], SubscriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], SubscriptionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], SubscriptionDto.prototype, "__v", void 0);
class SearchSubscriptionQuerySortFilter {
}
exports.SearchSubscriptionQuerySortFilter = SearchSubscriptionQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchSubscriptionQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchSubscriptionQuerySortFilter.prototype, "value", void 0);
class SearchSubscriptionQuery {
}
exports.SearchSubscriptionQuery = SearchSubscriptionQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchSubscriptionQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchSubscriptionQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchSubscriptionQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SearchSubscriptionQuerySortFilter)
], SearchSubscriptionQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchSubscriptionQuery.prototype, "filters", void 0);
class SearchSubscriptionsRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchSubscriptionsRes = SearchSubscriptionsRes;
//# sourceMappingURL=subscription.dto.js.map
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
exports.SearchTenantSubscriptionRes = exports.SearchTenantSubscriptionQuery = exports.SearchTenantSubscriptionQuerySortFilter = exports.RegisterSubscriptionDto = exports.TenantSubscriptionDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const status_constants_1 = require("../../../../common/constants/status.constants");
class TenantSubscriptionDto {
}
exports.TenantSubscriptionDto = TenantSubscriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TenantSubscriptionDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TenantSubscriptionDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TenantSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TenantSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TenantSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], TenantSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], TenantSubscriptionDto.prototype, "endAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TenantSubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], TenantSubscriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], TenantSubscriptionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], TenantSubscriptionDto.prototype, "__v", void 0);
class RegisterSubscriptionDto {
}
exports.RegisterSubscriptionDto = RegisterSubscriptionDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], RegisterSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.keys(status_constants_1.DURATION_STATUS)),
    __metadata("design:type", String)
], RegisterSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RegisterSubscriptionDto.prototype, "durationOverride", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterSubscriptionDto.prototype, "replaceCurrent", void 0);
class SearchTenantSubscriptionQuerySortFilter {
}
exports.SearchTenantSubscriptionQuerySortFilter = SearchTenantSubscriptionQuerySortFilter;
class SearchTenantSubscriptionQuery {
}
exports.SearchTenantSubscriptionQuery = SearchTenantSubscriptionQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchTenantSubscriptionQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchTenantSubscriptionQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchTenantSubscriptionQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SearchTenantSubscriptionQuerySortFilter)
], SearchTenantSubscriptionQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchTenantSubscriptionQuery.prototype, "filters", void 0);
class SearchTenantSubscriptionRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchTenantSubscriptionRes = SearchTenantSubscriptionRes;
//# sourceMappingURL=tenant-subscription.dto.js.map
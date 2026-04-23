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
exports.DriverSearchTenantSubscriptionRes = exports.DriverSearchTenantSubscriptionQuery = exports.DriverSearchTenantSubscriptionQuerySortFilter = exports.DriverRegisterSubscriptionForTenantDto = exports.DriverRegisterSubscriptionDto = exports.DriverTenantSubscriptionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class DriverTenantSubscriptionDto {
}
exports.DriverTenantSubscriptionDto = DriverTenantSubscriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverTenantSubscriptionDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverTenantSubscriptionDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverTenantSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverTenantSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverTenantSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverTenantSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverTenantSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], DriverTenantSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], DriverTenantSubscriptionDto.prototype, "endAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverTenantSubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverTenantSubscriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverTenantSubscriptionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverTenantSubscriptionDto.prototype, "__v", void 0);
class DriverRegisterSubscriptionDto {
}
exports.DriverRegisterSubscriptionDto = DriverRegisterSubscriptionDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], DriverRegisterSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DriverRegisterSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['month', 'day']),
    __metadata("design:type", String)
], DriverRegisterSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], DriverRegisterSubscriptionDto.prototype, "durationOverride", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DriverRegisterSubscriptionDto.prototype, "replaceCurrent", void 0);
class DriverRegisterSubscriptionForTenantDto extends DriverRegisterSubscriptionDto {
}
exports.DriverRegisterSubscriptionForTenantDto = DriverRegisterSubscriptionForTenantDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRegisterSubscriptionForTenantDto.prototype, "tenantId", void 0);
class DriverSearchTenantSubscriptionQuerySortFilter {
}
exports.DriverSearchTenantSubscriptionQuerySortFilter = DriverSearchTenantSubscriptionQuerySortFilter;
class DriverSearchTenantSubscriptionQuery {
}
exports.DriverSearchTenantSubscriptionQuery = DriverSearchTenantSubscriptionQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchTenantSubscriptionQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchTenantSubscriptionQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchTenantSubscriptionQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchTenantSubscriptionQuerySortFilter)
], DriverSearchTenantSubscriptionQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DriverSearchTenantSubscriptionQuery.prototype, "filters", void 0);
class DriverSearchTenantSubscriptionRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchTenantSubscriptionRes = DriverSearchTenantSubscriptionRes;
//# sourceMappingURL=driver-tenant-subscription.dto.js.map
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
exports.AdminSearchTenantSubscriptionRes = exports.AdminSearchTenantSubscriptionQuery = exports.AdminSearchTenantSubscriptionQuerySortFilter = exports.AdminRegisterSubscriptionForTenantDto = exports.AdminRegisterSubscriptionDto = exports.AdminTenantSubscriptionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class AdminTenantSubscriptionDto {
}
exports.AdminTenantSubscriptionDto = AdminTenantSubscriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminTenantSubscriptionDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminTenantSubscriptionDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminTenantSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminTenantSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminTenantSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminTenantSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminTenantSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminTenantSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminTenantSubscriptionDto.prototype, "endAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminTenantSubscriptionDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminTenantSubscriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminTenantSubscriptionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminTenantSubscriptionDto.prototype, "__v", void 0);
class AdminRegisterSubscriptionDto {
}
exports.AdminRegisterSubscriptionDto = AdminRegisterSubscriptionDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AdminRegisterSubscriptionDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdminRegisterSubscriptionDto.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['month', 'day']),
    __metadata("design:type", String)
], AdminRegisterSubscriptionDto.prototype, "durationUnit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminRegisterSubscriptionDto.prototype, "durationOverride", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminRegisterSubscriptionDto.prototype, "replaceCurrent", void 0);
class AdminRegisterSubscriptionForTenantDto extends AdminRegisterSubscriptionDto {
}
exports.AdminRegisterSubscriptionForTenantDto = AdminRegisterSubscriptionForTenantDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminRegisterSubscriptionForTenantDto.prototype, "tenantId", void 0);
class AdminSearchTenantSubscriptionQuerySortFilter {
}
exports.AdminSearchTenantSubscriptionQuerySortFilter = AdminSearchTenantSubscriptionQuerySortFilter;
class AdminSearchTenantSubscriptionQuery {
}
exports.AdminSearchTenantSubscriptionQuery = AdminSearchTenantSubscriptionQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchTenantSubscriptionQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchTenantSubscriptionQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchTenantSubscriptionQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchTenantSubscriptionQuerySortFilter)
], AdminSearchTenantSubscriptionQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchTenantSubscriptionQuery.prototype, "filters", void 0);
class AdminSearchTenantSubscriptionRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchTenantSubscriptionRes = AdminSearchTenantSubscriptionRes;
//# sourceMappingURL=admin-tenant-subscription.dto.js.map
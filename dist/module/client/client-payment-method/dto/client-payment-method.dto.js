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
exports.ClientSearchPaymentMethodPagingRes = exports.ClientSearchPaymentMethodPagingQuery = exports.ClientBookingSortFilter = exports.ClientPaymentMethodDto = exports.ClientPaymentBankingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class ClientPaymentBankingDto {
}
exports.ClientPaymentBankingDto = ClientPaymentBankingDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientPaymentBankingDto.prototype, "providerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentBankingDto.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentBankingDto.prototype, "bankName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentBankingDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentBankingDto.prototype, "accountName", void 0);
class ClientPaymentMethodDto {
}
exports.ClientPaymentMethodDto = ClientPaymentMethodDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientPaymentMethodDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientPaymentMethodDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientPaymentMethodDto.prototype, "providerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", ClientPaymentBankingDto)
], ClientPaymentMethodDto.prototype, "banking", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientPaymentMethodDto.prototype, "imageId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientPaymentMethodDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientPaymentMethodDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientPaymentMethodDto.prototype, "isPaymentMethodDefault", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientPaymentMethodDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientPaymentMethodDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientPaymentMethodDto.prototype, "__v", void 0);
class ClientBookingSortFilter {
}
exports.ClientBookingSortFilter = ClientBookingSortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientBookingSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ClientBookingSortFilter.prototype, "value", void 0);
class ClientSearchPaymentMethodPagingQuery {
}
exports.ClientSearchPaymentMethodPagingQuery = ClientSearchPaymentMethodPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchPaymentMethodPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchPaymentMethodPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchPaymentMethodPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientBookingSortFilter)
], ClientSearchPaymentMethodPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchPaymentMethodPagingQuery.prototype, "filters", void 0);
class ClientSearchPaymentMethodPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchPaymentMethodPagingRes = ClientSearchPaymentMethodPagingRes;
//# sourceMappingURL=client-payment-method.dto.js.map
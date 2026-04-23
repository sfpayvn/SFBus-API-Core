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
exports.ClientSearchGoodsPagingRes = exports.ClientSearchGoodsCategoryPagingQuery = exports.ClientSearchGoodsCategoryPagingQuerySortFilter = exports.ClientGoodsCategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
class ClientGoodsCategoryDto {
}
exports.ClientGoodsCategoryDto = ClientGoodsCategoryDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsCategoryDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsCategoryDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsCategoryDto.prototype, "icon", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsCategoryDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientGoodsCategoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientGoodsCategoryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientGoodsCategoryDto.prototype, "__v", void 0);
class ClientSearchGoodsCategoryPagingQuerySortFilter {
}
exports.ClientSearchGoodsCategoryPagingQuerySortFilter = ClientSearchGoodsCategoryPagingQuerySortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchGoodsCategoryPagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchGoodsCategoryPagingQuerySortFilter.prototype, "value", void 0);
class ClientSearchGoodsCategoryPagingQuery {
}
exports.ClientSearchGoodsCategoryPagingQuery = ClientSearchGoodsCategoryPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchGoodsCategoryPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchGoodsCategoryPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchGoodsCategoryPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", ClientSearchGoodsCategoryPagingQuerySortFilter)
], ClientSearchGoodsCategoryPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchGoodsCategoryPagingQuery.prototype, "filters", void 0);
class ClientSearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchGoodsPagingRes = ClientSearchGoodsPagingRes;
//# sourceMappingURL=client-goods-category.dto.js.map
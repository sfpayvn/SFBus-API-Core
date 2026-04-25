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
exports.SearchGoodsPagingRes = exports.SearchGoodsCategoryPagingQuery = exports.SearchGoodsCategoryPagingQuerySortFilter = exports.GoodsCategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
class GoodsCategoryDto {
}
exports.GoodsCategoryDto = GoodsCategoryDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsCategoryDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsCategoryDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsCategoryDto.prototype, "iconId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsCategoryDto.prototype, "icon", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsCategoryDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], GoodsCategoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], GoodsCategoryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], GoodsCategoryDto.prototype, "__v", void 0);
class SearchGoodsCategoryPagingQuerySortFilter {
}
exports.SearchGoodsCategoryPagingQuerySortFilter = SearchGoodsCategoryPagingQuerySortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], SearchGoodsCategoryPagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], SearchGoodsCategoryPagingQuerySortFilter.prototype, "value", void 0);
class SearchGoodsCategoryPagingQuery {
}
exports.SearchGoodsCategoryPagingQuery = SearchGoodsCategoryPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], SearchGoodsCategoryPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], SearchGoodsCategoryPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchGoodsCategoryPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", SearchGoodsCategoryPagingQuerySortFilter)
], SearchGoodsCategoryPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], SearchGoodsCategoryPagingQuery.prototype, "filters", void 0);
class SearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchGoodsPagingRes = SearchGoodsPagingRes;
//# sourceMappingURL=goods-category.dto.js.map
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
exports.AdminSearchFeeTaxPagingRes = exports.AdminSearchFeeTaxPagingQuery = exports.FeeTaxSortFilter = exports.FeeTaxConditionsDto = exports.FeeTaxDto = exports.UpdateFeeTaxDto = exports.CreateFeeTaxDto = void 0;
var fee_tax_dto_1 = require("../../../core/fee-tax/dto/fee-tax.dto");
Object.defineProperty(exports, "CreateFeeTaxDto", { enumerable: true, get: function () { return fee_tax_dto_1.CreateFeeTaxDto; } });
Object.defineProperty(exports, "UpdateFeeTaxDto", { enumerable: true, get: function () { return fee_tax_dto_1.UpdateFeeTaxDto; } });
Object.defineProperty(exports, "FeeTaxDto", { enumerable: true, get: function () { return fee_tax_dto_1.FeeTaxDto; } });
Object.defineProperty(exports, "FeeTaxConditionsDto", { enumerable: true, get: function () { return fee_tax_dto_1.FeeTaxConditionsDto; } });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FeeTaxSortFilter {
    constructor() {
        this.key = '';
        this.value = 'ascend';
    }
}
exports.FeeTaxSortFilter = FeeTaxSortFilter;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeeTaxSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeeTaxSortFilter.prototype, "value", void 0);
class AdminSearchFeeTaxPagingQuery {
    constructor() {
        this.pageIdx = 0;
        this.pageSize = 0;
        this.keyword = '';
        this.sortBy = new FeeTaxSortFilter();
        this.filters = [];
    }
}
exports.AdminSearchFeeTaxPagingQuery = AdminSearchFeeTaxPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchFeeTaxPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchFeeTaxPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminSearchFeeTaxPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FeeTaxSortFilter),
    __metadata("design:type", FeeTaxSortFilter)
], AdminSearchFeeTaxPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FeeTaxSortFilter),
    __metadata("design:type", Array)
], AdminSearchFeeTaxPagingQuery.prototype, "filters", void 0);
class AdminSearchFeeTaxPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.feeTaxes = [];
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchFeeTaxPagingRes = AdminSearchFeeTaxPagingRes;
//# sourceMappingURL=admin-fee-tax.dto.js.map
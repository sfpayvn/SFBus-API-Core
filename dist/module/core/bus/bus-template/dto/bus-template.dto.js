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
exports.SearchBusTemplateRes = exports.SearchBusTemplateQuery = exports.SearchBusTemplateQuerySortFilter = exports.BusTemplateDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bus_type_dto_1 = require("../../bus-type/dto/bus-type.dto");
class BusTemplateDto {
}
exports.BusTemplateDto = BusTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusTemplateDto.prototype, "busServiceIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusTemplateDto.prototype, "busServices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusTemplateDto.prototype, "busTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_type_dto_1.BusTypeDto)
], BusTemplateDto.prototype, "busType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusTemplateDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], BusTemplateDto.prototype, "__v", void 0);
class SearchBusTemplateQuerySortFilter {
}
exports.SearchBusTemplateQuerySortFilter = SearchBusTemplateQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchBusTemplateQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchBusTemplateQuerySortFilter.prototype, "value", void 0);
class SearchBusTemplateQuery {
}
exports.SearchBusTemplateQuery = SearchBusTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SearchBusTemplateQuerySortFilter)
], SearchBusTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchBusTemplateQuery.prototype, "filters", void 0);
class SearchBusTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchBusTemplateRes = SearchBusTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], SearchBusTemplateRes.prototype, "busTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=bus-template.dto.js.map
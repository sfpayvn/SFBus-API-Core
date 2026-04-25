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
exports.SearchBusRes = exports.SearchBusQuery = exports.SearchBusQuerySortFilter = exports.BusDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bus_template_dto_1 = require("../../bus-template/dto/bus-template.dto");
class BusDto {
}
exports.BusDto = BusDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_template_dto_1.BusTemplateDto)
], BusDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], BusDto.prototype, "__v", void 0);
class SearchBusQuerySortFilter {
}
exports.SearchBusQuerySortFilter = SearchBusQuerySortFilter;
class SearchBusQuery {
}
exports.SearchBusQuery = SearchBusQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SearchBusQuerySortFilter)
], SearchBusQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], SearchBusQuery.prototype, "filters", void 0);
class SearchBusRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchBusRes = SearchBusRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], SearchBusRes.prototype, "buses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusRes.prototype, "totalItem", void 0);
//# sourceMappingURL=bus.dto.js.map
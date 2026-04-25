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
exports.DriverSearchBusTemplateRes = exports.DriverSearchBusLayoutTemplateQuery = exports.DriverSearchBusLayoutTemplateQuerySortFilter = exports.DriverBusLayoutTemplateDto = exports.DriverBusSeatLayoutTemplateDto = exports.DriverSeatDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class DriverSeatDto {
}
exports.DriverSeatDto = DriverSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSeatDto.prototype, "index", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSeatDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverSeatDto.prototype, "status", void 0);
class DriverBusSeatLayoutTemplateDto {
}
exports.DriverBusSeatLayoutTemplateDto = DriverBusSeatLayoutTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusSeatLayoutTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusSeatLayoutTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusSeatLayoutTemplateDto.prototype, "seats", void 0);
class DriverBusLayoutTemplateDto {
}
exports.DriverBusLayoutTemplateDto = DriverBusLayoutTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusLayoutTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusLayoutTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusLayoutTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusLayoutTemplateDto.prototype, "seatLayouts", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], DriverBusLayoutTemplateDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusLayoutTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusLayoutTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverBusLayoutTemplateDto.prototype, "__v", void 0);
class DriverSearchBusLayoutTemplateQuerySortFilter {
}
exports.DriverSearchBusLayoutTemplateQuerySortFilter = DriverSearchBusLayoutTemplateQuerySortFilter;
class DriverSearchBusLayoutTemplateQuery {
}
exports.DriverSearchBusLayoutTemplateQuery = DriverSearchBusLayoutTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusLayoutTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusLayoutTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchBusLayoutTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchBusLayoutTemplateQuerySortFilter)
], DriverSearchBusLayoutTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DriverSearchBusLayoutTemplateQuery.prototype, "filters", void 0);
class DriverSearchBusTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchBusTemplateRes = DriverSearchBusTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverSearchBusTemplateRes.prototype, "busLayoutTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=driver-bus-layout-template.dto.js.map
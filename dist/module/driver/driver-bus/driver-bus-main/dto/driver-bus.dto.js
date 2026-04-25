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
exports.DriverSearchBusRes = exports.DriverSearchBusQuery = exports.DriverSearchBusQuerySortFilter = exports.DriverBusDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const driver_bus_template_dto_1 = require("../../driver-bus-template/dto/driver-bus-template.dto");
class DriverBusDto {
}
exports.DriverBusDto = DriverBusDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", driver_bus_template_dto_1.DriverBusTemplateDto)
], DriverBusDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverBusDto.prototype, "__v", void 0);
class DriverSearchBusQuerySortFilter {
}
exports.DriverSearchBusQuerySortFilter = DriverSearchBusQuerySortFilter;
class DriverSearchBusQuery {
}
exports.DriverSearchBusQuery = DriverSearchBusQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchBusQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchBusQuerySortFilter)
], DriverSearchBusQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], DriverSearchBusQuery.prototype, "filters", void 0);
class DriverSearchBusRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchBusRes = DriverSearchBusRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverSearchBusRes.prototype, "buses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusRes.prototype, "totalItem", void 0);
//# sourceMappingURL=driver-bus.dto.js.map
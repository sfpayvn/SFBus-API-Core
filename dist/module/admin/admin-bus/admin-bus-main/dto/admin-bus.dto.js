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
exports.AdminSearchBusRes = exports.AdminSearchBusQuery = exports.AdminSearchBusQuerySortFilter = exports.AdminBusDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const admin_bus_template_dto_1 = require("../../admin-bus-template/dto/admin-bus-template.dto");
class AdminBusDto {
}
exports.AdminBusDto = AdminBusDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", admin_bus_template_dto_1.AdminBusTemplateDto)
], AdminBusDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminBusDto.prototype, "__v", void 0);
class AdminSearchBusQuerySortFilter {
}
exports.AdminSearchBusQuerySortFilter = AdminSearchBusQuerySortFilter;
class AdminSearchBusQuery {
}
exports.AdminSearchBusQuery = AdminSearchBusQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchBusQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchBusQuerySortFilter)
], AdminSearchBusQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], AdminSearchBusQuery.prototype, "filters", void 0);
class AdminSearchBusRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchBusRes = AdminSearchBusRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminSearchBusRes.prototype, "buses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusRes.prototype, "totalItem", void 0);
//# sourceMappingURL=admin-bus.dto.js.map
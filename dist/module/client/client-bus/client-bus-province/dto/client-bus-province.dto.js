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
exports.ClientSearchBusProvincesRes = exports.ClientSearchBusProvincesQuery = exports.ClientSearchBusProvincesQuerySortFilter = exports.ClientBusProvinceDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class ClientBusProvinceDto {
}
exports.ClientBusProvinceDto = ClientBusProvinceDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusProvinceDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusProvinceDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusProvinceDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientBusProvinceDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientBusProvinceDto.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusProvinceDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusProvinceDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBusProvinceDto.prototype, "__v", void 0);
class ClientSearchBusProvincesQuerySortFilter {
}
exports.ClientSearchBusProvincesQuerySortFilter = ClientSearchBusProvincesQuerySortFilter;
class ClientSearchBusProvincesQuery {
}
exports.ClientSearchBusProvincesQuery = ClientSearchBusProvincesQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusProvincesQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusProvincesQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBusProvincesQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSearchBusProvincesQuerySortFilter)
], ClientSearchBusProvincesQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchBusProvincesQuery.prototype, "filters", void 0);
class ClientSearchBusProvincesRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBusProvincesRes = ClientSearchBusProvincesRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusProvincesRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBusProvincesRes.prototype, "busProvinces", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusProvincesRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusProvincesRes.prototype, "totalItem", void 0);
//# sourceMappingURL=client-bus-province.dto.js.map
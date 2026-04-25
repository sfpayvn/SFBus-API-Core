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
exports.ClientSearchBusRes = exports.ClientSearchBusQuery = exports.ClientSearchBusQuerySortFilter = exports.ClientBusDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_bus_template_dto_1 = require("../../client-bus-template/dto/client-bus-template.dto");
class ClientBusDto {
}
exports.ClientBusDto = ClientBusDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", client_bus_template_dto_1.ClientBusTemplateDto)
], ClientBusDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBusDto.prototype, "__v", void 0);
class ClientSearchBusQuerySortFilter {
}
exports.ClientSearchBusQuerySortFilter = ClientSearchBusQuerySortFilter;
class ClientSearchBusQuery {
}
exports.ClientSearchBusQuery = ClientSearchBusQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBusQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSearchBusQuerySortFilter)
], ClientSearchBusQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], ClientSearchBusQuery.prototype, "filters", void 0);
class ClientSearchBusRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBusRes = ClientSearchBusRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBusRes.prototype, "buses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusRes.prototype, "totalItem", void 0);
//# sourceMappingURL=client-bus.dto.js.map
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
exports.ClientSearchBusTemplateRes = exports.ClientSearchBusLayoutTemplateQuery = exports.ClientSearchBusLayoutTemplateQuerySortFilter = exports.ClientBusLayoutTemplateDto = exports.ClientBusSeatLayoutTemplateDto = exports.ClientSeatDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class ClientSeatDto {
}
exports.ClientSeatDto = ClientSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSeatDto.prototype, "index", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSeatDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientSeatDto.prototype, "status", void 0);
class ClientBusSeatLayoutTemplateDto {
}
exports.ClientBusSeatLayoutTemplateDto = ClientBusSeatLayoutTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusSeatLayoutTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusSeatLayoutTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusSeatLayoutTemplateDto.prototype, "seats", void 0);
class ClientBusLayoutTemplateDto {
}
exports.ClientBusLayoutTemplateDto = ClientBusLayoutTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusLayoutTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusLayoutTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusLayoutTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusLayoutTemplateDto.prototype, "seatLayouts", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientBusLayoutTemplateDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusLayoutTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusLayoutTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBusLayoutTemplateDto.prototype, "__v", void 0);
class ClientSearchBusLayoutTemplateQuerySortFilter {
}
exports.ClientSearchBusLayoutTemplateQuerySortFilter = ClientSearchBusLayoutTemplateQuerySortFilter;
class ClientSearchBusLayoutTemplateQuery {
}
exports.ClientSearchBusLayoutTemplateQuery = ClientSearchBusLayoutTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusLayoutTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusLayoutTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBusLayoutTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSearchBusLayoutTemplateQuerySortFilter)
], ClientSearchBusLayoutTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchBusLayoutTemplateQuery.prototype, "filters", void 0);
class ClientSearchBusTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBusTemplateRes = ClientSearchBusTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBusTemplateRes.prototype, "busLayoutTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=client-bus-layout-template.dto.js.map
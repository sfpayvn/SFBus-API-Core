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
exports.ClientAvailableBySlugQueryDto = exports.ClientAvailableSlugQueryDto = exports.ClientSearchContentLayoutQuery = exports.ClientSearchContentLayoutsResultDto = exports.ClientContentLayoutDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class ClientContentLayoutDto {
}
exports.ClientContentLayoutDto = ClientContentLayoutDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientContentLayoutDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientContentLayoutDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "slug", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientContentLayoutDto.prototype, "imageId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "zones", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value || ''),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "projectData", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientContentLayoutDto.prototype, "platform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClientContentLayoutDto.prototype, "isPublish", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ClientContentLayoutDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ClientContentLayoutDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientContentLayoutDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientContentLayoutDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientContentLayoutDto.prototype, "__v", void 0);
class ClientSearchContentLayoutsResultDto {
    constructor() {
        this.contentLayouts = [];
        this.pageIdx = 0;
        this.totalItem = 0;
        this.totalPage = 0;
    }
}
exports.ClientSearchContentLayoutsResultDto = ClientSearchContentLayoutsResultDto;
class ClientSearchContentLayoutQuery {
    constructor() {
        this.pageIdx = 0;
        this.pageSize = 10;
        this.keyword = '';
        this.sortBy = {};
        this.filters = [];
    }
}
exports.ClientSearchContentLayoutQuery = ClientSearchContentLayoutQuery;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClientSearchContentLayoutQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClientSearchContentLayoutQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchContentLayoutQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ClientSearchContentLayoutQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchContentLayoutQuery.prototype, "filters", void 0);
class ClientAvailableSlugQueryDto {
}
exports.ClientAvailableSlugQueryDto = ClientAvailableSlugQueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientAvailableSlugQueryDto.prototype, "appSource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientAvailableSlugQueryDto.prototype, "platform", void 0);
class ClientAvailableBySlugQueryDto {
}
exports.ClientAvailableBySlugQueryDto = ClientAvailableBySlugQueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientAvailableBySlugQueryDto.prototype, "appSource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientAvailableBySlugQueryDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientAvailableBySlugQueryDto.prototype, "slug", void 0);
//# sourceMappingURL=client-content-layout.dto.js.map
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
exports.AdminSearchBusScheduleAutogeneratorQuery = exports.AdminSearchBusSchedulePagingQuerySortFilter = exports.AdminSearchBusScheduleRes = exports.SearchBusScheduleAutogeneratorQuery = exports.AdminBusScheduleAutogeneratorDto = exports.AdminSpecificTimeSlotDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AdminSpecificTimeSlotDto {
}
exports.AdminSpecificTimeSlotDto = AdminSpecificTimeSlotDto;
class AdminBusScheduleAutogeneratorDto {
}
exports.AdminBusScheduleAutogeneratorDto = AdminBusScheduleAutogeneratorDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleAutogeneratorDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleAutogeneratorDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleAutogeneratorDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleAutogeneratorDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleAutogeneratorDto.prototype, "repeatType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminBusScheduleAutogeneratorDto.prototype, "repeatInterval", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleAutogeneratorDto.prototype, "specificTimeSlots", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleAutogeneratorDto.prototype, "repeatDaysPerWeek", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminBusScheduleAutogeneratorDto.prototype, "preGenerateDays", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminBusScheduleAutogeneratorDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminBusScheduleAutogeneratorDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleAutogeneratorDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleAutogeneratorDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleAutogeneratorDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminBusScheduleAutogeneratorDto.prototype, "__v", void 0);
class SearchBusScheduleAutogeneratorQuery {
}
exports.SearchBusScheduleAutogeneratorQuery = SearchBusScheduleAutogeneratorQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusScheduleAutogeneratorQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusScheduleAutogeneratorQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusScheduleAutogeneratorQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchBusScheduleAutogeneratorQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusScheduleAutogeneratorQuery.prototype, "filter", void 0);
class AdminSearchBusScheduleRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchBusScheduleRes = AdminSearchBusScheduleRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminSearchBusScheduleRes.prototype, "busScheduleAutoGenerators", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleRes.prototype, "totalItem", void 0);
class AdminSearchBusSchedulePagingQuerySortFilter {
}
exports.AdminSearchBusSchedulePagingQuerySortFilter = AdminSearchBusSchedulePagingQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchBusSchedulePagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchBusSchedulePagingQuerySortFilter.prototype, "value", void 0);
class AdminSearchBusScheduleAutogeneratorQuery {
}
exports.AdminSearchBusScheduleAutogeneratorQuery = AdminSearchBusScheduleAutogeneratorQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleAutogeneratorQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleAutogeneratorQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchBusScheduleAutogeneratorQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchBusSchedulePagingQuerySortFilter)
], AdminSearchBusScheduleAutogeneratorQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchBusScheduleAutogeneratorQuery.prototype, "filters", void 0);
//# sourceMappingURL=admin-bus-schedule-autogenerator.dto.js.map
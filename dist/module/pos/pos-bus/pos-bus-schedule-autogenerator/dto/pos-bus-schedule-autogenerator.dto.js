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
exports.PosSearchBusScheduleAutogeneratorQuery = exports.PosSearchBusSchedulePagingQuerySortFilter = exports.PosSearchBusScheduleRes = exports.SearchBusScheduleAutogeneratorQuery = exports.PosBusScheduleAutogeneratorDto = exports.PosSpecificTimeSlotDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PosSpecificTimeSlotDto {
}
exports.PosSpecificTimeSlotDto = PosSpecificTimeSlotDto;
class PosBusScheduleAutogeneratorDto {
}
exports.PosBusScheduleAutogeneratorDto = PosBusScheduleAutogeneratorDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleAutogeneratorDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleAutogeneratorDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleAutogeneratorDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleAutogeneratorDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleAutogeneratorDto.prototype, "repeatType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosBusScheduleAutogeneratorDto.prototype, "repeatInterval", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleAutogeneratorDto.prototype, "specificTimeSlots", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleAutogeneratorDto.prototype, "repeatDaysPerWeek", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosBusScheduleAutogeneratorDto.prototype, "preGenerateDays", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PosBusScheduleAutogeneratorDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PosBusScheduleAutogeneratorDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleAutogeneratorDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleAutogeneratorDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleAutogeneratorDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PosBusScheduleAutogeneratorDto.prototype, "__v", void 0);
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
class PosSearchBusScheduleRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.PosSearchBusScheduleRes = PosSearchBusScheduleRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosSearchBusScheduleRes.prototype, "busScheduleAutoGenerators", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleRes.prototype, "totalItem", void 0);
class PosSearchBusSchedulePagingQuerySortFilter {
}
exports.PosSearchBusSchedulePagingQuerySortFilter = PosSearchBusSchedulePagingQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuerySortFilter.prototype, "value", void 0);
class PosSearchBusScheduleAutogeneratorQuery {
}
exports.PosSearchBusScheduleAutogeneratorQuery = PosSearchBusScheduleAutogeneratorQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleAutogeneratorQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleAutogeneratorQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PosSearchBusScheduleAutogeneratorQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PosSearchBusSchedulePagingQuerySortFilter)
], PosSearchBusScheduleAutogeneratorQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PosSearchBusScheduleAutogeneratorQuery.prototype, "filters", void 0);
//# sourceMappingURL=pos-bus-schedule-autogenerator.dto.js.map
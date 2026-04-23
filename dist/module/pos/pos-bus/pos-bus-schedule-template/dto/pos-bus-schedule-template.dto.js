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
exports.PosSearchBusScheduleTemplateRes = exports.PosSearchBusScheduleTemplateQuery = exports.PosSearchBusScheduleTemplateQuerySortFilter = exports.PosBusScheduleTemplateDto = exports.PosBusScheduleTemplateSeatPrices = exports.PosBusScheduleTemplateRouteDto = exports.PosBusScheduleTemplateBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pos_bus_route_dto_1 = require("../../pos-bus-route/dto/pos-bus-route.dto");
const pos_bus_schedule_dto_1 = require("../../pos-bus-schedule/dto/pos-bus-schedule.dto");
class PosBusScheduleTemplateBreakPointsTimeDto {
}
exports.PosBusScheduleTemplateBreakPointsTimeDto = PosBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class PosBusScheduleTemplateRouteDto extends pos_bus_route_dto_1.PosBusRouteDto {
}
exports.PosBusScheduleTemplateRouteDto = PosBusScheduleTemplateRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleTemplateRouteDto.prototype, "breakPoints", void 0);
class PosBusScheduleTemplateSeatPrices extends pos_bus_schedule_dto_1.PosBusSeatPrices {
}
exports.PosBusScheduleTemplateSeatPrices = PosBusScheduleTemplateSeatPrices;
class PosBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.PosBusScheduleTemplateDto = PosBusScheduleTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", PosBusScheduleTemplateRouteDto)
], PosBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PosBusScheduleTemplateDto.prototype, "__v", void 0);
class PosSearchBusScheduleTemplateQuerySortFilter {
}
exports.PosSearchBusScheduleTemplateQuerySortFilter = PosSearchBusScheduleTemplateQuerySortFilter;
class PosSearchBusScheduleTemplateQuery {
}
exports.PosSearchBusScheduleTemplateQuery = PosSearchBusScheduleTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PosSearchBusScheduleTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PosSearchBusScheduleTemplateQuerySortFilter)
], PosSearchBusScheduleTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PosSearchBusScheduleTemplateQuery.prototype, "filters", void 0);
class PosSearchBusScheduleTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.PosSearchBusScheduleTemplateRes = PosSearchBusScheduleTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosSearchBusScheduleTemplateRes.prototype, "busScheduleTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusScheduleTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=pos-bus-schedule-template.dto.js.map
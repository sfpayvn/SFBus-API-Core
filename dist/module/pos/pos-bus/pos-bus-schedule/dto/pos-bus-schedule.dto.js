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
exports.PosSearchBusScheduleDriverQuery = exports.PosSearchBusSchedulePagingRes = exports.PosSearchBusSchedulePagingQuery = exports.PosSearchBusSchedulePagingQuerySortFilter = exports.PosSearchBusScheduleQuery = exports.PosBusScheduleDto = exports.PosBusSeatPrices = exports.PosBusScheduleRouteDto = exports.PosBusScheduleBusDto = exports.PosBusScheduleBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pos_bus_province_dto_1 = require("../../pos-bus-province/dto/pos-bus-province.dto");
const pos_bus_template_dto_1 = require("../../pos-bus-template/dto/pos-bus-template.dto");
const pos_bus_dto_1 = require("../../pos-bus-main/dto/pos-bus.dto");
const pos_bus_route_dto_1 = require("../../pos-bus-route/dto/pos-bus-route.dto");
class PosBusScheduleBreakPointsTimeDto {
}
exports.PosBusScheduleBreakPointsTimeDto = PosBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", pos_bus_province_dto_1.PosBusProvinceDto)
], PosBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
class PosBusScheduleBusDto extends pos_bus_dto_1.PosBusDto {
}
exports.PosBusScheduleBusDto = PosBusScheduleBusDto;
class PosBusScheduleRouteDto extends pos_bus_route_dto_1.PosBusRouteDto {
}
exports.PosBusScheduleRouteDto = PosBusScheduleRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleRouteDto.prototype, "breakPoints", void 0);
class PosBusSeatPrices {
}
exports.PosBusSeatPrices = PosBusSeatPrices;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosBusSeatPrices.prototype, "price", void 0);
class PosBusScheduleDto {
}
exports.PosBusScheduleDto = PosBusScheduleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleDto.prototype, "busDrivers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", PosBusScheduleBusDto)
], PosBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", pos_bus_template_dto_1.PosBusTemplateDto)
], PosBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", PosBusScheduleRouteDto)
], PosBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosBusScheduleDto.prototype, "remainSeat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], PosBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosBusScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PosBusScheduleDto.prototype, "__v", void 0);
class PosSearchBusScheduleQuery {
}
exports.PosSearchBusScheduleQuery = PosSearchBusScheduleQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PosSearchBusScheduleQuery.prototype, "departureDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosSearchBusScheduleQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosSearchBusScheduleQuery.prototype, "destinationId", void 0);
class PosSearchBusSchedulePagingQuerySortFilter {
}
exports.PosSearchBusSchedulePagingQuerySortFilter = PosSearchBusSchedulePagingQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PosSearchBusSchedulePagingQuerySortFilter.prototype, "value", void 0);
class PosSearchBusSchedulePagingQuery {
}
exports.PosSearchBusSchedulePagingQuery = PosSearchBusSchedulePagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusSchedulePagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PosSearchBusSchedulePagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PosSearchBusSchedulePagingQuerySortFilter)
], PosSearchBusSchedulePagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PosSearchBusSchedulePagingQuery.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PosSearchBusSchedulePagingQuery.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosSearchBusSchedulePagingQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosSearchBusSchedulePagingQuery.prototype, "destinationId", void 0);
class PosSearchBusSchedulePagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.PosSearchBusSchedulePagingRes = PosSearchBusSchedulePagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusSchedulePagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosSearchBusSchedulePagingRes.prototype, "busSchedules", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusSchedulePagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosSearchBusSchedulePagingRes.prototype, "totalItem", void 0);
class PosSearchBusScheduleDriverQuery {
}
exports.PosSearchBusScheduleDriverQuery = PosSearchBusScheduleDriverQuery;
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosSearchBusScheduleDriverQuery.prototype, "driverId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], PosSearchBusScheduleDriverQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], PosSearchBusScheduleDriverQuery.prototype, "endDate", void 0);
//# sourceMappingURL=pos-bus-schedule.dto.js.map
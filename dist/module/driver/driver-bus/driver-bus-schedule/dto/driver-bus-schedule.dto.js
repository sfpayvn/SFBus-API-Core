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
exports.SearchBusScheduleDriverQuery = exports.DriverSearchBusSchedulePagingRes = exports.DriverSearchBusSchedulePagingQuery = exports.DriverSearchBusSchedulePagingQuerySortFilter = exports.DriverSearchBusScheduleQuery = exports.DriverBusScheduleDto = exports.DriverBusSeatPrices = exports.DriverBusScheduleRouteDto = exports.DriverBusScheduleBusDto = exports.DriverBusScheduleBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const driver_bus_province_dto_1 = require("../../driver-bus-province/dto/driver-bus-province.dto");
const driver_bus_template_dto_1 = require("../../driver-bus-template/dto/driver-bus-template.dto");
const driver_bus_dto_1 = require("../../driver-bus-main/dto/driver-bus.dto");
const driver_bus_route_dto_1 = require("../../driver-bus-route/dto/driver-bus-route.dto");
class DriverBusScheduleBreakPointsTimeDto {
}
exports.DriverBusScheduleBreakPointsTimeDto = DriverBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", driver_bus_province_dto_1.DriverBusProvinceDto)
], DriverBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
class DriverBusScheduleBusDto extends driver_bus_dto_1.DriverBusDto {
}
exports.DriverBusScheduleBusDto = DriverBusScheduleBusDto;
class DriverBusScheduleRouteDto extends driver_bus_route_dto_1.DriverBusRouteDto {
}
exports.DriverBusScheduleRouteDto = DriverBusScheduleRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleRouteDto.prototype, "breakPoints", void 0);
class DriverBusSeatPrices {
}
exports.DriverBusSeatPrices = DriverBusSeatPrices;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverBusSeatPrices.prototype, "price", void 0);
class DriverBusScheduleDto {
}
exports.DriverBusScheduleDto = DriverBusScheduleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleDto.prototype, "busDrivers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", DriverBusScheduleBusDto)
], DriverBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", driver_bus_template_dto_1.DriverBusTemplateDto)
], DriverBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", DriverBusScheduleRouteDto)
], DriverBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverBusScheduleDto.prototype, "remainSeat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], DriverBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverBusScheduleDto.prototype, "__v", void 0);
class DriverSearchBusScheduleQuery {
}
exports.DriverSearchBusScheduleQuery = DriverSearchBusScheduleQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DriverSearchBusScheduleQuery.prototype, "departureDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSearchBusScheduleQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSearchBusScheduleQuery.prototype, "destinationId", void 0);
class DriverSearchBusSchedulePagingQuerySortFilter {
}
exports.DriverSearchBusSchedulePagingQuerySortFilter = DriverSearchBusSchedulePagingQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DriverSearchBusSchedulePagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DriverSearchBusSchedulePagingQuerySortFilter.prototype, "value", void 0);
class DriverSearchBusSchedulePagingQuery {
}
exports.DriverSearchBusSchedulePagingQuery = DriverSearchBusSchedulePagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusSchedulePagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusSchedulePagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchBusSchedulePagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchBusSchedulePagingQuerySortFilter)
], DriverSearchBusSchedulePagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DriverSearchBusSchedulePagingQuery.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DriverSearchBusSchedulePagingQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DriverSearchBusSchedulePagingQuery.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSearchBusSchedulePagingQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverSearchBusSchedulePagingQuery.prototype, "destinationId", void 0);
class DriverSearchBusSchedulePagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchBusSchedulePagingRes = DriverSearchBusSchedulePagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusSchedulePagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverSearchBusSchedulePagingRes.prototype, "busSchedules", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusSchedulePagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusSchedulePagingRes.prototype, "totalItem", void 0);
class SearchBusScheduleDriverQuery {
}
exports.SearchBusScheduleDriverQuery = SearchBusScheduleDriverQuery;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusScheduleDriverQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchBusSchedulePagingQuerySortFilter)
], SearchBusScheduleDriverQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchBusScheduleDriverQuery.prototype, "filters", void 0);
//# sourceMappingURL=driver-bus-schedule.dto.js.map
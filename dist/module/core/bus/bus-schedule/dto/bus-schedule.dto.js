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
exports.SearchBusScheduleDriverQuery = exports.SearchBusSchedulePagingRes = exports.SearchBusSchedulePagingQuery = exports.BusScheduleSortFilter = exports.SearchBusScheduleQuery = exports.BusScheduleDto = exports.BusSeatPrices = exports.BusScheduleRouteDto = exports.BusScheduleBusDto = exports.BusScheduleBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const bus_dto_1 = require("../../bus/dto/bus.dto");
const bus_route_dto_1 = require("../../bus-route/dto/bus-route.dto");
const bus_province_dto_1 = require("../../bus-province/dto/bus-province.dto");
const bus_template_dto_1 = require("../../bus-template/dto/bus-template.dto");
class BusScheduleBreakPointsTimeDto {
}
exports.BusScheduleBreakPointsTimeDto = BusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_province_dto_1.BusProvinceDto)
], BusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
class BusScheduleBusDto extends bus_dto_1.BusDto {
}
exports.BusScheduleBusDto = BusScheduleBusDto;
class BusScheduleRouteDto extends bus_route_dto_1.BusRouteDto {
}
exports.BusScheduleRouteDto = BusScheduleRouteDto;
class BusSeatPrices {
}
exports.BusSeatPrices = BusSeatPrices;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BusSeatPrices.prototype, "price", void 0);
class BusScheduleDto {
}
exports.BusScheduleDto = BusScheduleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusScheduleDto.prototype, "busDrivers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", BusScheduleBusDto)
], BusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_template_dto_1.BusTemplateDto)
], BusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", BusScheduleRouteDto)
], BusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BusScheduleDto.prototype, "remainSeat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], BusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BusScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], BusScheduleDto.prototype, "__v", void 0);
class SearchBusScheduleQuery {
}
exports.SearchBusScheduleQuery = SearchBusScheduleQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SearchBusScheduleQuery.prototype, "departureDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SearchBusScheduleQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SearchBusScheduleQuery.prototype, "destinationId", void 0);
class BusScheduleSortFilter {
}
exports.BusScheduleSortFilter = BusScheduleSortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BusScheduleSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BusScheduleSortFilter.prototype, "value", void 0);
class SearchBusSchedulePagingQuery {
}
exports.SearchBusSchedulePagingQuery = SearchBusSchedulePagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusSchedulePagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchBusSchedulePagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusSchedulePagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", BusScheduleSortFilter)
], SearchBusSchedulePagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchBusSchedulePagingQuery.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchBusSchedulePagingQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchBusSchedulePagingQuery.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SearchBusSchedulePagingQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SearchBusSchedulePagingQuery.prototype, "destinationId", void 0);
class SearchBusSchedulePagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.SearchBusSchedulePagingRes = SearchBusSchedulePagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusSchedulePagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], SearchBusSchedulePagingRes.prototype, "busSchedules", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusSchedulePagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SearchBusSchedulePagingRes.prototype, "totalItem", void 0);
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
    __metadata("design:type", BusScheduleSortFilter)
], SearchBusScheduleDriverQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchBusScheduleDriverQuery.prototype, "filters", void 0);
//# sourceMappingURL=bus-schedule.dto.js.map
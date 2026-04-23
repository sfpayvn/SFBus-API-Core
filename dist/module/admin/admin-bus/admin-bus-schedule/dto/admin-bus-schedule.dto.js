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
exports.AdminSearchBusScheduleDriverQuery = exports.AdminSearchBusSchedulePagingRes = exports.AdminSearchBusSchedulePagingQuery = exports.AdminSearchBusSchedulePagingQuerySortFilter = exports.AdminSearchBusScheduleQuery = exports.AdminBusScheduleDto = exports.AdminBusSeatPrices = exports.AdminBusScheduleRouteDto = exports.AdminBusScheduleBusDto = exports.AdminBusScheduleBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const admin_bus_province_dto_1 = require("../../admin-bus-province/dto/admin-bus-province.dto");
const admin_bus_template_dto_1 = require("../../admin-bus-template/dto/admin-bus-template.dto");
const admin_bus_dto_1 = require("../../admin-bus-main/dto/admin-bus.dto");
const admin_admin_bus_route_dto_1 = require("../../admin-bus-route/dto/admin-admin-bus-route.dto");
class AdminBusScheduleBreakPointsTimeDto {
}
exports.AdminBusScheduleBreakPointsTimeDto = AdminBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", admin_bus_province_dto_1.AdminBusProvinceDto)
], AdminBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
class AdminBusScheduleBusDto extends admin_bus_dto_1.AdminBusDto {
}
exports.AdminBusScheduleBusDto = AdminBusScheduleBusDto;
class AdminBusScheduleRouteDto extends admin_admin_bus_route_dto_1.AdminBusRouteDto {
}
exports.AdminBusScheduleRouteDto = AdminBusScheduleRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleRouteDto.prototype, "breakPoints", void 0);
class AdminBusSeatPrices {
}
exports.AdminBusSeatPrices = AdminBusSeatPrices;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminBusSeatPrices.prototype, "price", void 0);
class AdminBusScheduleDto {
}
exports.AdminBusScheduleDto = AdminBusScheduleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleDto.prototype, "busDrivers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", AdminBusScheduleBusDto)
], AdminBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", admin_bus_template_dto_1.AdminBusTemplateDto)
], AdminBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", AdminBusScheduleRouteDto)
], AdminBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminBusScheduleDto.prototype, "remainSeat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], AdminBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminBusScheduleDto.prototype, "__v", void 0);
class AdminSearchBusScheduleQuery {
}
exports.AdminSearchBusScheduleQuery = AdminSearchBusScheduleQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AdminSearchBusScheduleQuery.prototype, "departureDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSearchBusScheduleQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSearchBusScheduleQuery.prototype, "destinationId", void 0);
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
class AdminSearchBusSchedulePagingQuery {
}
exports.AdminSearchBusSchedulePagingQuery = AdminSearchBusSchedulePagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusSchedulePagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusSchedulePagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchBusSchedulePagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchBusSchedulePagingQuerySortFilter)
], AdminSearchBusSchedulePagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchBusSchedulePagingQuery.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchBusSchedulePagingQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminSearchBusSchedulePagingQuery.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSearchBusSchedulePagingQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSearchBusSchedulePagingQuery.prototype, "destinationId", void 0);
class AdminSearchBusSchedulePagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchBusSchedulePagingRes = AdminSearchBusSchedulePagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusSchedulePagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminSearchBusSchedulePagingRes.prototype, "busSchedules", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusSchedulePagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusSchedulePagingRes.prototype, "totalItem", void 0);
class AdminSearchBusScheduleDriverQuery {
}
exports.AdminSearchBusScheduleDriverQuery = AdminSearchBusScheduleDriverQuery;
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminSearchBusScheduleDriverQuery.prototype, "driverId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AdminSearchBusScheduleDriverQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AdminSearchBusScheduleDriverQuery.prototype, "endDate", void 0);
//# sourceMappingURL=admin-bus-schedule.dto.js.map
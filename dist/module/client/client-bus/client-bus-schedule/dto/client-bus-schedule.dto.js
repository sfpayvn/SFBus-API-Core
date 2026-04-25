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
exports.ClientSearchBusScheduleDriverQuery = exports.ClientSearchBusSchedulePagingRes = exports.ClientSearchBusSchedulePagingQuery = exports.ClientSearchBusSchedulePagingQuerySortFilter = exports.ClientSearchBusScheduleQuery = exports.ClientBusScheduleDto = exports.ClientBusSeatPrices = exports.ClientBusScheduleRouteDto = exports.ClientBusScheduleBusDto = exports.ClientBusScheduleBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_bus_province_dto_1 = require("../../client-bus-province/dto/client-bus-province.dto");
const client_bus_template_dto_1 = require("../../client-bus-template/dto/client-bus-template.dto");
const client_bus_dto_1 = require("../../client-bus-main/dto/client-bus.dto");
const client_bus_route_dto_1 = require("../../client-bus-route/dto/client-bus-route.dto");
class ClientBusScheduleBreakPointsTimeDto {
}
exports.ClientBusScheduleBreakPointsTimeDto = ClientBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", client_bus_province_dto_1.ClientBusProvinceDto)
], ClientBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
class ClientBusScheduleBusDto extends client_bus_dto_1.ClientBusDto {
}
exports.ClientBusScheduleBusDto = ClientBusScheduleBusDto;
class ClientBusScheduleRouteDto extends client_bus_route_dto_1.ClientBusRouteDto {
}
exports.ClientBusScheduleRouteDto = ClientBusScheduleRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleRouteDto.prototype, "breakPoints", void 0);
class ClientBusSeatPrices {
}
exports.ClientBusSeatPrices = ClientBusSeatPrices;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBusSeatPrices.prototype, "price", void 0);
class ClientBusScheduleDto {
}
exports.ClientBusScheduleDto = ClientBusScheduleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleDto.prototype, "busDrivers", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", ClientBusScheduleBusDto)
], ClientBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", client_bus_template_dto_1.ClientBusTemplateDto)
], ClientBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", ClientBusScheduleRouteDto)
], ClientBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBusScheduleDto.prototype, "remainSeat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], ClientBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBusScheduleDto.prototype, "__v", void 0);
class ClientSearchBusScheduleQuery {
}
exports.ClientSearchBusScheduleQuery = ClientSearchBusScheduleQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ClientSearchBusScheduleQuery.prototype, "departureDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSearchBusScheduleQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSearchBusScheduleQuery.prototype, "destinationId", void 0);
class ClientSearchBusSchedulePagingQuerySortFilter {
}
exports.ClientSearchBusSchedulePagingQuerySortFilter = ClientSearchBusSchedulePagingQuerySortFilter;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchBusSchedulePagingQuerySortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchBusSchedulePagingQuerySortFilter.prototype, "value", void 0);
class ClientSearchBusSchedulePagingQuery {
}
exports.ClientSearchBusSchedulePagingQuery = ClientSearchBusSchedulePagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusSchedulePagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusSchedulePagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBusSchedulePagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSearchBusSchedulePagingQuerySortFilter)
], ClientSearchBusSchedulePagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchBusSchedulePagingQuery.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchBusSchedulePagingQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientSearchBusSchedulePagingQuery.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSearchBusSchedulePagingQuery.prototype, "departureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSearchBusSchedulePagingQuery.prototype, "destinationId", void 0);
class ClientSearchBusSchedulePagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBusSchedulePagingRes = ClientSearchBusSchedulePagingRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusSchedulePagingRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBusSchedulePagingRes.prototype, "busSchedules", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusSchedulePagingRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusSchedulePagingRes.prototype, "totalItem", void 0);
class ClientSearchBusScheduleDriverQuery {
}
exports.ClientSearchBusScheduleDriverQuery = ClientSearchBusScheduleDriverQuery;
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientSearchBusScheduleDriverQuery.prototype, "driverId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ClientSearchBusScheduleDriverQuery.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ClientSearchBusScheduleDriverQuery.prototype, "endDate", void 0);
//# sourceMappingURL=client-bus-schedule.dto.js.map
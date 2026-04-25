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
exports.DriverSearchBusScheduleTemplateRes = exports.DriverSearchBusScheduleTemplateQuery = exports.DriverSearchBusScheduleTemplateQuerySortFilter = exports.DriverBusScheduleTemplateDto = exports.DriverBusScheduleTemplateSeatPrices = exports.DriverBusScheduleTemplateRouteDto = exports.DriverBusScheduleTemplateBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const driver_bus_route_dto_1 = require("../../driver-bus-route/dto/driver-bus-route.dto");
const driver_bus_schedule_dto_1 = require("../../driver-bus-schedule/dto/driver-bus-schedule.dto");
class DriverBusScheduleTemplateBreakPointsTimeDto {
}
exports.DriverBusScheduleTemplateBreakPointsTimeDto = DriverBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class DriverBusScheduleTemplateRouteDto extends driver_bus_route_dto_1.DriverBusRouteDto {
}
exports.DriverBusScheduleTemplateRouteDto = DriverBusScheduleTemplateRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleTemplateRouteDto.prototype, "breakPoints", void 0);
class DriverBusScheduleTemplateSeatPrices extends driver_bus_schedule_dto_1.DriverBusSeatPrices {
}
exports.DriverBusScheduleTemplateSeatPrices = DriverBusScheduleTemplateSeatPrices;
class DriverBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.DriverBusScheduleTemplateDto = DriverBusScheduleTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", DriverBusScheduleTemplateRouteDto)
], DriverBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusScheduleTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverBusScheduleTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverBusScheduleTemplateDto.prototype, "__v", void 0);
class DriverSearchBusScheduleTemplateQuerySortFilter {
}
exports.DriverSearchBusScheduleTemplateQuerySortFilter = DriverSearchBusScheduleTemplateQuerySortFilter;
class DriverSearchBusScheduleTemplateQuery {
}
exports.DriverSearchBusScheduleTemplateQuery = DriverSearchBusScheduleTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusScheduleTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchBusScheduleTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchBusScheduleTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DriverSearchBusScheduleTemplateQuerySortFilter)
], DriverSearchBusScheduleTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DriverSearchBusScheduleTemplateQuery.prototype, "filters", void 0);
class DriverSearchBusScheduleTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchBusScheduleTemplateRes = DriverSearchBusScheduleTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusScheduleTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverSearchBusScheduleTemplateRes.prototype, "busScheduleTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusScheduleTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverSearchBusScheduleTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=driver-bus-schedule-template.dto.js.map
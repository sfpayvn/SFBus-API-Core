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
exports.AdminSearchBusScheduleTemplateRes = exports.AdminSearchBusScheduleTemplateQuery = exports.AdminSearchBusScheduleTemplateQuerySortFilter = exports.AdminBusScheduleTemplateDto = exports.AdminBusScheduleTemplateSeatPrices = exports.AdminBusScheduleTemplateRouteDto = exports.AdminBusScheduleTemplateBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const admin_bus_schedule_dto_1 = require("../../admin-bus-schedule/dto/admin-bus-schedule.dto");
const admin_admin_bus_route_dto_1 = require("../../admin-bus-route/dto/admin-admin-bus-route.dto");
class AdminBusScheduleTemplateBreakPointsTimeDto {
}
exports.AdminBusScheduleTemplateBreakPointsTimeDto = AdminBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class AdminBusScheduleTemplateRouteDto extends admin_admin_bus_route_dto_1.AdminBusRouteDto {
}
exports.AdminBusScheduleTemplateRouteDto = AdminBusScheduleTemplateRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleTemplateRouteDto.prototype, "breakPoints", void 0);
class AdminBusScheduleTemplateSeatPrices extends admin_bus_schedule_dto_1.AdminBusSeatPrices {
}
exports.AdminBusScheduleTemplateSeatPrices = AdminBusScheduleTemplateSeatPrices;
class AdminBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.AdminBusScheduleTemplateDto = AdminBusScheduleTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", AdminBusScheduleTemplateRouteDto)
], AdminBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], AdminBusScheduleTemplateDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminBusScheduleTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminBusScheduleTemplateDto.prototype, "__v", void 0);
class AdminSearchBusScheduleTemplateQuerySortFilter {
}
exports.AdminSearchBusScheduleTemplateQuerySortFilter = AdminSearchBusScheduleTemplateQuerySortFilter;
class AdminSearchBusScheduleTemplateQuery {
}
exports.AdminSearchBusScheduleTemplateQuery = AdminSearchBusScheduleTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchBusScheduleTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminSearchBusScheduleTemplateQuerySortFilter)
], AdminSearchBusScheduleTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchBusScheduleTemplateQuery.prototype, "filters", void 0);
class AdminSearchBusScheduleTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.AdminSearchBusScheduleTemplateRes = AdminSearchBusScheduleTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminSearchBusScheduleTemplateRes.prototype, "busScheduleTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminSearchBusScheduleTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=admin-admin-bus-schedule-template.dto.js.map
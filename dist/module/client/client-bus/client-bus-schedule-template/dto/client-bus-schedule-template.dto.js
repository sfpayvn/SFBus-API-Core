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
exports.ClientSearchBusScheduleTemplateRes = exports.ClientSearchBusScheduleTemplateQuery = exports.ClientSearchBusScheduleTemplateQuerySortFilter = exports.ClientBusScheduleTemplateDto = exports.ClientBusScheduleTemplateSeatPrices = exports.ClientBusScheduleTemplateRouteDto = exports.ClientBusScheduleTemplateBreakPointsTimeDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_bus_route_dto_1 = require("../../client-bus-route/dto/client-bus-route.dto");
const client_bus_schedule_dto_1 = require("../../client-bus-schedule/dto/client-bus-schedule.dto");
class ClientBusScheduleTemplateBreakPointsTimeDto {
}
exports.ClientBusScheduleTemplateBreakPointsTimeDto = ClientBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class ClientBusScheduleTemplateRouteDto extends client_bus_route_dto_1.ClientBusRouteDto {
}
exports.ClientBusScheduleTemplateRouteDto = ClientBusScheduleTemplateRouteDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleTemplateRouteDto.prototype, "breakPoints", void 0);
class ClientBusScheduleTemplateSeatPrices extends client_bus_schedule_dto_1.ClientBusSeatPrices {
}
exports.ClientBusScheduleTemplateSeatPrices = ClientBusScheduleTemplateSeatPrices;
class ClientBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.ClientBusScheduleTemplateDto = ClientBusScheduleTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", ClientBusScheduleTemplateRouteDto)
], ClientBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusScheduleTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientBusScheduleTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientBusScheduleTemplateDto.prototype, "__v", void 0);
class ClientSearchBusScheduleTemplateQuerySortFilter {
}
exports.ClientSearchBusScheduleTemplateQuerySortFilter = ClientSearchBusScheduleTemplateQuerySortFilter;
class ClientSearchBusScheduleTemplateQuery {
}
exports.ClientSearchBusScheduleTemplateQuery = ClientSearchBusScheduleTemplateQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusScheduleTemplateQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClientSearchBusScheduleTemplateQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientSearchBusScheduleTemplateQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClientSearchBusScheduleTemplateQuerySortFilter)
], ClientSearchBusScheduleTemplateQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClientSearchBusScheduleTemplateQuery.prototype, "filters", void 0);
class ClientSearchBusScheduleTemplateRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.ClientSearchBusScheduleTemplateRes = ClientSearchBusScheduleTemplateRes;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusScheduleTemplateRes.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientSearchBusScheduleTemplateRes.prototype, "busScheduleTemplates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusScheduleTemplateRes.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientSearchBusScheduleTemplateRes.prototype, "totalItem", void 0);
//# sourceMappingURL=client-bus-schedule-template.dto.js.map
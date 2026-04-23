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
exports.AdminCreateBusScheduleTemplateDto = exports.AdminCreateBusRouteScheduleTemplateDto = exports.AdminCreateBusScheduleTemplateBreakPointsTimeDto = exports.AdminCreateBusScheduleTemplateBusSeatPrices = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const admin_create_bus_route_dto_1 = require("../../admin-bus-route/dto/admin-create-bus-route.dto");
class AdminCreateBusScheduleTemplateBusSeatPrices {
}
exports.AdminCreateBusScheduleTemplateBusSeatPrices = AdminCreateBusScheduleTemplateBusSeatPrices;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleTemplateBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleTemplateBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AdminCreateBusScheduleTemplateBusSeatPrices.prototype, "price", void 0);
class AdminCreateBusScheduleTemplateBreakPointsTimeDto extends admin_create_bus_route_dto_1.AdminCreateBusRouteBreakPointsDto {
}
exports.AdminCreateBusScheduleTemplateBreakPointsTimeDto = AdminCreateBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class AdminCreateBusRouteScheduleTemplateDto extends admin_create_bus_route_dto_1.AdminCreateBusRouteDto {
}
exports.AdminCreateBusRouteScheduleTemplateDto = AdminCreateBusRouteScheduleTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleTemplateBreakPointsTimeDto),
    __metadata("design:type", Array)
], AdminCreateBusRouteScheduleTemplateDto.prototype, "breakPoints", void 0);
class AdminCreateBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.AdminCreateBusScheduleTemplateDto = AdminCreateBusScheduleTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminCreateBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminCreateBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminCreateBusRouteScheduleTemplateDto),
    __metadata("design:type", AdminCreateBusRouteScheduleTemplateDto)
], AdminCreateBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleTemplateBusSeatPrices),
    __metadata("design:type", Array)
], AdminCreateBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
//# sourceMappingURL=admin-create-bus-schedule-template.dto.js.map
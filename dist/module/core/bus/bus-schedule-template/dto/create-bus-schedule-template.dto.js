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
exports.CreateBusScheduleTemplateDto = exports.CreateBusRouteScheduleTemplateDto = exports.CreateBusScheduleTemplateBreakPointsTimeDto = exports.CreateBusScheduleTemplateBusSeatPrices = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const create_bus_route_dto_1 = require("../../bus-route/dto/create-bus-route.dto");
class CreateBusScheduleTemplateBusSeatPrices {
}
exports.CreateBusScheduleTemplateBusSeatPrices = CreateBusScheduleTemplateBusSeatPrices;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleTemplateBusSeatPrices.prototype, "seatTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleTemplateBusSeatPrices.prototype, "seatTypeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBusScheduleTemplateBusSeatPrices.prototype, "price", void 0);
class CreateBusScheduleTemplateBreakPointsTimeDto extends create_bus_route_dto_1.CreateBusRouteBreakPointsDto {
}
exports.CreateBusScheduleTemplateBreakPointsTimeDto = CreateBusScheduleTemplateBreakPointsTimeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleTemplateBreakPointsTimeDto.prototype, "timeOffset", void 0);
class CreateBusRouteScheduleTemplateDto extends create_bus_route_dto_1.CreateBusRouteDto {
}
exports.CreateBusRouteScheduleTemplateDto = CreateBusRouteScheduleTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBusScheduleTemplateBreakPointsTimeDto),
    __metadata("design:type", Array)
], CreateBusRouteScheduleTemplateDto.prototype, "breakPoints", void 0);
class CreateBusScheduleTemplateDto {
    constructor() {
        this.busSeatLayoutBlockIds = [];
    }
}
exports.CreateBusScheduleTemplateDto = CreateBusScheduleTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleTemplateDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], CreateBusScheduleTemplateDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleTemplateDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], CreateBusScheduleTemplateDto.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleTemplateDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBusRouteScheduleTemplateDto),
    __metadata("design:type", CreateBusRouteScheduleTemplateDto)
], CreateBusScheduleTemplateDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CreateBusScheduleTemplateBusSeatPrices),
    __metadata("design:type", Array)
], CreateBusScheduleTemplateDto.prototype, "busSeatPrices", void 0);
//# sourceMappingURL=create-bus-schedule-template.dto.js.map
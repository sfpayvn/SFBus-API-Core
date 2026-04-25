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
exports.AdminUpdateBusScheduleDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_bus_schedule_template_dto_1 = require("../../../../core/bus/bus-schedule-template/dto/create-bus-schedule-template.dto");
const create_bus_schedule_dto_1 = require("../../../../core/bus/bus-schedule/dto/create-bus-schedule.dto");
class AdminUpdateBusScheduleDto {
}
exports.AdminUpdateBusScheduleDto = AdminUpdateBusScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminUpdateBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminUpdateBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_bus_schedule_dto_1.CreateBusScheduleBusDto),
    __metadata("design:type", create_bus_schedule_dto_1.CreateBusScheduleBusDto)
], AdminUpdateBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_bus_schedule_dto_1.CreateBusScheduleBusTemplateDto),
    __metadata("design:type", create_bus_schedule_dto_1.CreateBusScheduleBusTemplateDto)
], AdminUpdateBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_bus_schedule_dto_1.CreateBusRouteScheduleDto),
    __metadata("design:type", create_bus_schedule_dto_1.CreateBusRouteScheduleDto)
], AdminUpdateBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_bus_schedule_template_dto_1.CreateBusScheduleTemplateBusSeatPrices),
    __metadata("design:type", Array)
], AdminUpdateBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled']),
    __metadata("design:type", String)
], AdminUpdateBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminUpdateBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminUpdateBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminUpdateBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminUpdateBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
//# sourceMappingURL=admin-update-bus-schedule.dto.js.map
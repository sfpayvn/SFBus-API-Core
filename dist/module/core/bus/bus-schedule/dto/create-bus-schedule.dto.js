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
exports.CreateBusScheduleDto = exports.CreateBusRouteScheduleDto = exports.CreateBusScheduleBreakPointsTimeDto = exports.CreateBusScheduleBusTemplateDto = exports.CreateBusScheduleBusTypeDto = exports.CreateBusScheduleBusServiceDto = exports.CreateBusScheduleBusProvinceDto = exports.CreateBusScheduleBusDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const create_bus_route_dto_1 = require("../../bus-route/dto/create-bus-route.dto");
const create_bus_province_dto_1 = require("../../bus-province/dto/create-bus-province.dto");
const create_bus_route_dto_2 = require("../../bus-route/dto/create-bus-route.dto");
const create_bus_schedule_template_dto_1 = require("../../bus-schedule-template/dto/create-bus-schedule-template.dto");
const create_bus_template_dto_1 = require("../../bus-template/dto/create-bus-template.dto");
const create_bus_service_dto_1 = require("../../bus-service/dto/create-bus-service.dto");
const create_bus_type_dto_1 = require("../../bus-type/dto/create-bus-type.dto");
class CreateBusScheduleBusDto {
}
exports.CreateBusScheduleBusDto = CreateBusScheduleBusDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleBusDto.prototype, "busTemplateId", void 0);
class CreateBusScheduleBusProvinceDto extends create_bus_province_dto_1.CreateBusProvinceDto {
}
exports.CreateBusScheduleBusProvinceDto = CreateBusScheduleBusProvinceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusProvinceDto.prototype, "_id", void 0);
class CreateBusScheduleBusServiceDto extends create_bus_service_dto_1.CreateBusServiceDto {
}
exports.CreateBusScheduleBusServiceDto = CreateBusScheduleBusServiceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusServiceDto.prototype, "_id", void 0);
class CreateBusScheduleBusTypeDto extends create_bus_type_dto_1.CreateBusTypeDto {
}
exports.CreateBusScheduleBusTypeDto = CreateBusScheduleBusTypeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusTypeDto.prototype, "_id", void 0);
class CreateBusScheduleBusTemplateDto extends create_bus_template_dto_1.CreateBusTemplateDto {
}
exports.CreateBusScheduleBusTemplateDto = CreateBusScheduleBusTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBusTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBusServiceDto),
    __metadata("design:type", Array)
], CreateBusScheduleBusTemplateDto.prototype, "busServices", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBusTypeDto),
    __metadata("design:type", CreateBusScheduleBusTypeDto)
], CreateBusScheduleBusTemplateDto.prototype, "busType", void 0);
class CreateBusScheduleBreakPointsTimeDto extends create_bus_route_dto_2.CreateBusRouteBreakPointsDto {
}
exports.CreateBusScheduleBreakPointsTimeDto = CreateBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateBusScheduleBreakPointsTimeDto.prototype, "isOffice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBusProvinceDto),
    __metadata("design:type", CreateBusScheduleBusProvinceDto)
], CreateBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleBreakPointsTimeDto.prototype, "notes", void 0);
class CreateBusRouteScheduleDto extends create_bus_route_dto_1.CreateBusRouteDto {
}
exports.CreateBusRouteScheduleDto = CreateBusRouteScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBreakPointsTimeDto),
    __metadata("design:type", Array)
], CreateBusRouteScheduleDto.prototype, "breakPoints", void 0);
class CreateBusScheduleDto {
}
exports.CreateBusScheduleDto = CreateBusScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], CreateBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBusDto),
    __metadata("design:type", CreateBusScheduleBusDto)
], CreateBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBusScheduleBusTemplateDto),
    __metadata("design:type", CreateBusScheduleBusTemplateDto)
], CreateBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBusRouteScheduleDto),
    __metadata("design:type", CreateBusRouteScheduleDto)
], CreateBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_bus_schedule_template_dto_1.CreateBusScheduleTemplateBusSeatPrices),
    __metadata("design:type", Array)
], CreateBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled']),
    __metadata("design:type", String)
], CreateBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], CreateBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
//# sourceMappingURL=create-bus-schedule.dto.js.map
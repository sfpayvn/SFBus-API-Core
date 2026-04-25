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
exports.AdminCreateBusScheduleDto = exports.AdminCreateBusRouteScheduleDto = exports.AdminCreateBusScheduleBreakPointsTimeDto = exports.AdminCreateBusScheduleBusTemplateDto = exports.AdminCreateBusScheduleBusTypeDto = exports.AdminCreateBusScheduleBusServiceDto = exports.AdminCreateBusScheduleBusProvinceDto = exports.AdminCreateBusScheduleBusDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const create_bus_route_dto_1 = require("../../../../core/bus/bus-route/dto/create-bus-route.dto");
const admin_create_bus_province_dto_1 = require("../../admin-bus-province/dto/admin-create-bus-province.dto");
const admin_create_bus_route_dto_1 = require("../../admin-bus-route/dto/admin-create-bus-route.dto");
const admin_create_bus_schedule_template_dto_1 = require("../../admin-bus-schedule-template/dto/admin-create-bus-schedule-template.dto");
const admin_create_bus_template_dto_1 = require("../../admin-bus-template/dto/admin-create-bus-template.dto");
const admin_create_bus_service_dto_1 = require("../../admin-bus-service/dto/admin-create-bus-service.dto");
const admin_create_bus_type_dto_1 = require("../../admin-bus-type/dto/admin-create-bus-type.dto");
class AdminCreateBusScheduleBusDto {
}
exports.AdminCreateBusScheduleBusDto = AdminCreateBusScheduleBusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleBusDto.prototype, "busTemplateId", void 0);
class AdminCreateBusScheduleBusProvinceDto extends admin_create_bus_province_dto_1.AdminCreateBusProvinceDto {
}
exports.AdminCreateBusScheduleBusProvinceDto = AdminCreateBusScheduleBusProvinceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusProvinceDto.prototype, "_id", void 0);
class AdminCreateBusScheduleBusServiceDto extends admin_create_bus_service_dto_1.AdminCreateBusServiceDto {
}
exports.AdminCreateBusScheduleBusServiceDto = AdminCreateBusScheduleBusServiceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusServiceDto.prototype, "_id", void 0);
class AdminCreateBusScheduleBusTypeDto extends admin_create_bus_type_dto_1.AdminCreateBusTypeDto {
}
exports.AdminCreateBusScheduleBusTypeDto = AdminCreateBusScheduleBusTypeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusTypeDto.prototype, "_id", void 0);
class AdminCreateBusScheduleBusTemplateDto extends admin_create_bus_template_dto_1.AdminCreateBusTemplateDto {
}
exports.AdminCreateBusScheduleBusTemplateDto = AdminCreateBusScheduleBusTemplateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBusTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBusServiceDto),
    __metadata("design:type", Array)
], AdminCreateBusScheduleBusTemplateDto.prototype, "busServices", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBusTypeDto),
    __metadata("design:type", AdminCreateBusScheduleBusTypeDto)
], AdminCreateBusScheduleBusTemplateDto.prototype, "busType", void 0);
class AdminCreateBusScheduleBreakPointsTimeDto extends admin_create_bus_route_dto_1.AdminCreateBusRouteBreakPointsDto {
}
exports.AdminCreateBusScheduleBreakPointsTimeDto = AdminCreateBusScheduleBreakPointsTimeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "busStationId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "isOffice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBusProvinceDto),
    __metadata("design:type", AdminCreateBusScheduleBusProvinceDto)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "detailAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "timeSchedule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleBreakPointsTimeDto.prototype, "notes", void 0);
class AdminCreateBusRouteScheduleDto extends create_bus_route_dto_1.CreateBusRouteDto {
}
exports.AdminCreateBusRouteScheduleDto = AdminCreateBusRouteScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBreakPointsTimeDto),
    __metadata("design:type", Array)
], AdminCreateBusRouteScheduleDto.prototype, "breakPoints", void 0);
class AdminCreateBusScheduleDto {
}
exports.AdminCreateBusScheduleDto = AdminCreateBusScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminCreateBusScheduleDto.prototype, "busDriverIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBusDto),
    __metadata("design:type", AdminCreateBusScheduleBusDto)
], AdminCreateBusScheduleDto.prototype, "bus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleDto.prototype, "busTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminCreateBusScheduleBusTemplateDto),
    __metadata("design:type", AdminCreateBusScheduleBusTemplateDto)
], AdminCreateBusScheduleDto.prototype, "busTemplate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AdminCreateBusRouteScheduleDto),
    __metadata("design:type", AdminCreateBusRouteScheduleDto)
], AdminCreateBusScheduleDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminCreateBusScheduleDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => admin_create_bus_schedule_template_dto_1.AdminCreateBusScheduleTemplateBusSeatPrices),
    __metadata("design:type", Array)
], AdminCreateBusScheduleDto.prototype, "busSeatPrices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled']),
    __metadata("design:type", String)
], AdminCreateBusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AdminCreateBusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], AdminCreateBusScheduleDto.prototype, "busSeatLayoutBlockIds", void 0);
//# sourceMappingURL=admin-create-bus-schedule.dto.js.map
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
exports.AdminUpdateBusScheduleAutogeneratorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const admin_create_bus_schedule_autogenerator_dto_1 = require("./admin-create-bus-schedule-autogenerator.dto");
const status_constants_1 = require("../../../../../common/constants/status.constants");
class AdminUpdateBusScheduleAutogeneratorDto extends (0, mapped_types_1.PartialType)(admin_create_bus_schedule_autogenerator_dto_1.AdminCreateBusScheduleAutogeneratorDto) {
}
exports.AdminUpdateBusScheduleAutogeneratorDto = AdminUpdateBusScheduleAutogeneratorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminUpdateBusScheduleAutogeneratorDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)([
        status_constants_1.EVENT_STATUS.UN_PUBLISHED,
        status_constants_1.EVENT_STATUS.SCHEDULED,
        status_constants_1.EVENT_STATUS.IN_PROGRESS,
        status_constants_1.EVENT_STATUS.COMPLETED,
        status_constants_1.EVENT_STATUS.CANCELLED,
    ]),
    __metadata("design:type", String)
], AdminUpdateBusScheduleAutogeneratorDto.prototype, "status", void 0);
//# sourceMappingURL=admin-update-bus-schedule-autogenerator.dto.js.map
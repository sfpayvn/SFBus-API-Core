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
exports.CreateBusScheduleAutogeneratorDto = exports.CreateeSpecificTimeSlotDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const status_constants_1 = require("../../../../../common/constants/status.constants");
const ValidDateTransformer = () => {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return null;
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    });
};
class CreateeSpecificTimeSlotDto {
}
exports.CreateeSpecificTimeSlotDto = CreateeSpecificTimeSlotDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateeSpecificTimeSlotDto.prototype, "timeSlot", void 0);
class CreateBusScheduleAutogeneratorDto {
}
exports.CreateBusScheduleAutogeneratorDto = CreateBusScheduleAutogeneratorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateBusScheduleAutogeneratorDto.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleAutogeneratorDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateBusScheduleAutogeneratorDto.prototype, "repeatType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBusScheduleAutogeneratorDto.prototype, "repeatInterval", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateeSpecificTimeSlotDto),
    __metadata("design:type", Array)
], CreateBusScheduleAutogeneratorDto.prototype, "specificTimeSlots", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], CreateBusScheduleAutogeneratorDto.prototype, "repeatDaysPerWeek", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateBusScheduleAutogeneratorDto.prototype, "preGenerateDays", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    ValidDateTransformer(),
    __metadata("design:type", Date)
], CreateBusScheduleAutogeneratorDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    ValidDateTransformer(),
    __metadata("design:type", Date)
], CreateBusScheduleAutogeneratorDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)([
        status_constants_1.EVENT_STATUS.UN_PUBLISHED,
        status_constants_1.EVENT_STATUS.SCHEDULED,
        status_constants_1.EVENT_STATUS.IN_PROGRESS,
        status_constants_1.EVENT_STATUS.COMPLETED,
        status_constants_1.EVENT_STATUS.CANCELLED,
    ]),
    __metadata("design:type", String)
], CreateBusScheduleAutogeneratorDto.prototype, "status", void 0);
//# sourceMappingURL=create-bus-schedule-autogenerator.dto.js.map
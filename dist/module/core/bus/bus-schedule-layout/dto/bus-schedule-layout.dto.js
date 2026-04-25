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
exports.RequestUpdateSeatStatusDto = exports.BusScheduleLayoutDto = exports.BusScheduleSeatLayoutTemplateDto = exports.BusScheduleLayoutSeatDto = void 0;
const mongoose_1 = require("mongoose");
const bus_layout_template_dto_1 = require("../../bus-layout-template/dto/bus-layout-template.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BusScheduleLayoutSeatDto {
}
exports.BusScheduleLayoutSeatDto = BusScheduleLayoutSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleLayoutSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BusScheduleLayoutSeatDto.prototype, "index", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleLayoutSeatDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleLayoutSeatDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDto.prototype, "bookingStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDto.prototype, "bookingNumber", void 0);
class BusScheduleSeatLayoutTemplateDto {
}
exports.BusScheduleSeatLayoutTemplateDto = BusScheduleSeatLayoutTemplateDto;
class BusScheduleLayoutDto extends bus_layout_template_dto_1.BusLayoutTemplateDto {
}
exports.BusScheduleLayoutDto = BusScheduleLayoutDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleLayoutDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], BusScheduleLayoutDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BusScheduleLayoutDto.prototype, "seatLayouts", void 0);
class RequestUpdateSeatStatusDto {
}
exports.RequestUpdateSeatStatusDto = RequestUpdateSeatStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdateSeatStatusDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RequestUpdateSeatStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RequestUpdateSeatStatusDto.prototype, "bookingStatus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdateSeatStatusDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RequestUpdateSeatStatusDto.prototype, "bookingNumber", void 0);
//# sourceMappingURL=bus-schedule-layout.dto.js.map
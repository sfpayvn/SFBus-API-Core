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
exports.ClientRequestUpdateSeatStatusDto = exports.ClientBusScheduleLayoutDto = exports.ClientBusScheduleSeatLayoutTemplateDto = exports.ClientBusScheduleLayoutSeatDto = void 0;
const mongoose_1 = require("mongoose");
const client_bus_layout_template_dto_1 = require("../../client-bus-layout-template/dto/client-bus-layout-template.dto");
const class_transformer_1 = require("class-transformer");
class ClientBusScheduleLayoutSeatDto {
}
exports.ClientBusScheduleLayoutSeatDto = ClientBusScheduleLayoutSeatDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleLayoutSeatDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientBusScheduleLayoutSeatDto.prototype, "index", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleLayoutSeatDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleLayoutSeatDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleLayoutSeatDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleLayoutSeatDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ClientBusScheduleLayoutSeatDto.prototype, "bookingStatus", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ClientBusScheduleLayoutSeatDto.prototype, "bookingNumber", void 0);
class ClientBusScheduleSeatLayoutTemplateDto {
}
exports.ClientBusScheduleSeatLayoutTemplateDto = ClientBusScheduleSeatLayoutTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleSeatLayoutTemplateDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientBusScheduleSeatLayoutTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ClientBusScheduleLayoutSeatDto),
    __metadata("design:type", Array)
], ClientBusScheduleSeatLayoutTemplateDto.prototype, "seats", void 0);
class ClientBusScheduleLayoutDto extends client_bus_layout_template_dto_1.ClientBusLayoutTemplateDto {
}
exports.ClientBusScheduleLayoutDto = ClientBusScheduleLayoutDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleLayoutDto.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientBusScheduleLayoutDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ClientBusScheduleSeatLayoutTemplateDto),
    __metadata("design:type", Array)
], ClientBusScheduleLayoutDto.prototype, "seatLayouts", void 0);
class ClientRequestUpdateSeatStatusDto {
}
exports.ClientRequestUpdateSeatStatusDto = ClientRequestUpdateSeatStatusDto;
//# sourceMappingURL=client-bus-schedule-layout.dto.js.map
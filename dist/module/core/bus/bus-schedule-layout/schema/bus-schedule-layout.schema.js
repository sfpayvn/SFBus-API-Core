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
exports.BusScheduleLayoutSchema = exports.BusScheduleLayoutDocument = exports.BusScheduleSeatLayoutTemplateDocument = exports.BusScheduleLayoutSeatDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_layout_template_schema_1 = require("../../bus-layout-template/schema/bus-layout-template.schema");
const mapped_types_1 = require("@nestjs/mapped-types");
class BusScheduleLayoutSeatDocument {
}
exports.BusScheduleLayoutSeatDocument = BusScheduleLayoutSeatDocument;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutSeatDocument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BusScheduleLayoutSeatDocument.prototype, "index", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutSeatDocument.prototype, "typeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutSeatDocument.prototype, "bookingId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDocument.prototype, "bookingStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleLayoutSeatDocument.prototype, "bookingNumber", void 0);
class BusScheduleSeatLayoutTemplateDocument {
}
exports.BusScheduleSeatLayoutTemplateDocument = BusScheduleSeatLayoutTemplateDocument;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleSeatLayoutTemplateDocument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleSeatLayoutTemplateDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], BusScheduleSeatLayoutTemplateDocument.prototype, "seats", void 0);
let BusScheduleLayoutDocument = class BusScheduleLayoutDocument extends (0, mapped_types_1.OmitType)(bus_layout_template_schema_1.BusLayoutTemplateDocument, ['_id', 'seatLayouts']) {
};
exports.BusScheduleLayoutDocument = BusScheduleLayoutDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_layout_templates' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutDocument.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_schedules' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleLayoutDocument.prototype, "busScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [] }),
    __metadata("design:type", Array)
], BusScheduleLayoutDocument.prototype, "seatLayouts", void 0);
exports.BusScheduleLayoutDocument = BusScheduleLayoutDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_schedule_layouts', timestamps: true })
], BusScheduleLayoutDocument);
exports.BusScheduleLayoutSchema = mongoose_1.SchemaFactory.createForClass(BusScheduleLayoutDocument);
//# sourceMappingURL=bus-schedule-layout.schema.js.map
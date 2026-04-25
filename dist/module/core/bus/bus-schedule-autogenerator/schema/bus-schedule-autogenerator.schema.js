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
exports.BusScheduleAutogeneratorSchema = exports.BusScheduleAutogeneratorDocument = exports.SpecificTimeSlotDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class SpecificTimeSlotDocument extends mongoose_2.Document {
}
exports.SpecificTimeSlotDocument = SpecificTimeSlotDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SpecificTimeSlotDocument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SpecificTimeSlotDocument.prototype, "timeSlot", void 0);
let BusScheduleAutogeneratorDocument = class BusScheduleAutogeneratorDocument extends mongoose_2.Document {
};
exports.BusScheduleAutogeneratorDocument = BusScheduleAutogeneratorDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleAutogeneratorDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_schedule_templates' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleAutogeneratorDocument.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleAutogeneratorDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleAutogeneratorDocument.prototype, "repeatType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BusScheduleAutogeneratorDocument.prototype, "repeatInterval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], BusScheduleAutogeneratorDocument.prototype, "specificTimeSlots", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], BusScheduleAutogeneratorDocument.prototype, "repeatDaysPerWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], BusScheduleAutogeneratorDocument.prototype, "preGenerateDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], BusScheduleAutogeneratorDocument.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BusScheduleAutogeneratorDocument.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'un_published' }),
    __metadata("design:type", String)
], BusScheduleAutogeneratorDocument.prototype, "status", void 0);
exports.BusScheduleAutogeneratorDocument = BusScheduleAutogeneratorDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_schedules_autogenerators', timestamps: true })
], BusScheduleAutogeneratorDocument);
exports.BusScheduleAutogeneratorSchema = mongoose_1.SchemaFactory.createForClass(BusScheduleAutogeneratorDocument);
//# sourceMappingURL=bus-schedule-autogenerator.schema.js.map
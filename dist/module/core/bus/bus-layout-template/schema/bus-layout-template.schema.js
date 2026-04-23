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
exports.BusLayoutTemplateSchema = exports.BusLayoutTemplateDocument = exports.BusSeatLayoutTemplateDocument = exports.SeatDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class SeatDocument extends mongoose_2.Document {
}
exports.SeatDocument = SeatDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SeatDocument.prototype, "index", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SeatDocument.prototype, "typeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SeatDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'available' }),
    __metadata("design:type", String)
], SeatDocument.prototype, "status", void 0);
class BusSeatLayoutTemplateDocument extends mongoose_2.Document {
}
exports.BusSeatLayoutTemplateDocument = BusSeatLayoutTemplateDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusSeatLayoutTemplateDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [] }),
    __metadata("design:type", Array)
], BusSeatLayoutTemplateDocument.prototype, "seats", void 0);
let BusLayoutTemplateDocument = class BusLayoutTemplateDocument extends mongoose_2.Document {
};
exports.BusLayoutTemplateDocument = BusLayoutTemplateDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusLayoutTemplateDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusLayoutTemplateDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [] }),
    __metadata("design:type", Array)
], BusLayoutTemplateDocument.prototype, "seatLayouts", void 0);
exports.BusLayoutTemplateDocument = BusLayoutTemplateDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_layout_templates', timestamps: true })
], BusLayoutTemplateDocument);
exports.BusLayoutTemplateSchema = mongoose_1.SchemaFactory.createForClass(BusLayoutTemplateDocument);
//# sourceMappingURL=bus-layout-template.schema.js.map
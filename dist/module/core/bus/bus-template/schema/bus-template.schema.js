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
exports.BusTemplateSchema = exports.BusTemplateDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BusTemplateDocument = class BusTemplateDocument extends mongoose_2.Document {
};
exports.BusTemplateDocument = BusTemplateDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusTemplateDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusTemplateDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_services' }),
    __metadata("design:type", Array)
], BusTemplateDocument.prototype, "busServiceIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'seat_types' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusTemplateDocument.prototype, "busTypeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_layout_templates' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusTemplateDocument.prototype, "busLayoutTemplateId", void 0);
exports.BusTemplateDocument = BusTemplateDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_templates', timestamps: true })
], BusTemplateDocument);
exports.BusTemplateSchema = mongoose_1.SchemaFactory.createForClass(BusTemplateDocument);
//# sourceMappingURL=bus-template.schema.js.map
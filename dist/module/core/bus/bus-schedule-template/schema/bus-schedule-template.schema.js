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
exports.BusScheduleTemplateSchema = exports.BusScheduleTemplateDocument = exports.BusSeatPricesScheduleTemplateBreakPointsDocument = exports.BusRouteScheduleTemplateBreakPointsDocument = exports.BusScheduleTemplateRouteDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_route_schema_1 = require("../../bus-route/schema/bus-route.schema");
const bus_schedule_schema_1 = require("../../bus-schedule/schema/bus-schedule.schema");
const mapped_types_1 = require("@nestjs/mapped-types");
class BusScheduleTemplateRouteDocument extends (0, mapped_types_1.OmitType)(bus_route_schema_1.BusRouteDocument, ['tenantId']) {
}
exports.BusScheduleTemplateRouteDocument = BusScheduleTemplateRouteDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], BusScheduleTemplateRouteDocument.prototype, "breakPoints", void 0);
class BusRouteScheduleTemplateBreakPointsDocument extends bus_route_schema_1.BusRouteBreakPointsDocument {
}
exports.BusRouteScheduleTemplateBreakPointsDocument = BusRouteScheduleTemplateBreakPointsDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteScheduleTemplateBreakPointsDocument.prototype, "timeOffset", void 0);
class BusSeatPricesScheduleTemplateBreakPointsDocument extends bus_schedule_schema_1.BusSeatPricesDocument {
}
exports.BusSeatPricesScheduleTemplateBreakPointsDocument = BusSeatPricesScheduleTemplateBreakPointsDocument;
let BusScheduleTemplateDocument = class BusScheduleTemplateDocument extends mongoose_2.Document {
    constructor() {
        super(...arguments);
        this.busSeatLayoutBlockIds = [];
    }
};
exports.BusScheduleTemplateDocument = BusScheduleTemplateDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleTemplateDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleTemplateDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: 'buses' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleTemplateDocument.prototype, "busId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: 'driver' }),
    __metadata("design:type", Array)
], BusScheduleTemplateDocument.prototype, "busDriverIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_template' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleTemplateDocument.prototype, "busTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], BusScheduleTemplateDocument.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_routes' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleTemplateDocument.prototype, "busRouteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_routes' }),
    __metadata("design:type", BusScheduleTemplateRouteDocument)
], BusScheduleTemplateDocument.prototype, "busRoute", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_routes' }),
    __metadata("design:type", BusSeatPricesScheduleTemplateBreakPointsDocument)
], BusScheduleTemplateDocument.prototype, "busSeatPrices", void 0);
exports.BusScheduleTemplateDocument = BusScheduleTemplateDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_schedule_templates', timestamps: true })
], BusScheduleTemplateDocument);
exports.BusScheduleTemplateSchema = mongoose_1.SchemaFactory.createForClass(BusScheduleTemplateDocument);
//# sourceMappingURL=bus-schedule-template.schema.js.map
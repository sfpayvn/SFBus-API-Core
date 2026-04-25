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
exports.BusScheduleSchema = exports.BusScheduleDocument = exports.BusSeatPricesDocument = exports.BusRouteScheduleBreakPointsDocument = exports.BusScheduleRouteDocument = exports.BusTemplateOfScheduleDocument = exports.BusScheduleBusDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_route_schema_1 = require("../../bus-route/schema/bus-route.schema");
const bus_schema_schema_1 = require("../../bus-province/schema/bus-schema.schema");
const bus_type_schema_1 = require("../../bus-type/schema/bus-type.schema");
const mapped_types_1 = require("@nestjs/mapped-types");
class BusScheduleBusDocument extends (0, mapped_types_1.OmitType)(bus_route_schema_1.BusRouteDocument, ['tenantId']) {
}
exports.BusScheduleBusDocument = BusScheduleBusDocument;
class BusTemplateOfScheduleDocument {
}
exports.BusTemplateOfScheduleDocument = BusTemplateOfScheduleDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusTemplateOfScheduleDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_services' }),
    __metadata("design:type", Array)
], BusTemplateOfScheduleDocument.prototype, "busServiceIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'seat_types' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusTemplateOfScheduleDocument.prototype, "busTypeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_layout_templates' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusTemplateOfScheduleDocument.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], BusTemplateOfScheduleDocument.prototype, "busServices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", bus_type_schema_1.BusTypeDocument)
], BusTemplateOfScheduleDocument.prototype, "busType", void 0);
class BusScheduleRouteDocument extends (0, mapped_types_1.OmitType)(bus_route_schema_1.BusRouteDocument, ['tenantId']) {
}
exports.BusScheduleRouteDocument = BusScheduleRouteDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], BusScheduleRouteDocument.prototype, "breakPoints", void 0);
class BusRouteScheduleBreakPointsDocument extends bus_route_schema_1.BusRouteBreakPointsDocument {
}
exports.BusRouteScheduleBreakPointsDocument = BusRouteScheduleBreakPointsDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteScheduleBreakPointsDocument.prototype, "timeSchedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusRouteScheduleBreakPointsDocument.prototype, "provinceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", bus_schema_schema_1.BusProvinceDocument)
], BusRouteScheduleBreakPointsDocument.prototype, "province", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteScheduleBreakPointsDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteScheduleBreakPointsDocument.prototype, "detailAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteScheduleBreakPointsDocument.prototype, "location", void 0);
class BusSeatPricesDocument {
}
exports.BusSeatPricesDocument = BusSeatPricesDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusSeatPricesDocument.prototype, "seatTypeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusSeatPricesDocument.prototype, "seatTypeName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BusSeatPricesDocument.prototype, "price", void 0);
let BusScheduleDocument = class BusScheduleDocument extends mongoose_2.Document {
};
exports.BusScheduleDocument = BusScheduleDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "busScheduleNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: 'buses',
        get: (v) => (v === '' || v === null || v === undefined ? null : v),
        set: (v) => (v === '' || v === null || v === undefined ? null : v),
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "busId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: 'driver' }),
    __metadata("design:type", Array)
], BusScheduleDocument.prototype, "busDriverIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'buses' }),
    __metadata("design:type", BusScheduleBusDocument)
], BusScheduleDocument.prototype, "bus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_templates' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "busTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", BusTemplateOfScheduleDocument)
], BusScheduleDocument.prototype, "busTemplate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_routes' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "busRouteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'bus_routes' }),
    __metadata("design:type", BusScheduleRouteDocument)
], BusScheduleDocument.prototype, "busRoute", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "busLayoutTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "busScheduleTemplateId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], BusScheduleDocument.prototype, "busSeatLayoutBlockIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], BusScheduleDocument.prototype, "busSeatPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled'],
        default: 'scheduled',
    }),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusScheduleDocument.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: 'bus_stations' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusScheduleDocument.prototype, "currentStationId", void 0);
exports.BusScheduleDocument = BusScheduleDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_schedules', timestamps: true })
], BusScheduleDocument);
exports.BusScheduleSchema = mongoose_1.SchemaFactory.createForClass(BusScheduleDocument);
exports.BusScheduleSchema.virtual('driver', {
    ref: 'users',
    localField: 'busDriverIds',
    foreignField: '_id',
    justOne: false,
});
exports.BusScheduleSchema.set('toJSON', { virtuals: true });
exports.BusScheduleSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=bus-schedule.schema.js.map
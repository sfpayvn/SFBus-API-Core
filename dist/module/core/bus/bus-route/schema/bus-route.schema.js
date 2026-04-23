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
exports.BusRouteSchema = exports.BusRouteDocument = exports.BusRouteBreakPointsSchema = exports.BusRouteBreakPointsDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BusRouteBreakPointsDocument = class BusRouteBreakPointsDocument {
};
exports.BusRouteBreakPointsDocument = BusRouteBreakPointsDocument;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusRouteBreakPointsDocument.prototype, "busStationId", void 0);
exports.BusRouteBreakPointsDocument = BusRouteBreakPointsDocument = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], BusRouteBreakPointsDocument);
exports.BusRouteBreakPointsSchema = mongoose_1.SchemaFactory.createForClass(BusRouteBreakPointsDocument);
exports.BusRouteBreakPointsSchema.virtual('busStation', {
    ref: 'BusStationDocument',
    localField: 'busStationId',
    foreignField: '_id',
    justOne: true,
});
let BusRouteDocument = class BusRouteDocument extends mongoose_2.Document {
};
exports.BusRouteDocument = BusRouteDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusRouteDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.BusRouteBreakPointsSchema], default: [] }),
    __metadata("design:type", Array)
], BusRouteDocument.prototype, "breakPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BusRouteDocument.prototype, "distance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusRouteDocument.prototype, "distanceTime", void 0);
exports.BusRouteDocument = BusRouteDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_routes', timestamps: true })
], BusRouteDocument);
exports.BusRouteSchema = mongoose_1.SchemaFactory.createForClass(BusRouteDocument);
exports.BusRouteSchema.set('toObject', { virtuals: true });
exports.BusRouteSchema.set('toJSON', { virtuals: true });
//# sourceMappingURL=bus-route.schema.js.map
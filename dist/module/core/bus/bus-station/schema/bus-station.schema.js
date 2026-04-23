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
exports.BusStationSchema = exports.BusStationDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BusStationDocument = class BusStationDocument extends mongoose_2.Document {
};
exports.BusStationDocument = BusStationDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusStationDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BusStationDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], BusStationDocument.prototype, "detailAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], BusStationDocument.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusStationDocument.prototype, "provinceId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BusStationDocument.prototype, "imageId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], BusStationDocument.prototype, "isOffice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], BusStationDocument.prototype, "isActive", void 0);
exports.BusStationDocument = BusStationDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bus_stations', timestamps: true })
], BusStationDocument);
exports.BusStationSchema = mongoose_1.SchemaFactory.createForClass(BusStationDocument);
exports.BusStationSchema.virtual('province', {
    ref: 'bus_provinces',
    localField: 'provinceId',
    foreignField: '_id',
    justOne: true,
});
exports.BusStationSchema.virtual('image', {
    ref: 'fs.files',
    localField: 'imageId',
    foreignField: '_id',
    justOne: true,
});
exports.BusStationSchema.set('toJSON', { virtuals: true });
exports.BusStationSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=bus-station.schema.js.map
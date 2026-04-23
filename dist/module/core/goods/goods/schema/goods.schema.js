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
exports.GoodsSchema = exports.GoodsDocument = void 0;
const status_constants_1 = require("../../../../../common/constants/status.constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let GoodsDocument = class GoodsDocument extends mongoose_2.Document {
};
exports.GoodsDocument = GoodsDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], GoodsDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "busScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "goodsNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "customerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "senderName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "senderPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "goodsPriority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], GoodsDocument.prototype, "goodsImportant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "shippingCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "cod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "goodsValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], GoodsDocument.prototype, "categoriesIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], GoodsDocument.prototype, "busRouteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "length", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GoodsDocument.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GoodsDocument.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: [
            status_constants_1.GOODS_STATUS.NEW,
            status_constants_1.GOODS_STATUS.PENDING,
            status_constants_1.GOODS_STATUS.ON_BOARD,
            status_constants_1.GOODS_STATUS.WAITING_CONTINUE_DELIVERY,
            status_constants_1.GOODS_STATUS.ARRIVED_FINAL_STATION,
            status_constants_1.GOODS_STATUS.OUT_FOR_DELIVERY,
            status_constants_1.GOODS_STATUS.COMPLETED,
            status_constants_1.GOODS_STATUS.CANCELLED,
        ],
        default: status_constants_1.GOODS_STATUS.NEW,
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: [
            status_constants_1.GOODS_PAYMENT_STATUS.NEW,
            status_constants_1.GOODS_PAYMENT_STATUS.DEPOSITED,
            status_constants_1.GOODS_PAYMENT_STATUS.PAID,
            status_constants_1.GOODS_PAYMENT_STATUS.READY_REFUND,
            status_constants_1.GOODS_PAYMENT_STATUS.REFUNDED,
        ],
        default: status_constants_1.GOODS_PAYMENT_STATUS.NEW,
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "paymentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['sender', 'customer'],
        default: 'sender',
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "paidBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_3.Types.ObjectId], default: [] }),
    __metadata("design:type", Array)
], GoodsDocument.prototype, "imageIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "originStationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "destinationStationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "currentStationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "currentScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: { type: String, enum: ['CREATED', 'ASSIGNED_TO_SCHEDULE', 'UNASSIGNED_FROM_SCHEDULE', 'LOADED_ON_BUS', 'DROPPED_AT_STATION', 'DELIVERED'] },
                stationId: { type: mongoose_3.Types.ObjectId, default: null },
                scheduleId: { type: mongoose_3.Types.ObjectId, default: null },
                note: { type: String, default: '' },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], GoodsDocument.prototype, "events", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['STATION', 'ADDRESS'],
        default: 'STATION',
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "deliveryType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['ROADSIDE', 'STATION'],
        default: 'STATION',
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['ROADSIDE', 'STATION'],
        default: 'STATION',
    }),
    __metadata("design:type", String)
], GoodsDocument.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "pickupAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GoodsDocument.prototype, "deliveryAddress", void 0);
exports.GoodsDocument = GoodsDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'goods', timestamps: true })
], GoodsDocument);
exports.GoodsSchema = mongoose_1.SchemaFactory.createForClass(GoodsDocument);
exports.GoodsSchema.virtual('busSchedule', {
    ref: 'BusScheduleDocument',
    localField: 'busScheduleId',
    foreignField: '_id',
    justOne: true,
});
exports.GoodsSchema.virtual('busRoute', {
    ref: 'BusRouteDocument',
    localField: 'busRouteId',
    foreignField: '_id',
    justOne: true,
});
exports.GoodsSchema.virtual('categories', {
    ref: 'GoodsCategoryDocument',
    localField: 'categoriesIds',
    foreignField: '_id',
    justOne: false,
});
exports.GoodsSchema.set('toJSON', { virtuals: true });
exports.GoodsSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=goods.schema.js.map
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
exports.BookingSchema = exports.BookingDocument = exports.BookingItemDocument = exports.BookingItemSeatDocument = exports.UserPaymentInforBookingDocument = exports.UserInforBookingDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const promotion_schema_1 = require("../../promotion/schema/promotion.schema");
const bus_route_schema_1 = require("../../bus/bus-route/schema/bus-route.schema");
const bus_schedule_schema_1 = require("../../bus/bus-schedule/schema/bus-schedule.schema");
const user_schema_1 = require("../../user/user/schema/user.schema");
const payment_schema_1 = require("../../payment/schema/payment.schema");
const status_constants_1 = require("../../../../common/constants/status.constants");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
class UserInforBookingDocument {
}
exports.UserInforBookingDocument = UserInforBookingDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserInforBookingDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserInforBookingDocument.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserInforBookingDocument.prototype, "phoneNumber", void 0);
class UserPaymentInforBookingDocument {
}
exports.UserPaymentInforBookingDocument = UserPaymentInforBookingDocument;
class BookingItemSeatDocument extends mongoose_2.Document {
}
exports.BookingItemSeatDocument = BookingItemSeatDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemSeatDocument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingItemSeatDocument.prototype, "seatNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BookingItemSeatDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemSeatDocument.prototype, "typeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(status_constants_1.SEAT_STATUS),
        default: status_constants_1.SEAT_STATUS.NOT_PICKED_UP,
    }),
    __metadata("design:type", String)
], BookingItemSeatDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemSeatDocument.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemSeatDocument.prototype, "updatedBy", void 0);
class BookingItemDocument extends mongoose_2.Document {
}
exports.BookingItemDocument = BookingItemDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BookingItemDocument.prototype, "bookingItemNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", BookingItemSeatDocument)
], BookingItemDocument.prototype, "seat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingItemDocument.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingItemDocument.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingItemDocument.prototype, "afterDiscountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "departure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingItemDocument.prototype, "updatedBy", void 0);
let BookingDocument = class BookingDocument extends mongoose_2.Document {
};
exports.BookingDocument = BookingDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BookingDocument.prototype, "bookingNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", UserInforBookingDocument)
], BookingDocument.prototype, "userInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "busScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "busRouteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], BookingDocument.prototype, "bookingItems", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", promotion_schema_1.PromotionDocument)
], BookingDocument.prototype, "promotion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "discountTotalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "afterDiscountTotalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], BookingDocument.prototype, "appliedFees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], BookingDocument.prototype, "appliedTaxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "totalFeeAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], BookingDocument.prototype, "totalTaxAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], BookingDocument.prototype, "paymentTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BookingDocument.prototype, "bookingGroupNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(status_constants_1.BOOKING_STATUS), default: status_constants_1.BOOKING_STATUS.RESERVED }),
    __metadata("design:type", String)
], BookingDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], BookingDocument.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], BookingDocument.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BookingDocument.prototype, "idempotencyKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(roles_constants_1.ROLE_CONSTANTS) }),
    __metadata("design:type", String)
], BookingDocument.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Date)
], BookingDocument.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BookingDocument.prototype, "updatedBy", void 0);
exports.BookingDocument = BookingDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'bookings', timestamps: true })
], BookingDocument);
exports.BookingSchema = mongoose_1.SchemaFactory.createForClass(BookingDocument);
exports.BookingSchema.pre('save', function (next) {
    if (Array.isArray(this.bookingItems)) {
        this.quantity = this.bookingItems.length;
    }
    else {
        this.quantity = 0;
    }
    next();
});
exports.BookingSchema.index({ expiresAt: 1 }, {
    expireAfterSeconds: 0,
    partialFilterExpression: {
        source: roles_constants_1.ROLE_CONSTANTS.CLIENT,
        status: status_constants_1.BOOKING_STATUS.RESERVED,
    },
});
exports.BookingSchema.index({ tenantId: 1, userId: 1, idempotencyKey: 1 }, { unique: true, sparse: true });
exports.BookingSchema.index({ tenantId: 1, busScheduleId: 1, 'bookingItems.seat._id': 1 }, {
    unique: true,
    partialFilterExpression: {
        status: { $in: [status_constants_1.BOOKING_STATUS.RESERVED, status_constants_1.BOOKING_STATUS.PAID, status_constants_1.BOOKING_STATUS.DEPOSITED] },
    },
});
exports.BookingSchema.virtual('busRoute', {
    ref: bus_route_schema_1.BusRouteDocument.name,
    localField: 'busRouteId',
    foreignField: '_id',
    justOne: true,
});
exports.BookingSchema.virtual('busSchedule', {
    ref: bus_schedule_schema_1.BusScheduleDocument.name,
    localField: 'busScheduleId',
    foreignField: '_id',
    justOne: true,
});
exports.BookingSchema.virtual('user', {
    ref: user_schema_1.UserDocument.name,
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});
exports.BookingSchema.virtual('payments', {
    ref: payment_schema_1.PaymentDocument.name,
    localField: '_id',
    foreignField: 'referrentId',
    justOne: false,
});
exports.BookingSchema.set('toJSON', { virtuals: true });
exports.BookingSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=booking.schema.js.map
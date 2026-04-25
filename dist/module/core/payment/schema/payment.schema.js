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
exports.PaymentSchema = exports.PaymentDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_method_schema_1 = require("../../payment-method/schema/payment-method.schema");
let PaymentDocument = class PaymentDocument extends mongoose_2.Document {
};
exports.PaymentDocument = PaymentDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentDocument.prototype, "referrentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentDocument.prototype, "referrentNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentDocument.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentDocument.prototype, "promotionId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentDocument.prototype, "paymentMethodId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentDocument.prototype, "paymentNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentDocument.prototype, "referrentGroupNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Success' }),
    __metadata("design:type", String)
], PaymentDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PaymentDocument.prototype, "paymentAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PaymentDocument.prototype, "chargedAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentDocument.prototype, "transactionReferrentId", void 0);
exports.PaymentDocument = PaymentDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'payments', timestamps: true })
], PaymentDocument);
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(PaymentDocument);
exports.PaymentSchema.virtual('booking', {
    ref: 'bookings',
    localField: 'referrentId',
    foreignField: '_id',
    justOne: true,
});
exports.PaymentSchema.virtual('goods', {
    ref: 'goods',
    localField: 'referrentId',
    foreignField: '_id',
    justOne: true,
});
exports.PaymentSchema.virtual('paymentMethod', {
    ref: payment_method_schema_1.PaymentMethodDocument.name,
    localField: 'paymentMethodId',
    foreignField: '_id',
    justOne: true,
});
exports.PaymentSchema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});
exports.PaymentSchema.set('toJSON', { virtuals: true });
exports.PaymentSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=payment.schema.js.map
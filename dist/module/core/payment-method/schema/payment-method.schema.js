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
exports.PaymentMethodSchema = exports.PaymentMethodDocument = exports.PaymentBankingDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class PaymentBankingDocument extends mongoose_2.Document {
}
exports.PaymentBankingDocument = PaymentBankingDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentBankingDocument.prototype, "providerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentBankingDocument.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentBankingDocument.prototype, "bankName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentBankingDocument.prototype, "accountNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentBankingDocument.prototype, "accountName", void 0);
let PaymentMethodDocument = class PaymentMethodDocument extends mongoose_2.Document {
};
exports.PaymentMethodDocument = PaymentMethodDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentMethodDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentMethodDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentMethodDocument.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentMethodDocument.prototype, "imageId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentMethodDocument.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", PaymentBankingDocument)
], PaymentMethodDocument.prototype, "banking", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], PaymentMethodDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PaymentMethodDocument.prototype, "isPaymentMethodDefault", void 0);
exports.PaymentMethodDocument = PaymentMethodDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'payment_methods', timestamps: true })
], PaymentMethodDocument);
exports.PaymentMethodSchema = mongoose_1.SchemaFactory.createForClass(PaymentMethodDocument);
//# sourceMappingURL=payment-method.schema.js.map
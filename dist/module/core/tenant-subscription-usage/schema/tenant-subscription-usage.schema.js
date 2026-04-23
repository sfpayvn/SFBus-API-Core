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
exports.TenantSubscriptionUsageSchema = exports.TenantSubscriptionUsageDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TenantSubscriptionUsageDocument = class TenantSubscriptionUsageDocument extends mongoose_2.Document {
};
exports.TenantSubscriptionUsageDocument = TenantSubscriptionUsageDocument;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Subscription', index: true, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TenantSubscriptionUsageDocument.prototype, "subscriptionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, index: true, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TenantSubscriptionUsageDocument.prototype, "subjectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true, index: true }),
    __metadata("design:type", String)
], TenantSubscriptionUsageDocument.prototype, "moduleKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, lowercase: true, default: null, index: true }),
    __metadata("design:type", String)
], TenantSubscriptionUsageDocument.prototype, "functionKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['calendar', 'rolling'], default: 'calendar' }),
    __metadata("design:type", String)
], TenantSubscriptionUsageDocument.prototype, "windowType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['minute', 'hour', 'day', 'week', 'month', 'lifetime'], default: 'month' }),
    __metadata("design:type", String)
], TenantSubscriptionUsageDocument.prototype, "windowUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1, default: 1 }),
    __metadata("design:type", Number)
], TenantSubscriptionUsageDocument.prototype, "windowSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, index: true }),
    __metadata("design:type", Date)
], TenantSubscriptionUsageDocument.prototype, "windowStart", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, index: true }),
    __metadata("design:type", Date)
], TenantSubscriptionUsageDocument.prototype, "windowEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], TenantSubscriptionUsageDocument.prototype, "used", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], TenantSubscriptionUsageDocument.prototype, "quota", void 0);
exports.TenantSubscriptionUsageDocument = TenantSubscriptionUsageDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'tenant-subscription_usages', timestamps: true })
], TenantSubscriptionUsageDocument);
exports.TenantSubscriptionUsageSchema = mongoose_1.SchemaFactory.createForClass(TenantSubscriptionUsageDocument);
exports.TenantSubscriptionUsageSchema.index({ subscriptionId: 1, subjectId: 1, moduleKey: 1, functionKey: 1, windowStart: 1, windowEnd: 1 }, { unique: true, partialFilterExpression: { functionKey: { $type: 'string' } } });
//# sourceMappingURL=tenant-subscription-usage.schema.js.map
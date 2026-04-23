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
exports.TenantSubscriptionSchema = exports.TenantSubscriptionDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_limitation_schema_1 = require("./subscription-limitation.schema");
const status_constants_1 = require("../../../../common/constants/status.constants");
let TenantSubscriptionDocument = class TenantSubscriptionDocument extends mongoose_2.Document {
};
exports.TenantSubscriptionDocument = TenantSubscriptionDocument;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TenantSubscriptionDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TenantSubscriptionDocument.prototype, "subscriptionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TenantSubscriptionDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], TenantSubscriptionDocument.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], TenantSubscriptionDocument.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.values(status_constants_1.DURATION_STATUS), default: status_constants_1.DURATION_STATUS.MONTH }),
    __metadata("design:type", String)
], TenantSubscriptionDocument.prototype, "durationUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", subscription_limitation_schema_1.SubscriptionLimitationSubDocument)
], TenantSubscriptionDocument.prototype, "limitationSnapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TenantSubscriptionDocument.prototype, "startAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TenantSubscriptionDocument.prototype, "endAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'canceled', 'expired'], default: 'active', index: true }),
    __metadata("design:type", String)
], TenantSubscriptionDocument.prototype, "status", void 0);
exports.TenantSubscriptionDocument = TenantSubscriptionDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'tenant_subscriptions', timestamps: true })
], TenantSubscriptionDocument);
exports.TenantSubscriptionSchema = mongoose_1.SchemaFactory.createForClass(TenantSubscriptionDocument);
exports.TenantSubscriptionSchema.index({ tenantId: 1, status: 1, startAt: 1, endAt: 1 });
//# sourceMappingURL=tenant-subscription.schema.js.map
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
exports.SubscriptionSchema = exports.SubscriptionDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_limitation_schema_1 = require("../../tenant-subscription/schema/subscription-limitation.schema");
const status_constants_1 = require("../../../../common/constants/status.constants");
let SubscriptionDocument = class SubscriptionDocument extends mongoose_2.Document {
};
exports.SubscriptionDocument = SubscriptionDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], SubscriptionDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], SubscriptionDocument.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SubscriptionDocument.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], SubscriptionDocument.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.values(status_constants_1.DURATION_STATUS), required: true }),
    __metadata("design:type", String)
], SubscriptionDocument.prototype, "durationUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: subscription_limitation_schema_1.SubscriptionLimitationSchema, required: true }),
    __metadata("design:type", subscription_limitation_schema_1.SubscriptionLimitationSubDocument)
], SubscriptionDocument.prototype, "limitation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: 'active' }),
    __metadata("design:type", String)
], SubscriptionDocument.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], SubscriptionDocument.prototype, "popular", void 0);
exports.SubscriptionDocument = SubscriptionDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'subscriptions', timestamps: true })
], SubscriptionDocument);
exports.SubscriptionSchema = mongoose_1.SchemaFactory.createForClass(SubscriptionDocument);
exports.SubscriptionSchema.index({ popular: 1 }, { unique: true, sparse: true });
//# sourceMappingURL=subscription.schema.js.map
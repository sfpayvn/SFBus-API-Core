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
exports.SubscriptionLimitationSchema = exports.SubscriptionLimitationSubDocument = exports.ModuleRuleSchema = exports.ModuleRule = exports.FunctionRuleSchema = exports.FunctionRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let FunctionRule = class FunctionRule {
};
exports.FunctionRule = FunctionRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], FunctionRule.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['count', 'unlimited'], default: 'count' }),
    __metadata("design:type", String)
], FunctionRule.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], FunctionRule.prototype, "quota", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['calendar', 'rolling'], default: 'calendar' }),
    __metadata("design:type", String)
], FunctionRule.prototype, "windowType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['minute', 'hour', 'day', 'week', 'month', 'lifetime'], default: 'month' }),
    __metadata("design:type", String)
], FunctionRule.prototype, "windowUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 1, default: 1 }),
    __metadata("design:type", Number)
], FunctionRule.prototype, "windowSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], FunctionRule.prototype, "burst", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], FunctionRule.prototype, "concurrency", void 0);
exports.FunctionRule = FunctionRule = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], FunctionRule);
exports.FunctionRuleSchema = mongoose_1.SchemaFactory.createForClass(FunctionRule);
let ModuleRule = class ModuleRule {
};
exports.ModuleRule = ModuleRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], ModuleRule.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: exports.FunctionRuleSchema,
        required: false,
    }),
    __metadata("design:type", FunctionRule)
], ModuleRule.prototype, "moduleRule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FunctionRuleSchema], default: [] }),
    __metadata("design:type", Array)
], ModuleRule.prototype, "functions", void 0);
exports.ModuleRule = ModuleRule = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ModuleRule);
exports.ModuleRuleSchema = mongoose_1.SchemaFactory.createForClass(ModuleRule);
let SubscriptionLimitationSubDocument = class SubscriptionLimitationSubDocument {
};
exports.SubscriptionLimitationSubDocument = SubscriptionLimitationSubDocument;
__decorate([
    (0, mongoose_1.Prop)({ enum: ['allow', 'block'], default: 'block' }),
    __metadata("design:type", String)
], SubscriptionLimitationSubDocument.prototype, "defaultAction", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ModuleRuleSchema], default: [] }),
    __metadata("design:type", Array)
], SubscriptionLimitationSubDocument.prototype, "modules", void 0);
exports.SubscriptionLimitationSubDocument = SubscriptionLimitationSubDocument = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SubscriptionLimitationSubDocument);
exports.SubscriptionLimitationSchema = mongoose_1.SchemaFactory.createForClass(SubscriptionLimitationSubDocument);
//# sourceMappingURL=subscription-limitation.schema.js.map
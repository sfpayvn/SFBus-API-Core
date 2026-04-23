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
exports.FeeTaxSchema = exports.FeeTax = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FeeTax = class FeeTax {
};
exports.FeeTax = FeeTax;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FeeTax.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['fee', 'tax'], default: 'fee' }),
    __metadata("design:type", String)
], FeeTax.prototype, "feeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FeeTax.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['fixed', 'percentage'] }),
    __metadata("design:type", String)
], FeeTax.prototype, "calculationType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['ticket_price', 'total_booking', 'after_discount'] }),
    __metadata("design:type", String)
], FeeTax.prototype, "appliedOn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], FeeTax.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0, type: Number }),
    __metadata("design:type", Number)
], FeeTax.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], FeeTax.prototype, "enabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FeeTax.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], FeeTax.prototype, "conditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], FeeTax.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], FeeTax.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FeeTax.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FeeTax.prototype, "updatedBy", void 0);
exports.FeeTax = FeeTax = __decorate([
    (0, mongoose_1.Schema)({ collection: 'fee_taxes', timestamps: true })
], FeeTax);
exports.FeeTaxSchema = mongoose_1.SchemaFactory.createForClass(FeeTax);
//# sourceMappingURL=fee-tax.schema.js.map
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
exports.TenantSchema = exports.TenantDocument = exports.TenantSettingSchema = exports.TenantSettingSubDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TenantSettingSubDocument = class TenantSettingSubDocument {
};
exports.TenantSettingSubDocument = TenantSettingSubDocument;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenantSettingSubDocument.prototype, "appearance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenantSettingSubDocument.prototype, "timezone", void 0);
exports.TenantSettingSubDocument = TenantSettingSubDocument = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TenantSettingSubDocument);
exports.TenantSettingSchema = mongoose_1.SchemaFactory.createForClass(TenantSettingSubDocument);
let TenantDocument = class TenantDocument extends mongoose_2.Document {
};
exports.TenantDocument = TenantDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], TenantDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TenantDocument.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TenantDocument.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenantDocument.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenantDocument.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TenantDocument.prototype, "logoId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.TenantSettingSchema }),
    __metadata("design:type", TenantSettingSubDocument)
], TenantDocument.prototype, "setting", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: 'active' }),
    __metadata("design:type", String)
], TenantDocument.prototype, "status", void 0);
exports.TenantDocument = TenantDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'tenants', timestamps: true })
], TenantDocument);
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(TenantDocument);
exports.TenantSchema.index({ code: 1 }, { unique: true });
exports.TenantSchema.index({ phoneNumber: 1 }, { unique: true });
exports.TenantSchema.set('toJSON', { virtuals: true });
exports.TenantSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=tenant.schema.js.map
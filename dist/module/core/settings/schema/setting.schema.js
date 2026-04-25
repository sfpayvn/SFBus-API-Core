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
exports.SettingSchema = exports.Setting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Setting = class Setting extends mongoose_2.Document {
};
exports.Setting = Setting;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Setting.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Setting.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Setting.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Setting.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Setting.prototype, "groupName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'TenantDocument' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Setting.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Setting.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Setting.prototype, "updatedAt", void 0);
exports.Setting = Setting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Setting);
exports.SettingSchema = mongoose_1.SchemaFactory.createForClass(Setting);
exports.SettingSchema.index({ name: 1, tenantId: 1, groupName: 1 }, { unique: true });
//# sourceMappingURL=setting.schema.js.map
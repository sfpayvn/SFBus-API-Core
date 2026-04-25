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
exports.UserSchema = exports.UserDocument = exports.UserAddressDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class UserAddressDocument extends mongoose_2.Document {
}
exports.UserAddressDocument = UserAddressDocument;
let UserDocument = class UserDocument extends mongoose_2.Document {
};
exports.UserDocument = UserDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserDocument.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserDocument.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserDocument.prototype, "avatarId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], UserDocument.prototype, "addresses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['male', 'female', 'other'], default: 'other' }),
    __metadata("design:type", String)
], UserDocument.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserDocument.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UserDocument.prototype, "birthdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: ['user'] }),
    __metadata("design:type", Array)
], UserDocument.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], UserDocument.prototype, "isTempPassWord", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserDocument.prototype, "isEmailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserDocument.prototype, "isPhoneNumberVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserDocument.prototype, "isLocked", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserDocument.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserDocument.prototype, "resetTokenVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserDocument.prototype, "tokenVersion", void 0);
exports.UserDocument = UserDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'users', timestamps: true })
], UserDocument);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserDocument);
exports.UserSchema.index({ tenantId: 1, phoneNumber: 1 }, { unique: true });
//# sourceMappingURL=user.schema.js.map
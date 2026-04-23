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
exports.GoodsCategorySchema = exports.GoodsCategoryDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let GoodsCategoryDocument = class GoodsCategoryDocument extends mongoose_2.Document {
};
exports.GoodsCategoryDocument = GoodsCategoryDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], GoodsCategoryDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GoodsCategoryDocument.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], GoodsCategoryDocument.prototype, "iconId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], GoodsCategoryDocument.prototype, "status", void 0);
exports.GoodsCategoryDocument = GoodsCategoryDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'goods-category', timestamps: true })
], GoodsCategoryDocument);
exports.GoodsCategorySchema = mongoose_1.SchemaFactory.createForClass(GoodsCategoryDocument);
//# sourceMappingURL=goods.-categoryschema.js.map
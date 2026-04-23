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
exports.TrackingSchema = exports.TrackingDocument = void 0;
const roles_constants_1 = require("../../../../common/constants/roles.constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TrackingDocument = class TrackingDocument extends mongoose_2.Document {
};
exports.TrackingDocument = TrackingDocument;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TrackingDocument.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TrackingDocument.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: [
            roles_constants_1.ROLE_CONSTANTS.CLIENT,
            roles_constants_1.ROLE_CONSTANTS.DRIVER,
            roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR,
            roles_constants_1.ROLE_CONSTANTS.TENANT,
            roles_constants_1.ROLE_CONSTANTS.ADMIN,
            roles_constants_1.ROLE_CONSTANTS.POS,
        ],
    }),
    __metadata("design:type", String)
], TrackingDocument.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], TrackingDocument.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TrackingDocument.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], TrackingDocument.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TrackingDocument.prototype, "updatedBy", void 0);
exports.TrackingDocument = TrackingDocument = __decorate([
    (0, mongoose_1.Schema)({ collection: 'trackings', timestamps: true })
], TrackingDocument);
exports.TrackingSchema = mongoose_1.SchemaFactory.createForClass(TrackingDocument);
//# sourceMappingURL=tracking.schema.js.map
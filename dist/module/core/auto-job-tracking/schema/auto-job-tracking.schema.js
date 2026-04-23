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
exports.AutoJobTrackingSchema = exports.AutoJobTracking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AutoJobTracking = class AutoJobTracking {
};
exports.AutoJobTracking = AutoJobTracking;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AutoJobTracking.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AutoJobTracking.prototype, "jobName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AutoJobTracking.prototype, "runDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], AutoJobTracking.prototype, "createdAt", void 0);
exports.AutoJobTracking = AutoJobTracking = __decorate([
    (0, mongoose_1.Schema)({ collection: 'auto_job_tracking', timestamps: true })
], AutoJobTracking);
exports.AutoJobTrackingSchema = mongoose_1.SchemaFactory.createForClass(AutoJobTracking);
exports.AutoJobTrackingSchema.index({ tenantId: 1, jobName: 1, runDate: 1 }, { unique: true });
//# sourceMappingURL=auto-job-tracking.schema.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTrackingModule = void 0;
const common_1 = require("@nestjs/common");
const admin_tracking_controller_1 = require("./admin-tracking.controller");
const admin_tracking_service_1 = require("./admin-tracking.service");
const tracking_module_1 = require("../../core/tracking/tracking.module");
let AdminTrackingModule = class AdminTrackingModule {
};
exports.AdminTrackingModule = AdminTrackingModule;
exports.AdminTrackingModule = AdminTrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [tracking_module_1.TrackingModule],
        controllers: [admin_tracking_controller_1.AdminTrackingController],
        providers: [admin_tracking_service_1.AdminTrackingService],
        exports: [admin_tracking_service_1.AdminTrackingService],
    })
], AdminTrackingModule);
//# sourceMappingURL=admin-tracking.module.js.map
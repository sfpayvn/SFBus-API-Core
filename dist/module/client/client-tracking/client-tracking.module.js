"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTrackingModule = void 0;
const common_1 = require("@nestjs/common");
const client_tracking_controller_1 = require("./client-tracking.controller");
const client_tracking_service_1 = require("./client-tracking.service");
const tracking_module_1 = require("../../core/tracking/tracking.module");
let ClientTrackingModule = class ClientTrackingModule {
};
exports.ClientTrackingModule = ClientTrackingModule;
exports.ClientTrackingModule = ClientTrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [tracking_module_1.TrackingModule],
        controllers: [client_tracking_controller_1.ClientTrackingController],
        providers: [client_tracking_service_1.ClientTrackingService],
        exports: [client_tracking_service_1.ClientTrackingService],
    })
], ClientTrackingModule);
//# sourceMappingURL=client-tracking.module.js.map
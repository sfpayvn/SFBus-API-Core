"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverNotificationModule = void 0;
const notificationschema_1 = require("../../core/notification/schema/notificationschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_notification_controller_1 = require("./driver-notification.controller");
const driver_notification_gateway_1 = require("./driver-notification.gateway");
const driver_notification_service_1 = require("./driver-notification.service");
let DriverNotificationModule = class DriverNotificationModule {
};
exports.DriverNotificationModule = DriverNotificationModule;
exports.DriverNotificationModule = DriverNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: notificationschema_1.NotificationDocument.name, schema: notificationschema_1.NotificationSchema }])],
        controllers: [driver_notification_controller_1.DriverNotificationController],
        providers: [driver_notification_service_1.DriverNotificationService, driver_notification_gateway_1.DriverNotificationGateway],
        exports: [driver_notification_service_1.DriverNotificationService],
    })
], DriverNotificationModule);
//# sourceMappingURL=driver-notification.module.js.map
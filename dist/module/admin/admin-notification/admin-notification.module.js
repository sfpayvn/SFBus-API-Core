"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationModule = void 0;
const notificationschema_1 = require("../../core/notification/schema/notificationschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_notification_controller_1 = require("./admin-notification.controller");
const admin_notification_gateway_1 = require("./admin-notification.gateway");
const admin_notification_service_1 = require("./admin-notification.service");
let AdminNotificationModule = class AdminNotificationModule {
};
exports.AdminNotificationModule = AdminNotificationModule;
exports.AdminNotificationModule = AdminNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: notificationschema_1.NotificationDocument.name, schema: notificationschema_1.NotificationSchema }])],
        controllers: [admin_notification_controller_1.AdminNotificationController],
        providers: [admin_notification_service_1.AdminNotificationService, admin_notification_gateway_1.AdminNotificationGateway],
        exports: [admin_notification_service_1.AdminNotificationService],
    })
], AdminNotificationModule);
//# sourceMappingURL=admin-notification.module.js.map
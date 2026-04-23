"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientNotificationModule = void 0;
const notificationschema_1 = require("../../core/notification/schema/notificationschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_notification_controller_1 = require("./client-notification.controller");
const client_notification_gateway_1 = require("./client-notification.gateway");
const client_notification_service_1 = require("./client-notification.service");
let ClientNotificationModule = class ClientNotificationModule {
};
exports.ClientNotificationModule = ClientNotificationModule;
exports.ClientNotificationModule = ClientNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: notificationschema_1.NotificationDocument.name, schema: notificationschema_1.NotificationSchema }])],
        controllers: [client_notification_controller_1.ClientNotificationController],
        providers: [client_notification_service_1.ClientNotificationService, client_notification_gateway_1.ClientNotificationGateway],
        exports: [client_notification_service_1.ClientNotificationService],
    })
], ClientNotificationModule);
//# sourceMappingURL=client-notification.module.js.map
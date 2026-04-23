"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosNotificationModule = void 0;
const notificationschema_1 = require("../../core/notification/schema/notificationschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_notification_controller_1 = require("./pos-notification.controller");
const pos_notification_gateway_1 = require("./pos-notification.gateway");
const pos_notification_service_1 = require("./pos-notification.service");
let PosNotificationModule = class PosNotificationModule {
};
exports.PosNotificationModule = PosNotificationModule;
exports.PosNotificationModule = PosNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: notificationschema_1.NotificationDocument.name, schema: notificationschema_1.NotificationSchema }])],
        controllers: [pos_notification_controller_1.PosNotificationController],
        providers: [pos_notification_service_1.PosNotificationService, pos_notification_gateway_1.PosNotificationGateway],
        exports: [pos_notification_service_1.PosNotificationService],
    })
], PosNotificationModule);
//# sourceMappingURL=pos-notification.module.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_gateway_1 = require("./notification.gateway");
const notificationschema_1 = require("./schema/notificationschema");
let NotificationService = class NotificationService {
    constructor(notificationModel, notificationGateway) {
        this.notificationModel = notificationModel;
        this.notificationGateway = notificationGateway;
    }
    async create(notificationDto, tenantId) {
        const createdNotification = new this.notificationModel({ ...notificationDto, tenantId });
        const notification = await createdNotification.save();
        this.notificationGateway.notifyChange(notification);
        return null;
    }
    async findAll(tenantId) {
        return null;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notificationschema_1.NotificationDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_gateway_1.NotificationGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
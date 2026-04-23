import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Model } from 'mongoose';
import { AdminNotificationGateway } from './admin-notification.gateway';
export declare class AdminNotificationService {
    private notificationModel;
    private readonly AdminNotificationGateway;
    constructor(notificationModel: Model<NotificationDocument>, AdminNotificationGateway: AdminNotificationGateway);
}

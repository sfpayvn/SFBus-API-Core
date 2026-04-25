import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Model } from 'mongoose';
import { ClientNotificationGateway } from './client-notification.gateway';
export declare class ClientNotificationService {
    private notificationModel;
    private readonly ClientNotificationGateway;
    constructor(notificationModel: Model<NotificationDocument>, ClientNotificationGateway: ClientNotificationGateway);
}

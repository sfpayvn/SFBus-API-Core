import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Model } from 'mongoose';
import { PosNotificationGateway } from './pos-notification.gateway';
export declare class PosNotificationService {
    private notificationModel;
    private readonly PosNotificationGateway;
    constructor(notificationModel: Model<NotificationDocument>, PosNotificationGateway: PosNotificationGateway);
}

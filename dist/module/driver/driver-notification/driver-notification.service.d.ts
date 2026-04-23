import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Model } from 'mongoose';
import { DriverNotificationGateway } from './driver-notification.gateway';
export declare class DriverNotificationService {
    private notificationModel;
    private readonly DriverNotificationGateway;
    constructor(notificationModel: Model<NotificationDocument>, DriverNotificationGateway: DriverNotificationGateway);
}

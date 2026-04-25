import { Model, Types } from 'mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationDocument } from './schema/notificationschema';
import { NotificationDto } from './dto/notification.dto';
export declare class NotificationService {
    private notificationModel;
    private readonly notificationGateway;
    constructor(notificationModel: Model<NotificationDocument>, notificationGateway: NotificationGateway);
    create(notificationDto: any, tenantId: Types.ObjectId): Promise<NotificationDto | null>;
    findAll(tenantId: Types.ObjectId): Promise<Notification[] | null>;
}

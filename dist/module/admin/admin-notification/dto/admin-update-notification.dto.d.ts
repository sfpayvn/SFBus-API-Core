import { Types } from 'mongoose';
import { AdminCreateNotificationDto } from './admin-create-notificationdto';
declare const AdminUpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateNotificationDto>>;
export declare class AdminUpdateNotificationDto extends AdminUpdateNotificationDto_base {
    _id: Types.ObjectId;
}
export {};

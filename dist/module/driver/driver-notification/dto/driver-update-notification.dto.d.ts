import { Types } from 'mongoose';
import { DriverCreateNotificationDto } from './driver-create-notificationdto';
declare const DriverUpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<DriverCreateNotificationDto>>;
export declare class DriverUpdateNotificationDto extends DriverUpdateNotificationDto_base {
    _id: Types.ObjectId;
}
export {};

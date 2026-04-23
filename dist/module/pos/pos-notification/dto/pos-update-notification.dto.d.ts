import { Types } from 'mongoose';
import { PosCreateNotificationDto } from './pos-create-notificationdto';
declare const PosUpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateNotificationDto>>;
export declare class PosUpdateNotificationDto extends PosUpdateNotificationDto_base {
    _id: Types.ObjectId;
}
export {};

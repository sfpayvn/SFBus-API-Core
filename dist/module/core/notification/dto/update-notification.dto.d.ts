import { Types } from 'mongoose';
import { CreateNotificationDto } from './create-notificationdto';
declare const UpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateNotificationDto>>;
export declare class UpdateNotificationDto extends UpdateNotificationDto_base {
    _id: Types.ObjectId;
}
export {};

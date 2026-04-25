import { Types } from 'mongoose';
import { ClientCreateNotificationDto } from './client-create-notificationdto';
declare const ClientUpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<ClientCreateNotificationDto>>;
export declare class ClientUpdateNotificationDto extends ClientUpdateNotificationDto_base {
    _id: Types.ObjectId;
}
export {};

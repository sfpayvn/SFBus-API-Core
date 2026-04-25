import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { ClientCreateNotificationDto } from './client-create-notificationdto';

export class ClientUpdateNotificationDto extends PartialType(ClientCreateNotificationDto) {
  _id: Types.ObjectId;
}

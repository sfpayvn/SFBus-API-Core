import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateNotificationDto } from './admin-create-notificationdto';

export class AdminUpdateNotificationDto extends PartialType(AdminCreateNotificationDto) {
  _id: Types.ObjectId;
}

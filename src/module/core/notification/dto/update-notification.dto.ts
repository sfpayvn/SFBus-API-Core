import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateNotificationDto } from './create-notificationdto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  _id: Types.ObjectId;
}

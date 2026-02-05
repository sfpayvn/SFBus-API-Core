import { IsString, IsDate } from 'class-validator';
import { AdminNotificationDto } from './admin-notification.dto';
import { OmitType } from '@nestjs/mapped-types';

export class AdminCreateNotificationDto extends OmitType(AdminNotificationDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}

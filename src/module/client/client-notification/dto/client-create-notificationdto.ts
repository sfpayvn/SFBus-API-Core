import { IsString, IsDate } from 'class-validator';
import { ClientNotificationDto } from './client-notification.dto';
import { OmitType } from '@nestjs/mapped-types';

export class ClientCreateNotificationDto extends OmitType(ClientNotificationDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}

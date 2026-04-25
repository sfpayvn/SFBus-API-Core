import { IsString, IsDate } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;
}

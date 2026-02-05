import { PartialType } from '@nestjs/mapped-types';
import { ClientCreateSettingDto } from './client-create-setting.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class ClientUpdateSettingDto extends PartialType(ClientCreateSettingDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}

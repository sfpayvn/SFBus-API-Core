import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateSettingDto } from './admin-create-setting.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class AdminUpdateSettingDto extends PartialType(AdminCreateSettingDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}

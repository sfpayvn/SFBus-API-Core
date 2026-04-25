import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto } from './create-setting.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusTemplateDto } from './admin-create-bus-template.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdateBusTemplateDto extends PartialType(AdminCreateBusTemplateDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

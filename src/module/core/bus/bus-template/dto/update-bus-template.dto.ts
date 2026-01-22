import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateBusTemplateDto } from './create-bus-template.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusTemplateDto extends PartialType(CreateBusTemplateDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

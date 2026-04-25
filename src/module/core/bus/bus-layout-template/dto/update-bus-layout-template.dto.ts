// dto/update-bus-template.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateBusLayoutTemplateDto } from './create-bus-layout-template.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusLayoutTemplateDto extends PartialType(CreateBusLayoutTemplateDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

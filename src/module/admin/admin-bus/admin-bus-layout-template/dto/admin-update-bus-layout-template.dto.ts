// dto/update-bus-template.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusLayoutTemplateDto } from './admin-create-bus-layout-template.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdateBusLayoutTemplateDto extends PartialType(AdminCreateBusLayoutTemplateDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

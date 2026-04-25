// dto/update-bus-template.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusScheduleLayoutDto } from './admin-create-bus-schedule-layout.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminUpdateBusScheduleLayoutDto extends PartialType(AdminCreateBusScheduleLayoutDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;
}

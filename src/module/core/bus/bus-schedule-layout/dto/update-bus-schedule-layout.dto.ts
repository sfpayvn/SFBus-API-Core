// dto/update-bus-template.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateBusScheduleLayoutDto } from './create-bus-schedule-layout.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusScheduleLayoutDto extends PartialType(CreateBusScheduleLayoutDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;
}

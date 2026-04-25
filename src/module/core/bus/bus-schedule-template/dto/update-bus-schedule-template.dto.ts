import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateBusScheduleTemplateDto } from './create-bus-schedule-template.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusScheduleTemplateDto extends PartialType(CreateBusScheduleTemplateDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

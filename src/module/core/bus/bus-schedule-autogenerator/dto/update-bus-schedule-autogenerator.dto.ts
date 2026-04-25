// src/bus-schedule/dto/update-bus-schedule.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { CreateBusScheduleAutogeneratorDto } from './create-bus-schedule-autogenerator.dto';
import { EVENT_STATUS } from '@/common/constants/status.constants';

export class UpdateBusScheduleAutogeneratorDto extends PartialType(CreateBusScheduleAutogeneratorDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}

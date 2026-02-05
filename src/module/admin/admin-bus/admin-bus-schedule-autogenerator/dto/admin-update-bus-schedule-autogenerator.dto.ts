// src/bus-schedule/dto/update-bus-schedule.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { AdminCreateBusScheduleAutogeneratorDto } from './admin-create-bus-schedule-autogenerator.dto';
import { EVENT_STATUS } from '@/common/constants/status.constants';

export class AdminUpdateBusScheduleAutogeneratorDto extends PartialType(AdminCreateBusScheduleAutogeneratorDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsOptional()
  @IsEnum([
    EVENT_STATUS.UN_PUBLISHED,
    EVENT_STATUS.SCHEDULED,
    EVENT_STATUS.IN_PROGRESS,
    EVENT_STATUS.COMPLETED,
    EVENT_STATUS.CANCELLED,
  ])
  status?: string;
}

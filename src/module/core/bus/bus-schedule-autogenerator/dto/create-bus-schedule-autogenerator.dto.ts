import { Types } from 'mongoose';
import { BusScheduleAutogeneratorDto, SpecificTimeSlotDto } from './bus-schedule-autogenerator.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { EVENT_STATUS } from '@/common/constants/status.constants';

// Custom transformer to handle Invalid Date
const ValidDateTransformer = () => {
  return Transform(({ value }) => {
    if (value === null || value === undefined) return null;
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  });
};

export class CreateeSpecificTimeSlotDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  timeSlot: string;
}

export class CreateBusScheduleAutogeneratorDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  repeatType: string;

  @IsOptional()
  @Type(() => Number)
  repeatInterval: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateeSpecificTimeSlotDto)
  specificTimeSlots: CreateeSpecificTimeSlotDto[];

  @IsOptional()
  @Type(() => String)
  repeatDaysPerWeek: string[];

  @IsNotEmpty()
  @Type(() => Number)
  preGenerateDays: number;

  @IsNotEmpty()
  @Type(() => Date)
  @ValidDateTransformer()
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  @ValidDateTransformer()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum([
    EVENT_STATUS.UN_PUBLISHED,
    EVENT_STATUS.SCHEDULED,
    EVENT_STATUS.IN_PROGRESS,
    EVENT_STATUS.COMPLETED,
    EVENT_STATUS.CANCELLED,
  ])
  status?: string;
}

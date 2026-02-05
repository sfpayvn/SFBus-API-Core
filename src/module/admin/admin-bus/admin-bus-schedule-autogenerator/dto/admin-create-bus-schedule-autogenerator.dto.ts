import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminCreateSpecificTimeSlotDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  timeSlot: string;
}

export class AdminCreateBusScheduleAutogeneratorDto {
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
  @Type(() => AdminCreateSpecificTimeSlotDto)
  specificTimeSlots: AdminCreateSpecificTimeSlotDto[];

  @IsOptional()
  @Type(() => String)
  repeatDaysPerWeek: string[];

  @IsNotEmpty()
  @Type(() => Number)
  preGenerateDays: number;

  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  endDate: Date;
}

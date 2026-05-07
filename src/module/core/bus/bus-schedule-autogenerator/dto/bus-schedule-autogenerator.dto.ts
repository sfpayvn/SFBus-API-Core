import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class SpecificTimeSlotDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  timeSlot: string;
}

export class BusScheduleAutogeneratorDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  repeatType: string;

  @Expose()
  repeatInterval: number;

  @Expose()
  specificTimeSlots: SpecificTimeSlotDto[];

  @Expose()
  repeatDaysPerWeek: string[];

  @Expose()
  preGenerateDays: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusScheduleAutogeneratorPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchBusScheduleAutogeneratorQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  sortBy: SearchBusScheduleAutogeneratorPagingQuerySortFilter;

  @IsOptional()
  filters: SearchBusScheduleAutogeneratorPagingQuerySortFilter[];
}

export class SearchBusScheduleRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleAutoGenerators: BusScheduleAutogeneratorDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
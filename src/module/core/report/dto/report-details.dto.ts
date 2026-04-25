import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

// Base DTO cho tất cả detail queries
export class BaseDetailQueryDto {
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @Type(() => String)
  platform?: string;

  @IsOptional()
  @Type(() => String)
  userId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  pageIdx?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize?: number = 20;

  @IsOptional()
  @IsEnum(['hour', 'day', 'week', 'month'])
  @Type(() => String)
  groupBy?: 'hour' | 'day' | 'week' | 'month';

  @IsOptional()
  @Type(() => Boolean)
  comparisonMode?: boolean = false;

  @IsOptional()
  @Type(() => Date)
  comparisonStartDate?: Date;

  @IsOptional()
  @Type(() => Date)
  comparisonEndDate?: Date;
}

// Booking Detail Query
export class BookingDetailQueryDto extends BaseDetailQueryDto {
  @IsOptional()
  @Type(() => String)
  busRouteId?: string;

  @IsOptional()
  @Type(() => String)
  status?: string;
}

// Schedule Detail Query
export class ScheduleDetailQueryDto extends BaseDetailQueryDto {
  @IsOptional()
  @Type(() => String)
  busRouteId?: string;

  @IsOptional()
  @Type(() => String)
  status?: string;
}

// Goods Detail Query
export class GoodsDetailQueryDto extends BaseDetailQueryDto {
  @IsOptional()
  @Type(() => String)
  busRouteId?: string;

  @IsOptional()
  @Type(() => String)
  status?: string;
}

// Payment Detail Query
export class PaymentDetailQueryDto extends BaseDetailQueryDto {
  @IsOptional()
  @Type(() => String)
  paymentMethodId?: string;

  @IsOptional()
  @Type(() => String)
  bookingId?: string;
}

// Generic Response DTO (flat list)
export class DetailResponseDto<T> {
  data: T[];
  total: number;
  pageIdx: number;
  pageSize: number;
  totalPages: number;
  metadata: {
    startDate: string;
    endDate: string;
  };
}

// Grouped Response DTO
export class GroupedDetailItem<T> {
  label: string; // "01/12", "Tuần 48", etc.
  date: string; // ISO date string for the group
  count: number;
  data: T[]; // actual records in this group
}

export class GroupedDetailResponseDto<T> {
  groups: GroupedDetailItem<T>[];
  total: number;
  comparisonGroups?: GroupedDetailItem<T>[]; // Optional comparison data
  comparisonTotal?: number;
  metadata: {
    startDate: string;
    endDate: string;
    groupBy: string;
    comparisonStartDate?: string;
    comparisonEndDate?: string;
  };
}

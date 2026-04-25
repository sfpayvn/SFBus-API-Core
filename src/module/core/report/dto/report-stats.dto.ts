import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsString, IsBoolean } from 'class-validator';

export class StatsQueryDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  comparisonStartDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  comparisonEndDate?: Date;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsBoolean()
  comparisonMode: boolean;
}

export class StatsResponseDto {
  value: number;
  total: number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  percentage?: number;
}

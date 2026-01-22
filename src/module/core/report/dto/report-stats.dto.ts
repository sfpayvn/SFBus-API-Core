import { IsOptional, IsDateString, IsString, IsBoolean } from 'class-validator';

export class StatsQueryDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsDateString()
  comparisonStartDate?: Date;
  @IsOptional()
  @IsDateString()
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

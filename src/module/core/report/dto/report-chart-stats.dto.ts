import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsString, IsBoolean, IsEnum } from 'class-validator';

export class ChartStatsQueryDto {
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

  @IsBoolean()
  comparisonMode: boolean;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class ChartDataPointDto {
  labels: string[];
  data: number[];
  total: number;
  average: number;
}

export class ChartStatsResponseDto {
  current: ChartDataPointDto;
  previous?: ChartDataPointDto;
  metadata: {
    startDate: string;
    endDate: string;
    comparisonStartDate?: string;
    comparisonEndDate?: string;
    groupBy?: string;
  };
}

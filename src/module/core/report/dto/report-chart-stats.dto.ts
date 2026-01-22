import { IsOptional, IsDateString, IsString, IsBoolean, IsEnum } from 'class-validator';

export class ChartStatsQueryDto {
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

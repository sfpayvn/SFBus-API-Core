import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsString, IsBoolean, IsEnum } from 'class-validator';

export class PaymentMethodStatsQueryDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class PaymentMethodStatItemDto {
  method: string;
  count: number;
  percentage: number;
}

export class PaymentMethodStatsResponseDto {
  data: PaymentMethodStatItemDto[];
  total: number;
  metadata: {
    startDate: string;
    endDate: string;
  };
}

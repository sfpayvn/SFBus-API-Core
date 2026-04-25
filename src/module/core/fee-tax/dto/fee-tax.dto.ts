import { IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, IsDateString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class FeeTaxConditionsDto {
  @IsOptional()
  @IsNumber()
  minTotal?: number;

  @IsOptional()
  @IsNumber()
  maxTotal?: number;

  @IsOptional()
  @IsNumber()
  minTickets?: number;

  @IsOptional()
  @IsNumber()
  maxTickets?: number;

  @IsOptional()
  @IsString({ each: true })
  appliedRoutes?: string[];

  @IsOptional()
  @IsString({ each: true })
  excludedRoutes?: string[];
}

export class CreateFeeTaxDto {
  @IsNotEmpty()
  @IsEnum(['fee', 'tax'])
  feeType: 'fee' | 'tax';

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(['fixed', 'percentage'])
  calculationType: 'fixed' | 'percentage';

  @IsNotEmpty()
  @IsEnum(['ticket_price', 'total_booking', 'after_discount'])
  appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priority?: number;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeeTaxConditionsDto)
  conditions?: FeeTaxConditionsDto;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateFeeTaxDto {
  @IsOptional()
  @IsEnum(['fee', 'tax'])
  feeType?: 'fee' | 'tax';

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['fixed', 'percentage'])
  calculationType?: 'fixed' | 'percentage';

  @IsOptional()
  @IsEnum(['ticket_price', 'total_booking', 'after_discount'])
  appliedOn?: 'ticket_price' | 'total_booking' | 'after_discount';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  value?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priority?: number;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeeTaxConditionsDto)
  conditions?: FeeTaxConditionsDto;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class FeeTaxDto {
  _id: string;
  tenantId: string;
  feeType: 'fee' | 'tax';
  name: string;
  calculationType: 'fixed' | 'percentage';
  appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';
  value: number;
  priority: number;
  enabled: boolean;
  description?: string;
  conditions?: FeeTaxConditionsDto;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

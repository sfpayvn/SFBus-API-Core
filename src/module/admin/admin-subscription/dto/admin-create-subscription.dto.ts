import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminCreateFunctionRuleDto {
  @IsNotEmpty()
  @Type(() => String)
  key: string;

  @IsNotEmpty()
  @Type(() => String)
  type: 'count' | 'unlimited';

  @IsOptional()
  @Type(() => Number)
  quota?: number;

  @IsOptional()
  @Type(() => String)
  windowType?: 'calendar' | 'rolling';

  @IsOptional()
  @Type(() => String)
  windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';

  @IsOptional()
  @Type(() => Number)
  windowSize?: number;

  @IsOptional()
  @Type(() => Number)
  burst?: number;

  @IsOptional()
  @Type(() => Number)
  concurrency?: number;
}

export class AdminCreteModuleRuleDto {
  @IsNotEmpty()
  @Type(() => String)
  key: string;

  @IsOptional()
  @Type(() => AdminCreateFunctionRuleDto)
  moduleRule?: AdminCreateFunctionRuleDto;

  @IsNotEmpty()
  @Type(() => AdminCreateFunctionRuleDto)
  functions: AdminCreateFunctionRuleDto[];
}

export class AdminCreateSubscriptionLimitationDto {
  defaultAction: 'allow' | 'block';

  @IsNotEmpty()
  @Type(() => AdminCreteModuleRuleDto)
  modules: AdminCreteModuleRuleDto[];
}

export class AdminCreateSubscriptionDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @Type(() => String)
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  duration: number;

  @IsNotEmpty()
  @Type(() => String)
  durationUnit: 'month' | 'week' | 'day' | 'year';

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminCreateSubscriptionLimitationDto)
  limitation: AdminCreateSubscriptionLimitationDto;

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  popular: boolean;
}

import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFunctionRuleDto {
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

export class CreteModuleRuleDto {
  @IsNotEmpty()
  @Type(() => String)
  key: string;

  @IsOptional()
  @Type(() => CreateFunctionRuleDto)
  moduleRule?: CreateFunctionRuleDto;

  @IsNotEmpty()
  @Type(() => CreateFunctionRuleDto)
  functions: CreateFunctionRuleDto[];
}

export class CreateSubscriptionLimitationDto {
  @IsNotEmpty()
  @Type(() => String)
  defaultAction: 'allow' | 'block';

  @IsNotEmpty()
  @Type(() => CreteModuleRuleDto)
  modules: CreteModuleRuleDto[];
}

export class CreateSubscriptionDto {
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
  @Type(() => CreateSubscriptionLimitationDto)
  limitation: CreateSubscriptionLimitationDto;

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  popular: boolean;
}

import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminFunctionRuleDto {
  @Expose()
  readonly key: string;

  @Expose()
  readonly type: 'count' | 'unlimited';

  @Expose()
  readonly quota?: number;

  @Expose()
  readonly windowType?: 'calendar' | 'rolling';

  @Expose()
  readonly windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';

  @Expose()
  readonly windowSize?: number;

  @Expose()
  readonly burst?: number;

  @Expose()
  readonly concurrency?: number;
}

export class AdminModuleRuleDto {
  @Expose()
  readonly key: string;

  @Expose()
  @Type(() => AdminFunctionRuleDto)
  readonly moduleRule?: AdminFunctionRuleDto;

  @Expose()
  @Type(() => AdminFunctionRuleDto)
  readonly functions: AdminFunctionRuleDto[];
}

export class AdminSubscriptionLimitationDto {
  @Expose()
  readonly defaultAction: 'allow' | 'block';

  @Expose()
  @Type(() => AdminModuleRuleDto)
  readonly modules: AdminModuleRuleDto[];
}

export class AdminSubscriptionDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly price: number;

  @Expose()
  readonly description: string;

  @Expose()
  readonly duration: number;

  @Expose()
  readonly durationUnit: 'month' | 'week' | 'day' | 'year';

  @Expose()
  @Type(() => AdminSubscriptionLimitationDto)
  readonly limitation: AdminSubscriptionLimitationDto;

  @Expose()
  readonly status: string;

  @Expose()
  popular: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchSubscriptionQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchSubscriptionQuery {
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
  keyword: string;

  @IsOptional()
  sortBy: AdminSearchSubscriptionQuerySortFilter;

  @IsOptional()
  filters: AdminSearchSubscriptionQuerySortFilter[];
}

export class AdminSearchSubscriptionsRes {
  pageIdx: number = 0;
  subscriptions: AdminSubscriptionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

import {
  IsMongoId,
  IsOptional,
  IsIn,
  IsBoolean,
  IsInt,
  Min,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { Expose, Exclude, Type } from 'class-transformer';
import { DURATION_STATUS } from '@/common/constants/status.constants';

export class TenantSubscriptionDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  subscriptionId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  duration: number; // cùng đơn vị với durationUnit

  @Expose()
  durationUnit: string;

  @Expose()
  startAt: Date;

  @Expose()
  endAt: Date;

  @Expose()
  status: 'active' | 'canceled' | 'expired';

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class RegisterSubscriptionDto {
  @IsMongoId()
  subscriptionId: string;

  @IsOptional()
  @IsDateString()
  startAt?: string; // ISO; mặc định now

  @IsOptional()
  @IsIn(Object.keys(DURATION_STATUS))
  durationUnit?: string; // 'month' | 'day'

  @IsOptional()
  @IsInt()
  @Min(0)
  durationOverride?: number; // override duration của plan

  @IsOptional()
  @IsBoolean()
  replaceCurrent?: boolean; // true = hủy active hiện tại và thay thế
}

export class SearchTenantSubscriptionQuerySortFilter {
  key: string;
  value: string;
}

export class SearchTenantSubscriptionQuery {
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
  sortBy: SearchTenantSubscriptionQuerySortFilter;

  @IsOptional()
  filters: SearchTenantSubscriptionQuerySortFilter[];
}

export class SearchTenantSubscriptionRes {
  pageIdx: number = 0;
  tenantSubscriptions: TenantSubscriptionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

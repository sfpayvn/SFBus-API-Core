import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class TenantSettingDto {
  @Expose()
  appearance: string;

  @Expose()
  timezone: string;
}

export class TenantDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  subscriptionId: Types.ObjectId;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  address?: string;

  @Expose()
  logoId?: string;

  @Expose()
  logo?: string;

  @Expose()
  setting?: TenantSettingDto;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchTenantQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchTenantQuery {
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
  sortBy: SearchTenantQuerySortFilter;

  @IsOptional()
  filters: SearchTenantQuerySortFilter[];
}

export class SearchTenantsRes {
  pageIdx: number = 0;
  tenants: TenantDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientTenantSettingDto {
  @Expose()
  readonly appearance: string;

  @Expose()
  readonly timezone: string;
}

export class ClientTenantDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  readonly code: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly email?: string;

  @Expose()
  readonly address?: string;

  @Expose()
  readonly logo?: string;

  @Expose()
  readonly setting: ClientTenantSettingDto;

  @Expose()
  subscriptionId?: Types.ObjectId;

  @Expose()
  readonly status?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchTenantQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class ClientSearchTenantQuery {
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
  sortBy: ClientSearchTenantQuerySortFilter;

  @IsOptional()
  filters: ClientSearchTenantQuerySortFilter[];
}

export class ClientSearchTenantsRes {
  pageIdx: number = 0;
  tenants: ClientTenantDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

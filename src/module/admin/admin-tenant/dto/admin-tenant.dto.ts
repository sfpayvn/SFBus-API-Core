import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AdminPaymentDto } from '../../admin-payment/dto/admin-payment.dto';

export class AdminTenantSettingDto {
  @Expose()
  appearance: string;

  @Expose()
  timezone: string;
}

export class AdminTenantDto {
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
  setting: AdminTenantSettingDto;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchTenantQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchTenantQuery {
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
  sortBy: AdminSearchTenantQuerySortFilter;

  @IsOptional()
  filters: AdminSearchTenantQuerySortFilter[];
}

export class AdminSearchTenantsRes {
  pageIdx: number = 0;
  tenants: AdminTenantDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

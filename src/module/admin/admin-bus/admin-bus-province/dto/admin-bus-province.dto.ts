import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminBusProvinceDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isActive?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class AdminSearchBusProvincesQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusProvincesQuery {
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
  sortBy: AdminSearchBusProvincesQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusProvincesQuerySortFilter[];
}

export class AdminSearchBusProvincesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busProvinces: AdminBusProvinceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

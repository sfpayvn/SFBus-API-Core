import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminSeatTypeDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  isEnv: boolean;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchSeatTypesQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchSeatTypesQuery {
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
  sortBy: AdminSearchSeatTypesQuerySortFilter;

  @IsOptional()
  filters: AdminSearchSeatTypesQuerySortFilter[];
}

export class AdminSearchSeatTypeRes {
  pageIdx: number = 0;
  seatTypes: AdminSeatTypeDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

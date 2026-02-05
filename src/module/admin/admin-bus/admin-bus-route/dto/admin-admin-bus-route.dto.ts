import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminBusRouteDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  breakPoints: AdminBusRouteBreakPointsDto[];

  @Expose()
  distance: number;

  @Expose()
  distanceTime: string;

  @Expose()
  notes?: string;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminBusRouteBreakPointsDto {
  @Expose()
  busStationId: Types.ObjectId;
}

export class AdminSearchBusRouteQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusRouteQuery {
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
  sortBy: AdminSearchBusRouteQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusRouteQuerySortFilter[];
}

export class AdminSearchBusRouteRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busRoutes: AdminBusRouteDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

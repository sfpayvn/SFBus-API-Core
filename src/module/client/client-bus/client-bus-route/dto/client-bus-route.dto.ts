import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

export class ClientBusRouteDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  breakPoints: ClientBusRouteBreakPointsDto[];

  @Expose()
  distance: number;

  @Expose()
  distanceTime: string;

  @Expose()
  notes?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientBusRouteBreakPointsDto {
  busStationId: Types.ObjectId;
}

export class ClientSearchBusRouteQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusRouteQuery {
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
  sortBy: ClientSearchBusRouteQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusRouteQuerySortFilter[];
}

export class ClientSearchBusRouteRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busRoutes: ClientBusRouteDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { BusDto } from '../../bus/dto/bus.dto';
import { BusStationDto } from '../../bus-station/dto/bus-station.dto';

export class BusRouteDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  breakPoints: BusRouteBreakPointsDto[];

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

export class BusRouteBreakPointsDto {
  busStationId: Types.ObjectId;
  busStation?: BusStationDto;
}

export class SearchBusRouteQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusRouteQuery {
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
  sortBy: SearchBusRouteQuerySortFilter;

  @IsOptional()
  filters: SearchBusRouteQuerySortFilter[];
}

export class SearchBusRouteRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busRoutes: BusRouteDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BusStationDto } from '../../bus-station/dto/bus-station.dto';

export class BusProvinceDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busStations: BusStationDto[];

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value !== false)
  isActive?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class SearchBusProvincesQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusProvincesQuery {
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
  sortBy: SearchBusProvincesQuerySortFilter;

  @IsOptional()
  filters: SearchBusProvincesQuerySortFilter[];
}

export class SearchBusProvincesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busProvinces: BusProvinceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

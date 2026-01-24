import { Type, Expose, Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class BusStationDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  detailAddress: string;

  @Expose()
  location: string;

  @Expose()
  provinceId: Types.ObjectId;

  @Expose()
  @Transform(({ value }) => value || '')
  imageId?: Types.ObjectId;

  @Expose()
  @Transform(({ value }) => value || '')
  image?: string;

  @Expose()
  @Transform(({ value }) => value || false)
  isOffice?: boolean;

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

export class SearchBusStationsQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusStationsQuery {
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
  sortBy: SearchBusStationsQuerySortFilter;

  @IsOptional()
  filters: SearchBusStationsQuerySortFilter[];
}

export class SearchBusStationsRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busStations: BusStationDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

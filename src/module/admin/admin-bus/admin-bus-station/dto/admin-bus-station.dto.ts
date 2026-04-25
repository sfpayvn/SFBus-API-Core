import { Type, Expose, Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminBusStationDto {
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

  @Expose()
  provinceId: Types.ObjectId;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class AdminSearchBusStationsQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusStationsQuery {
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
  sortBy: AdminSearchBusStationsQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusStationsQuerySortFilter[];
}

export class AdminSearchBusStationsRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busStations: AdminBusStationDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

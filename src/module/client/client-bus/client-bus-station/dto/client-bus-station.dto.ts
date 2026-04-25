import { Type, Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientBusStationDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly detailAddress: string;

  @Expose()
  readonly location: string;

  @Expose()
  readonly provinceId: Types.ObjectId;

  @Expose()
  readonly imageId?: Types.ObjectId;

  @Expose()
  readonly image?: any;

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

export class ClientSearchBusStationsQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusStationsQuery {
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
  sortBy: ClientSearchBusStationsQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusStationsQuerySortFilter[];
}

export class ClientSearchBusStationsRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busStations: ClientBusStationDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

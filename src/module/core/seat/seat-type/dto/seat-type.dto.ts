import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SeatTypeDto {
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

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchSeatTypeQuerySortFilter {
  key: string;
  value: string;
}

export class SearchSeatTypeQuery {
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
  sortBy: SearchSeatTypeQuerySortFilter;

  @IsOptional()
  filters: SearchSeatTypeQuerySortFilter[];
}

export class SearchSeatTypeRes {
  pageIdx: number = 0;
  seatTypes: SeatTypeDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

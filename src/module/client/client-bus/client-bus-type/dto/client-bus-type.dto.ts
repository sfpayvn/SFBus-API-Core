import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class ClientBusTypeDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchBusTypesQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusTypesQuery {
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
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  sortBy: ClientSearchBusTypesQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusTypesQuerySortFilter[];
}

export class ClientSearchBusTypesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTypes: ClientBusTypeDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
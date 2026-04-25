import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class ClientGoodsCategoryDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchGoodsCategoryPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class ClientSearchGoodsCategoryPagingQuery {
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
  sortBy: ClientSearchGoodsCategoryPagingQuerySortFilter;

  @IsOptional()
  filters: ClientSearchGoodsCategoryPagingQuerySortFilter[];
}

export class ClientSearchGoodsPagingRes {
  pageIdx: number = 0;
  goodsCategories: ClientGoodsCategoryDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

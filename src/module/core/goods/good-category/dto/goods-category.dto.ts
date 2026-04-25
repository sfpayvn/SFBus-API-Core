import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GoodsCategoryDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  iconId: Types.ObjectId;

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

export class SearchGoodsCategoryPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchGoodsCategoryPagingQuery {
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
  sortBy: SearchGoodsCategoryPagingQuerySortFilter;

  @IsOptional()
  filters: SearchGoodsCategoryPagingQuerySortFilter[];
}

export class SearchGoodsPagingRes {
  pageIdx: number = 0;
  goodsCategories: GoodsCategoryDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

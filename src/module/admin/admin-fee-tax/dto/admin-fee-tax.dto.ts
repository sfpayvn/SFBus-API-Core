// Re-export DTOs from core fee-tax module
export {
  CreateFeeTaxDto,
  UpdateFeeTaxDto,
  FeeTaxDto,
  FeeTaxConditionsDto,
} from '@/module/core/fee-tax/dto/fee-tax.dto';

import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { FeeTaxDto } from '@/module/core/fee-tax/dto/fee-tax.dto';

export class FeeTaxSortFilter {
  @IsString()
  key: string = '';

  @IsString()
  value: 'ascend' | 'desc' = 'ascend';
}

export class AdminSearchFeeTaxPagingQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number = 0;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number = 0;

  @IsOptional()
  @IsString()
  @Type(() => String)
  keyword: string = '';

  @IsOptional()
  @Type(() => FeeTaxSortFilter)
  sortBy: FeeTaxSortFilter = new FeeTaxSortFilter();

  @IsOptional()
  @Type(() => FeeTaxSortFilter)
  filters: FeeTaxSortFilter[] = [];
}

export class AdminSearchFeeTaxPagingRes {
  pageIdx: number = 0;

  feeTaxes: FeeTaxDto[] = [];

  totalPage: number = 0;

  totalItem: number = 0;
}

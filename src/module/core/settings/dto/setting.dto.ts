import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@Exclude()
export class SettingDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  groupName?: string;

  @Expose()
  value: string;

  @Expose()
  description?: string;

  @Exclude()
  tenantId: Types.ObjectId;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;
}

export class SettingSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class SearchSettingsPagingQuery {
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
  sortBy: SettingSortFilter;

  @IsOptional()
  filters: SettingSortFilter[];
}

export class SearchSettingsRes {
  pageIdx: number;
  settings: SettingDto[];
  totalPage: number;
  totalItem: number;
}

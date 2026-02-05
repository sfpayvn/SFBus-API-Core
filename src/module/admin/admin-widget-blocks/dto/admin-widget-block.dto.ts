import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminWidgetBlockDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  imageUrl: string;

  @Expose()
  html: string;

  @Expose()
  css?: string;

  @Expose()
  projectData?: string;

  @Expose()
  isActive: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchWidgetBlockQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchWidgetBlockQuery {
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
  sortBy: AdminSearchWidgetBlockQuerySortFilter;

  @IsOptional()
  filters: AdminSearchWidgetBlockQuerySortFilter[];
}

export class AdminSearchWidgetBlocksResultDto {
  pageIdx: number = 0;
  widgetBlocks: AdminWidgetBlockDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SearchContentLayoutsResultDto {
  contentLayouts: ContentLayoutDto[] = [];
  pageIdx: number = 0;
  totalItem: number = 0;
  totalPage: number = 0;
}

export class ContentLayoutZoneDto {
  @Expose()
  name: string;

  @Expose()
  html: string;

  @Expose()
  css: string;
}

export class ContentLayoutDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  imageUrl: string;

  @Expose()
  zones: string;

  @Expose()
  @Transform(({ value }) => value || '')
  description: string;

  @Expose()
  projectData: string;

  @Expose()
  platform: string;

  @Expose()
  appSource: string;

  @Expose()
  isPublish: boolean;

  @Expose()
  startDate: Date;

  @Expose()
  endDate?: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchContentLayoutQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchContentLayoutQuery {
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
  sortBy: SearchContentLayoutQuerySortFilter;

  @IsOptional()
  filters: SearchContentLayoutQuerySortFilter[];
}

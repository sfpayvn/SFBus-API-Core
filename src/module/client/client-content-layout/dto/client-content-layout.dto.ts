import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientContentLayoutDto {
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

export class ClientSearchContentLayoutsResultDto {
  contentLayouts: ClientContentLayoutDto[] = [];
  pageIdx: number = 0;
  totalItem: number = 0;
  totalPage: number = 0;
}

export class ClientSearchContentLayoutQuery {
  @IsInt()
  @IsOptional()
  pageIdx?: number = 0;

  @IsInt()
  @IsOptional()
  pageSize?: number = 10;

  @IsString()
  @IsOptional()
  keyword?: string = '';

  @IsOptional()
  sortBy?: any = {};

  @IsOptional()
  filters?: any[] = [];
}

export class ClientAvailableSlugQueryDto {
  @IsString()
  @IsNotEmpty()
  appSource: string;

  @IsString()
  @IsNotEmpty()
  platform: string;
}

export class ClientAvailableBySlugQueryDto {
  @IsString()
  @IsNotEmpty()
  appSource: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

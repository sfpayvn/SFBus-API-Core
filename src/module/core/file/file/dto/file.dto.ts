import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class FileDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  link: string;

  @Expose()
  filename: string;

  @Expose()
  contentType: string;

  @Expose()
  folderId: Types.ObjectId;

  @Expose()
  isFavorite: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  uploadDate?: Date;

  @Exclude()
  md5?: string;

  @Exclude()
  length?: number;

  @Exclude()
  chunkSize?: number;

  @Exclude()
  metadata?: any;

  @Exclude()
  __v?: number;
}

export class SearchFilesQuerySortFilter {
  key: string;
  value: string;
}

export class SearchFilesQuery {
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
  sortBy: SearchFilesQuerySortFilter;

  @IsOptional()
  filters: SearchFilesQuerySortFilter[];

  @IsOptional()
  @IsString()
  fileFolderId: Types.ObjectId | null;
}

export class SearchFilesRes {
  pageIdx: number = 0;
  files: FileDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

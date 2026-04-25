import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import e from 'express';
import { Types } from 'mongoose';

export class AdminPromotionDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  discountType: 'percentage' | 'fixed';

  @Expose()
  discountValue: number;

  @Expose()
  expireDate: Date;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminRedeemPromotionDto {
  bookingIds: Types.ObjectId[];
  userId: Types.ObjectId;
  promotionId: Types.ObjectId;
}

export class AdminSearchPromotionPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchPromotionPagingQuery {
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
  sortBy: AdminSearchPromotionPagingQuerySortFilter;

  @IsOptional()
  filters: AdminSearchPromotionPagingQuerySortFilter[];
}

export class AdminSearchPromotionPagingRes {
  pageIdx: number = 0;
  promotions: AdminPromotionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

export class AdminRequestPromotionByRule {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  bookingIds: Types.ObjectId[];
}

export class AdminRequestPromotionMass {}

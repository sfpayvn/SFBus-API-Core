import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import e from 'express';
import { Types } from 'mongoose';

export class DriverPromotionDto {
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

export class DriverRedeemPromotionDto {
  bookingIds: Types.ObjectId[];
  userId: Types.ObjectId;
  promotionId: Types.ObjectId;
}

export class DriverSearchPromotionPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchPromotionPagingQuery {
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
  sortBy: DriverSearchPromotionPagingQuerySortFilter;

  @IsOptional()
  filters: DriverSearchPromotionPagingQuerySortFilter[];
}

export class DriverSearchPromotionPagingRes {
  pageIdx: number = 0;
  promotions: DriverPromotionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

export class DriverRequestPromotionByRule {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  bookingIds: Types.ObjectId[];
}

export class DriverRequestPromotionMass {}
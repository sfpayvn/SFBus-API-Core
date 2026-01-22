import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { GoodsCategoryDto } from '../../good-category/dto/goods-category.dto';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';

export class GoodsDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleId: Types.ObjectId;

  @Expose()
  busSchedule: BusScheduleDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: BusRouteDto;

  @Expose()
  name: string;

  @Expose()
  goodsNumber: string;

  @Expose()
  customerName: string;

  @Expose()
  customerPhoneNumber: string;

  @Expose()
  customerAddress: string;

  @Expose()
  senderName: string;

  @Expose()
  senderPhoneNumber: string;

  @Expose()
  senderAddress: string;

  @Expose()
  goodsPriority: number;

  @Expose()
  goodsImportant: boolean;

  @Expose()
  quantity: number;

  @Expose()
  shippingCost: number;

  @Expose()
  cod: number;

  @Expose()
  goodsValue: number;

  @Expose()
  categories: GoodsCategoryDto[];

  @Expose()
  weight: number;

  @Expose()
  length: number;

  @Expose()
  width: number;

  @Expose()
  note: string;

  @Expose()
  status: string;

  @Expose()
  paymentStatus: string;

  @Expose()
  paidBy: string;

  @Expose()
  imageIds: Types.ObjectId[];

  @Expose()
  images: string[];

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class GoodsSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class SearchGoodsPagingQuery {
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
  sortBy: GoodsSortFilter;

  @IsOptional()
  filters: GoodsSortFilter[];
}

export class SearchGoodsPagingRes {
  pageIdx: number = 0;
  goods: GoodsDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}



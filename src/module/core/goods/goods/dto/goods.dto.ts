import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { GoodsCategoryDto } from '../../good-category/dto/goods-category.dto';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { DeliveryType, FulfillmentMode, GoodsEventType } from '../../types/goods.types';

export class GoodsEvent {
  @Expose()
  type: GoodsEventType;

  @Expose()
  stationId?: Types.ObjectId; // station liên quan (drop/nhận/...)

  @Expose()
  scheduleId?: Types.ObjectId; // schedule liên quan

  @Expose()
  note?: string = '';

  @Expose()
  createdAt?: Date;
}

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
  senderName: string;

  @Expose()
  senderPhoneNumber: string;

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

  // Station relationship fields
  @Expose()
  originStationId?: Types.ObjectId; // station gửi (office gửi)

  @Expose()
  destinationStationId?: Types.ObjectId; // station nhận (office nhận / hub cuối)

  @Expose()
  currentStationId?: Types.ObjectId; // station hiện tại đang giữ hàng (null khi ON_BOARD)

  @Expose()
  currentScheduleId?: Types.ObjectId; // schedule hiện tại (alias cho busScheduleId)

  // Delivery type & address
  @Expose()
  deliveryType?: DeliveryType; // STATION | ADDRESS

  @Expose()
  pickupFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @Expose()
  deliveryFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @Expose()
  pickupAddress?: string; // nếu nhận dọc đường

  @Expose()
  deliveryAddress?: string; // nếu giao tận nhà

  @Expose()
  createdAt: Date;

  // NEW: history log
  events: GoodsEvent[] = [];

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
  countByStatus: Record<string, number> = {};
}

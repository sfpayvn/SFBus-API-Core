import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { ClientGoodsCategoryDto } from '../../client-goods-category/dto/client-goods-category.dto';
import { DeliveryType, FulfillmentMode } from '@/module/core/goods/types/goods.types';

export class ClientGoodsDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleId: Types.ObjectId;

  @Expose()
  busSchedule: BusScheduleDto;

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
  quantity: number;

  @Expose()
  shippingCost: number;

  @Expose()
  cod: number;

  @Expose()
  goodsValue: number;

  @Expose()
  categories: ClientGoodsCategoryDto[];

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  weight: number;

  @Expose()
  length: number;

  @Expose()
  width: number;

  @Expose()
  busRoute: BusRouteDto;

  @Expose()
  note: string;

  @Expose()
  status: string;

  @Expose()
  paidBy: string;

  // Station relationship fields
  @Expose()
  @IsOptional()
  originStationId?: Types.ObjectId; // station gửi (office gửi)

  @Expose()
  @IsOptional()
  destinationStationId?: Types.ObjectId; // station nhận (office nhận / hub cuối)

  @Expose()
  @IsOptional()
  currentStationId?: Types.ObjectId; // station hiện tại đang giữ hàng (null khi ON_BOARD)

  @Expose()
  @IsOptional()
  currentScheduleId?: Types.ObjectId; // schedule hiện tại (alias cho busScheduleId)

  // Delivery type & address
  @Expose()
  @IsOptional()
  deliveryType?: DeliveryType; // STATION | ADDRESS

  @Expose()
  @IsOptional()
  pickupFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @Expose()
  @IsOptional()
  deliveryFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @Expose()
  @IsOptional()
  pickupAddress?: string; // nếu nhận dọc đường

  @Expose()
  @IsOptional()
  deliveryAddress?: string; // nếu giao tận nhà

  @Exclude()
  goodsPriority: number;

  @Exclude()
  goodsImportant: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

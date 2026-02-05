import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ClientBusScheduleDto } from '../../client-bus/client-bus-schedule/dto/client-bus-schedule.dto';
import { ClientPaymentDto } from '../../client-payment/dto/client-payment.dto';
import { ClientPromotionDto } from '../../client-promotion/dto/client-promotion.dto';

export class ClientUserInforBookingDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
}

export class ClientBookingItemSeatDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  seatNumber: string;

  @Expose()
  name: string;

  @Expose()
  status: string;
}

export class ClientBookingItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  bookingItemNumber: string;

  @Expose()
  @Type(() => ClientBookingItemSeatDto)
  seat: ClientBookingItemSeatDto;

  @Expose()
  price: number;

  @Expose()
  discountAmount: number;

  @Expose()
  afterDiscountPrice: number;

  @Expose()
  @Type(() => String)
  departure: string;

  @Expose()
  @Type(() => String)
  destination: string;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class ClientBookingDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  tenantId: string;

  @Expose()
  @Type(() => String)
  userId: string;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  @Type(() => ClientUserInforBookingDto)
  userInfo: ClientUserInforBookingDto;

  @Expose()
  bookingNumber: string;

  @Expose()
  @Type(() => String)
  busScheduleId: string;

  @Expose()
  @Type(() => String)
  busRouteId: string;

  @Expose()
  @Type(() => ClientBusScheduleDto)
  busSchedule: ClientBusScheduleDto;

  @Expose()
  @Type(() => ClientBookingItemDto)
  bookingItems: ClientBookingItemDto[];

  @Expose()
  @Type(() => ClientPromotionDto)
  promotion: ClientPromotionDto;

  @Expose()
  @Type(() => ClientPaymentDto)
  payments: ClientPaymentDto[];

  @Expose()
  totalPrice: number;

  @Expose()
  discountTotalAmount: number;

  @Expose()
  afterDiscountTotalPrice: number;

  @Expose()
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @Expose()
  bookingGroupNumber: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class ClientBookingSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[] | Types.ObjectId | Types.ObjectId[];
}

export class ClientSearchBookingPagingQuery {
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
  sortBy: ClientBookingSortFilter;

  @IsOptional()
  filters: ClientBookingSortFilter[];
}

export class ClientSearchBookingPagingRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  bookings: ClientBookingDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

export class ClientRequestUpdatePaymentMethodByIdsDto {
  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;
}

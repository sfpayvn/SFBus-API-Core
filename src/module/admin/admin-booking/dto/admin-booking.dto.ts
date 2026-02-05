import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AdminBusScheduleDto } from '../../admin-bus/admin-bus-schedule/dto/admin-bus-schedule.dto';
import { AdminPaymentDto } from '../../admin-payment/dto/admin-payment.dto';
import { AdminPromotionDto } from '../../admin-promotion/dto/admin-promotion.dto';

export class AdminUserInforBookingDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
}

export class AdminBookingItemSeatDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  seatNumber: string;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  status: string;
}

export class AdminBookingItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  bookingItemNumber: string;

  @Expose()
  @Type(() => AdminBookingItemSeatDto)
  seat: AdminBookingItemSeatDto;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  discountAmount: number;

  @Expose()
  @Type(() => Number)
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

export class AdminBookingDto {
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
  @Type(() => AdminUserInforBookingDto)
  userInfo: AdminUserInforBookingDto;

  @Expose()
  @Type(() => String)
  bookingNumber: string;

  @Expose()
  @Type(() => String)
  busScheduleId: string;

  @Expose()
  @Type(() => String)
  busRouteId: string;

  @Expose()
  @Type(() => AdminBusScheduleDto)
  busSchedule: AdminBusScheduleDto;

  @Expose()
  @Type(() => AdminBookingItemDto)
  bookingItems: AdminBookingItemDto[];

  @Expose()
  @Type(() => AdminPromotionDto)
  promotion: AdminPromotionDto;

  @Expose()
  @Type(() => AdminPaymentDto)
  payments: AdminPaymentDto[];

  @Expose()
  @Type(() => Number)
  totalPrice: number;

  @Expose()
  @Type(() => Number)
  discountTotalAmount: number;

  @Expose()
  @Type(() => Number)
  afterDiscountTotalPrice: number;

  @Expose()
  @Type(() => Date)
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @Expose()
  @Type(() => String)
  bookingGroupNumber: string;

  @Expose()
  @Type(() => String)
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

export class AdminBookingSortFilter {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class AdminSearchBookingPagingQuery {
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
  @Type(() => String)
  keyword: string;

  @IsOptional()
  @Type(() => AdminBookingSortFilter)
  sortBy: AdminBookingSortFilter;

  @IsOptional()
  @Type(() => AdminBookingSortFilter)
  filters: AdminBookingSortFilter[];
}

export class AdminSearchBookingPagingRes {
  @Expose()
  @Type(() => Number)
  pageIdx: number = 0;

  @Expose()
  @Type(() => AdminBookingDto)
  bookings: AdminBookingDto[];

  @Expose()
  @Type(() => Number)
  totalPage: number = 0;

  @Expose()
  @Type(() => Number)
  totalItem: number = 0;
}

export class AdminRequestUpdatePaymentMethodByIdsDto {
  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;
}

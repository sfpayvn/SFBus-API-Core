import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { PaymentDto } from '../../payment/dto/payment.dto';
import { BusScheduleDto } from '../../bus/bus-schedule/dto/bus-schedule.dto';
import { PromotionDto } from '../../promotion/dto/promotion.dto';

export class UserInforBookingDto {
  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  phoneNumber: string;
}

export class BookingItemSeatDto {
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

export class BookingItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  bookingItemNumber: string;

  @Expose()
  @Type(() => BookingItemSeatDto)
  seat: BookingItemSeatDto;

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

export class BookingDto {
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
  @Type(() => UserInforBookingDto)
  userInfo: UserInforBookingDto;

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
  @Type(() => BusScheduleDto)
  busSchedule: BusScheduleDto;

  @Expose()
  @Type(() => BookingItemDto)
  bookingItems: BookingItemDto[];

  @Expose()
  @Type(() => PromotionDto)
  promotion: PromotionDto;

  @Expose()
  @Type(() => PaymentDto)
  payments: PaymentDto[];

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
  idempotencyKey: string;

  @Expose()
  @Type(() => Date)
  expiresAt?: Date;

  @Expose()
  @Type(() => String)
  source: string;

  @Expose()
  @Type(() => String)
  status: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  startDate: Date;

  @Expose()
  @Type(() => Date)
  endDate: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class BookingSortFilter {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  value: string | string[] | Types.ObjectId | Types.ObjectId[];
}

export class SearchBookingPagingQuery {
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
  @Type(() => BookingSortFilter)
  sortBy: BookingSortFilter;

  @IsOptional()
  @Type(() => BookingSortFilter)
  filters: BookingSortFilter[];
}

export class SearchBookingPagingRes {
  @Expose()
  @Type(() => Number)
  pageIdx: number = 0;

  @Expose()
  @Type(() => BookingDto)
  bookings: BookingDto[];

  @Expose()
  @Type(() => Number)
  totalPage: number = 0;

  @Expose()
  @Type(() => Number)
  totalItem: number = 0;
}

export class RequestUpdatePaymentMethodByIdsDto {
  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;
}

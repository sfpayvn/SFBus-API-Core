import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingItemSeatDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  seatNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

export class CreateBookingItemDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  bookingItemNumber: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBookingItemSeatDto)
  seat: CreateBookingItemSeatDto;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  afterDiscountPrice: number;

  @IsOptional()
  @Type(() => Types.ObjectId)
  departure: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  destination: Types.ObjectId;
}

export class CreateBookingUserInforDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;
}

export class CreateBookingDto {
  tenantId: Types.ObjectId;
  userId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBookingUserInforDto)
  userInfo: CreateBookingUserInforDto;

  @IsNotEmpty()
  @Type(() => String)
  bookingNumber: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingItemDto)
  bookingItems: CreateBookingItemDto[];

  @IsOptional()
  @Type(() => Types.ObjectId)
  promotionId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Number)
  totalPrice: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountTotalAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  afterDiscountTotalPrice: number;

  @IsOptional()
  @Type(() => Date)
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsOptional()
  @IsEnum(ROLE_CONSTANTS)
  @Type(() => String)
  source?: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  createdBy: Types.ObjectId;
}

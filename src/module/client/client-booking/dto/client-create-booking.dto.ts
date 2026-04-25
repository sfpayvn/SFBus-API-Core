import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class ClientCreateBookingItemSeatDto {
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

export class ClientCreateBookingItemDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  bookingItemNumber: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClientCreateBookingItemSeatDto)
  seat: ClientCreateBookingItemSeatDto;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  afterDiscountPrice: number;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  departure: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  destination: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  createdBy: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  updatedBy: Types.ObjectId;
}

export class ClientCreateBookingUserInforDto {
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

export class ClientCreateBookingDto {
  tenantId: Types.ObjectId;
  userId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClientCreateBookingUserInforDto)
  userInfo: ClientCreateBookingUserInforDto;

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
  @Type(() => ClientCreateBookingItemDto)
  bookingItems: ClientCreateBookingItemDto[];

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
  @Type(() => Types.ObjectId)
  createdBy: Types.ObjectId;
}

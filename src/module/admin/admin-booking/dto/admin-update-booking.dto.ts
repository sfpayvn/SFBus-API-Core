import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  AdminCreateBookingDto,
  AdminCreateBookingItemDto,
  AdminCreateBookingItemSeatDto,
} from './admin-create-booking.dto';

export class AdminUpdateBookingItemSeatDto extends PartialType(AdminCreateBookingItemSeatDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

export class AdminUpdateBookingItemDto extends OmitType(AdminCreateBookingItemDto, ['seat'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminUpdateBookingItemSeatDto)
  seat: AdminUpdateBookingItemSeatDto;
}

export class AdminUpdateBookingDto extends OmitType(AdminCreateBookingDto, ['bookingItems', 'status'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminUpdateBookingItemDto)
  bookingItems: AdminUpdateBookingItemDto[];
}

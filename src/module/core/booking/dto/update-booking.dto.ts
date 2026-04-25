import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto, CreateBookingItemDto, CreateBookingItemSeatDto } from './create-booking.dto';
import { Types } from 'mongoose';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookingItemSeatDto extends PartialType(CreateBookingItemSeatDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: Types.ObjectId;
}

export class UpdateBookingItemDto extends OmitType(CreateBookingItemDto, ['seat'] as const) {
  @IsNotEmpty()
  @Type(() => String)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateBookingItemSeatDto)
  seat: UpdateBookingItemSeatDto;
}

export class UpdateBookingDto extends OmitType(CreateBookingDto, ['bookingItems', 'status'] as const) {
  @IsNotEmpty()
  @Type(() => String)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateBookingItemDto)
  bookingItems: UpdateBookingItemDto[];
}

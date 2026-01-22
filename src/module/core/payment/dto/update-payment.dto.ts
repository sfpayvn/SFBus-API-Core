import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

export class RequestUpdatePaymentByRedeemPromotionDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  referrentId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  bookingItemId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  promotionId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Number)
  discountAmount: number;
}

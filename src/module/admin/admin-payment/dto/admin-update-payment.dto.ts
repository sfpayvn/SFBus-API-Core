import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminCreatePaymentDto } from './admin-create-payment.dto';

export class AdminUpdatePaymentDto extends PartialType(AdminCreatePaymentDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

export class AdminRequestUpdatePaymentByRedeemPromotionDto {
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

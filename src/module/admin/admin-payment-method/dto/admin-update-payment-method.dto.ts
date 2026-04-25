import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreatePaymentMethodDto } from './admin-create-payment-method.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdatePaymentMethodDto extends PartialType(AdminCreatePaymentMethodDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

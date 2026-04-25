import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class SimplePaymentMethodDto {
  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  note?: string;

  @Expose()
  type: string;
}

export class PaymentDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  referrentId: Types.ObjectId;

  @Expose()
  referrentNumber: string;

  @Expose()
  userId: Types.ObjectId;

  @Expose()
  promotionId?: Types.ObjectId;

  @Expose()
  paymentMethodId: Types.ObjectId;

  @Expose()
  paymentNumber: string;

  @Expose()
  referrentGroupNumber: string;

  @Expose()
  status: string;

  @Expose()
  paymentAmount: number; // Số tiền khách trả

  @Expose()
  chargedAmount: number;

  @Expose()
  transactionReferrentId: string;

  @Expose()
  @Type(() => SimplePaymentMethodDto)
  paymentMethod: SimplePaymentMethodDto;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class RequestPaymentDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  transactionId: string;

  @IsNotEmpty()
  @Type(() => String)
  referrentGroupNumber: string;

  @IsNotEmpty()
  @Type(() => Number)
  totalPrice: number;
}

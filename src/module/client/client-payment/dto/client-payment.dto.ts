import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class ClientPaymentDto {
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
  status: string;

  @Expose()
  paymentAmount: number; // S? ti?n kh�ch tr?

  @Expose()
  chargedAmount: number;

  @Exclude()
  transactionReferrentId: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

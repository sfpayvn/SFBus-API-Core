import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentMethodDocument } from '../../payment-method/schema/payment-method.schema';

@Schema({ collection: 'payments', timestamps: true })
export class PaymentDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  referrentId: Types.ObjectId;

  @Prop({ required: true })
  referrentNumber: string;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop()
  promotionId?: Types.ObjectId;

  @Prop()
  paymentMethodId: Types.ObjectId;

  @Prop()
  paymentNumber: string;

  @Prop()
  referrentGroupNumber: string;

  @Prop({ required: true, default: 'Success' })
  status: string;

  @Prop({ default: 0 })
  paymentAmount: number; // Số tiền khách trả

  @Prop({ default: 0 })
  chargedAmount: number;

  @Prop()
  transactionReferrentId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentDocument);

// Virtual populate for booking
PaymentSchema.virtual('booking', {
  ref: 'bookings',
  localField: 'referrentId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for goods
PaymentSchema.virtual('goods', {
  ref: 'goods',
  localField: 'referrentId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for paymentMethod
PaymentSchema.virtual('paymentMethod', {
  ref: PaymentMethodDocument.name,
  localField: 'paymentMethodId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for user
PaymentSchema.virtual('user', {
  ref: 'users',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

PaymentSchema.set('toJSON', { virtuals: true });
PaymentSchema.set('toObject', { virtuals: true });

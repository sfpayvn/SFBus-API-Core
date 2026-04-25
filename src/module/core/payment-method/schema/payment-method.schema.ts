import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class PaymentBankingDocument extends Document {
  @Prop({ required: true })
  providerId: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  accountName: string;
}

@Schema({ collection: 'payment_methods', timestamps: true })
export class PaymentMethodDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  imageId: Types.ObjectId;

  @Prop()
  note?: string;

  @Prop()
  banking?: PaymentBankingDocument;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: false })
  isPaymentMethodDefault: boolean;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethodDocument);

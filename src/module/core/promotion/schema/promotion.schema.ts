import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'promotions', timestamps: true })
export class PromotionDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  imageId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  expireDate: Date;

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  discountType: 'percentage' | 'fixed';

  @Prop({ required: true })
  discountValue: number;

  @Prop({ required: true })
  status: string; // 'active', 'inactive', 'expired' (tuỳ bạn quy ước)
}

export const PromotionSchema = SchemaFactory.createForClass(PromotionDocument);

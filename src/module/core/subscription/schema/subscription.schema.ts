import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubscriptionLimitationSchema, SubscriptionLimitationSubDocument } from '../../tenant-subscription/schema/subscription-limitation.schema';
import { DURATION_STATUS } from '@/common/constants/status.constants';

@Schema({ collection: 'subscriptions', timestamps: true })
export class SubscriptionDocument extends Document {
  // _id có sẵn từ Document

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop()
  description: string;

  // Ví dụ: duration = số tháng/ngày tuỳ bạn quy ước
  @Prop({ required: true, min: 0 })
  duration: number;

  @Prop({ enum: Object.values(DURATION_STATUS), required: true })
  durationUnit: string; // 'month' | 'day'

  @Prop({ type: SubscriptionLimitationSchema, required: true })
  limitation: SubscriptionLimitationSubDocument;
  // createdAt/updatedAt tự động do timestamps: true

  @Prop({ type: String, required: true, default: 'active' })
  status: string; // 'active', 'inactive', 'archived' (tuỳ bạn quy ước)

  @Prop({ required: true, default: false })
  popular: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionDocument);

// Add unique sparse index for popular field (only one subscription can have popular=true)
SubscriptionSchema.index({ popular: 1 }, { unique: true, sparse: true });

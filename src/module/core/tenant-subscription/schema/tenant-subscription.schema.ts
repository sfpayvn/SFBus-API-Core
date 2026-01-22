import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SubscriptionLimitationSubDocument } from './subscription-limitation.schema';
import { DURATION_STATUS } from '@/common/constants/status.constants';

@Schema({ collection: 'tenant_subscriptions', timestamps: true })
export class TenantSubscriptionDocument extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  subscriptionId: Types.ObjectId;

  // Snapshot để không bị thay đổi khi plan gốc đổi
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  duration: number; // cùng đơn vị với durationUnit

  @Prop({ enum: Object.values(DURATION_STATUS), default: DURATION_STATUS.MONTH })
  durationUnit: string;

  @Prop({ type: Object, required: true })
  limitationSnapshot: SubscriptionLimitationSubDocument;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ enum: ['active', 'canceled', 'expired'], default: 'active', index: true })
  status: 'active' | 'canceled' | 'expired';
}

export const TenantSubscriptionSchema = SchemaFactory.createForClass(TenantSubscriptionDocument);

// Query phổ biến
TenantSubscriptionSchema.index({ tenantId: 1, status: 1, startAt: 1, endAt: 1 });

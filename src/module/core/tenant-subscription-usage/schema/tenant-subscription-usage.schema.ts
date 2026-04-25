// src/schemas/subscription-usage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'tenant-subscription_usages', timestamps: true })
export class TenantSubscriptionUsageDocument extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Subscription', index: true, required: true })
  subscriptionId: Types.ObjectId;

  // scope đếm (tenantId hoặc userId tuỳ hệ)
  @Prop({ type: Types.ObjectId, index: true, required: true })
  subjectId: Types.ObjectId;

  @Prop({ required: true, trim: true, lowercase: true, index: true })
  moduleKey: string;

  // null = module-level
  @Prop({ trim: true, lowercase: true, default: null, index: true })
  functionKey: string;

  @Prop({ required: true, enum: ['calendar', 'rolling'], default: 'calendar' })
  windowType: 'calendar' | 'rolling';

  @Prop({ required: true, enum: ['minute', 'hour', 'day', 'week', 'month', 'lifetime'], default: 'month' })
  windowUnit: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';

  @Prop({ required: true, min: 1, default: 1 })
  windowSize: number;

  @Prop({ required: true, type: Date, index: true })
  windowStart: Date;

  @Prop({ required: true, type: Date, index: true })
  windowEnd: Date;

  @Prop({ required: true, min: 0, default: 0 })
  used: number;

  @Prop({ required: true, min: 0 })
  quota: number;
}
export const TenantSubscriptionUsageSchema = SchemaFactory.createForClass(TenantSubscriptionUsageDocument);

TenantSubscriptionUsageSchema.index(
  { subscriptionId: 1, subjectId: 1, moduleKey: 1, functionKey: 1, windowStart: 1, windowEnd: 1 },
  { unique: true, partialFilterExpression: { functionKey: { $type: 'string' } } },
);

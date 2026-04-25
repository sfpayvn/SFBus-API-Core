import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AutoJobTrackingDocument = AutoJobTracking & Document;

@Schema({ collection: 'auto_job_tracking', timestamps: true })
export class AutoJobTracking {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ type: String, required: true })
  jobName: string;

  @Prop({ type: String, required: true })
  runDate: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const AutoJobTrackingSchema = SchemaFactory.createForClass(AutoJobTracking);

// Create compound unique index to prevent duplicate job runs per day
AutoJobTrackingSchema.index({ tenantId: 1, jobName: 1, runDate: 1 }, { unique: true });

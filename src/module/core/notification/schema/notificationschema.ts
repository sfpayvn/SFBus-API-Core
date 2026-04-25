import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'notifications', timestamps: true })
export class NotificationDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  isReaded: boolean;

  @Prop({ required: true })
  userId: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationDocument);

NotificationSchema.index({ tenantId: 1 });
NotificationSchema.index({ userId: 1 });
NotificationSchema.index({ createdAt: -1 });

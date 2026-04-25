import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Setting extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  groupName?: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'TenantDocument' })
  tenantId: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

// Create compound unique index for name, tenantId, and groupName
SettingSchema.index({ name: 1, tenantId: 1, groupName: 1 }, { unique: true });

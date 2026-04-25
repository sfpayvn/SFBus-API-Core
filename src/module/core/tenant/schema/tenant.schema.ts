import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class TenantSettingSubDocument {
  @Prop()
  appearance: string;

  @Prop()
  timezone: string;
}
export const TenantSettingSchema = SchemaFactory.createForClass(TenantSettingSubDocument);

@Schema({ collection: 'tenants', timestamps: true })
export class TenantDocument extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  logoId?: Types.ObjectId;

  @Prop({ type: TenantSettingSchema })
  setting: TenantSettingSubDocument;

  // Ngày hết hạn subscription
  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const TenantSchema = SchemaFactory.createForClass(TenantDocument);

// Unique indexes
TenantSchema.index({ code: 1 }, { unique: true });
TenantSchema.index({ phoneNumber: 1 }, { unique: true });

TenantSchema.set('toJSON', { virtuals: true });
TenantSchema.set('toObject', { virtuals: true });

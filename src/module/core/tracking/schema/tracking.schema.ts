import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'trackings', timestamps: true })
export class TrackingDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({
    required: true,
    enum: [
      ROLE_CONSTANTS.CLIENT,
      ROLE_CONSTANTS.DRIVER,
      ROLE_CONSTANTS.TENANT_OPERATOR,
      ROLE_CONSTANTS.TENANT,
      ROLE_CONSTANTS.ADMIN,
      ROLE_CONSTANTS.POS,
    ],
  })
  platform: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedBy: Types.ObjectId;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingDocument);

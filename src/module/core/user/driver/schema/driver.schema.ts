// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'drivers', timestamps: true })
export class DriverDocument extends Document {
  @Prop()
  userId: Types.ObjectId;

  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop()
  licenseNumber: string;

  @Prop()
  licenseExpirationDate: Date;

  @Prop()
  licenseType: string;

  @Prop()
  licenseImage: string;
}

export const DriverSchema = SchemaFactory.createForClass(DriverDocument);

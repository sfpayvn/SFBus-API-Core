import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'bus_types', timestamps: true })
export class BusTypeDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const BusTypeSchema = SchemaFactory.createForClass(BusTypeDocument);

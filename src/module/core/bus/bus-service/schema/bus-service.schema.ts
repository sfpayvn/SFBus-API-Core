import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'bus_services', timestamps: true })
export class BusServiceDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  iconId: Types.ObjectId;
}

export const BusServiceSchema = SchemaFactory.createForClass(BusServiceDocument);

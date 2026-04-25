import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'buses', timestamps: true })
export class BusDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  licensePlate: string;

  description?: string;

  @Prop({ required: true, ref: 'bus_templates' })
  busTemplateId: Types.ObjectId;
}
export const BusSchema = SchemaFactory.createForClass(BusDocument);

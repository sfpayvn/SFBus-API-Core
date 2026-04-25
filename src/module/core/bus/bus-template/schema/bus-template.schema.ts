import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'bus_templates', timestamps: true })
export class BusTemplateDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: 'bus_services' })
  busServiceIds: Types.ObjectId[];

  @Prop({ required: true, ref: 'seat_types' })
  busTypeId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_layout_templates' })
  busLayoutTemplateId: Types.ObjectId;
}
export const BusTemplateSchema = SchemaFactory.createForClass(BusTemplateDocument);

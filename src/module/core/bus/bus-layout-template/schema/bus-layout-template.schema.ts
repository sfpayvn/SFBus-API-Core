// bus-template.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class SeatDocument extends Document {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  typeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'available' })
  status: string;
}

export class BusSeatLayoutTemplateDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: [] })
  seats: SeatDocument[];
}

@Schema({ collection: 'bus_layout_templates', timestamps: true })
export class BusLayoutTemplateDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: [] })
  seatLayouts: BusSeatLayoutTemplateDocument[];
}

export const BusLayoutTemplateSchema = SchemaFactory.createForClass(BusLayoutTemplateDocument);

// bus-template.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BusLayoutTemplateDocument } from '../../bus-layout-template/schema/bus-layout-template.schema';
import { OmitType } from '@nestjs/mapped-types';

export class BusScheduleLayoutSeatDocument {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  index: number;

  @Prop()
  typeId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  bookingId: Types.ObjectId;

  @Prop()
  bookingStatus: string;

  @Prop()
  bookingNumber: string;
}

export class BusScheduleSeatLayoutTemplateDocument {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  seats: BusScheduleLayoutSeatDocument[];
}

@Schema({ collection: 'bus_schedule_layouts', timestamps: true })
export class BusScheduleLayoutDocument extends OmitType(BusLayoutTemplateDocument, ['_id', 'seatLayouts'] as const) {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_layout_templates' })
  busLayoutTemplateId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_schedules' })
  busScheduleId: Types.ObjectId;

  @Prop({ required: true, default: [] })
  seatLayouts: BusScheduleSeatLayoutTemplateDocument[];
}

export const BusScheduleLayoutSchema = SchemaFactory.createForClass(BusScheduleLayoutDocument);

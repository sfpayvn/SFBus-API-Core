import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export class SpecificTimeSlotDocument extends Document {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  timeSlot: Date;
}

@Schema({ collection: 'bus_schedules_autogenerators', timestamps: true })
export class BusScheduleAutogeneratorDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_schedule_templates' })
  busScheduleTemplateId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  repeatType: string;

  @Prop()
  repeatInterval: number;

  @Prop({ required: true })
  specificTimeSlots: SpecificTimeSlotDocument[];

  @Prop()
  repeatDaysPerWeek: string[];

  @Prop()
  preGenerateDays: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true, default: 'un_published' })
  status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export const BusScheduleAutogeneratorSchema = SchemaFactory.createForClass(BusScheduleAutogeneratorDocument);

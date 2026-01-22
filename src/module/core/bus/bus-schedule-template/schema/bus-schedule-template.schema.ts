import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BusRouteBreakPointsDocument, BusRouteDocument } from '../../bus-route/schema/bus-route.schema';
import { BusProvinceDocument } from '../../bus-province/schema/bus-schema.schema';
import { BusLayoutTemplateDocument } from '../../bus-layout-template/schema/bus-layout-template.schema';
import { BusSeatPricesDocument } from '../../bus-schedule/schema/bus-schedule.schema';
import { OmitType } from '@nestjs/mapped-types';

export class BusScheduleTemplateRouteDocument extends OmitType(BusRouteDocument, ['tenantId'] as const) {
  @Prop({ required: true })
  breakPoints: [BusRouteScheduleTemplateBreakPointsDocument];
}

export class BusRouteScheduleTemplateBreakPointsDocument extends BusRouteBreakPointsDocument {
  @Prop({ required: true })
  timeOffset: string;
}

export class BusSeatPricesScheduleTemplateBreakPointsDocument extends BusSeatPricesDocument {}

@Schema({ collection: 'bus_schedule_templates', timestamps: true })
export class BusScheduleTemplateDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ ref: 'buses' })
  busId: Types.ObjectId;

  @Prop({ ref: 'driver' })
  busDriverIds: Types.ObjectId[];

  @Prop({ required: true, ref: 'bus_template' })
  busTemplateId: Types.ObjectId;

  @Prop()
  busSeatLayoutBlockIds: Types.ObjectId[] = [];

  @Prop({ required: true, ref: 'bus_routes' })
  busRouteId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_routes' })
  busRoute: BusScheduleTemplateRouteDocument;

  @Prop({ required: true, ref: 'bus_routes' })
  busSeatPrices: BusSeatPricesScheduleTemplateBreakPointsDocument;
}

export const BusScheduleTemplateSchema = SchemaFactory.createForClass(BusScheduleTemplateDocument);

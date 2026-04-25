import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BusRouteBreakPointsDocument, BusRouteDocument } from '../../bus-route/schema/bus-route.schema';
import { BusProvinceDocument } from '../../bus-province/schema/bus-schema.schema';
import { BusDocument } from '../../bus/schema/bus.schema';
import { BusTemplateDocument } from '../../bus-template/schema/bus-template.schema';
import { BusServiceDocument } from '../../bus-service/schema/bus-service.schema';
import { BusTypeDocument } from '../../bus-type/schema/bus-type.schema';
import { OmitType } from '@nestjs/mapped-types';

export class BusScheduleBusDocument extends OmitType(BusRouteDocument, ['tenantId'] as const) {}

export class BusTemplateOfScheduleDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: 'bus_services' })
  busServiceIds: Types.ObjectId[];

  @Prop({ required: true, ref: 'seat_types' })
  busTypeId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_layout_templates' })
  busLayoutTemplateId: Types.ObjectId;

  @Prop({ required: true })
  busServices: BusServiceDocument[];

  @Prop({ required: true })
  busType: BusTypeDocument;
}

export class BusScheduleRouteDocument extends OmitType(BusRouteDocument, ['tenantId'] as const) {
  @Prop({ required: true })
  breakPoints: [BusRouteScheduleBreakPointsDocument];
}

export class BusRouteScheduleBreakPointsDocument extends BusRouteBreakPointsDocument {
  @Prop({ required: true })
  timeSchedule: string;

  @Prop({ required: true })
  provinceId: Types.ObjectId;

  @Prop({ required: true })
  province: BusProvinceDocument;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  detailAddress: string;

  @Prop({ required: true })
  location: string;
}

export class BusSeatPricesDocument {
  @Prop({ required: true })
  seatTypeId: Types.ObjectId;

  @Prop({ required: true })
  seatTypeName: string;

  @Prop({ required: true })
  price: number;
}

@Schema({ collection: 'bus_schedules', timestamps: true })
export class BusScheduleDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  busScheduleNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    ref: 'buses',
    get: (v: any) => (v === '' || v === null || v === undefined ? null : v),
    set: (v: any) => (v === '' || v === null || v === undefined ? null : v),
  })
  busId: Types.ObjectId;

  @Prop({ ref: 'driver' })
  busDriverIds: Types.ObjectId[];

  @Prop({ required: false, ref: 'buses' })
  bus: BusScheduleBusDocument;

  @Prop({ required: true, ref: 'bus_templates' })
  busTemplateId: Types.ObjectId;

  @Prop({ required: true })
  busTemplate: BusTemplateOfScheduleDocument;

  @Prop({ required: true, ref: 'bus_routes' })
  busRouteId: Types.ObjectId;

  @Prop({ required: true, ref: 'bus_routes' })
  busRoute: BusScheduleRouteDocument;

  @Prop({ required: true })
  busLayoutTemplateId: Types.ObjectId;

  @Prop()
  busScheduleTemplateId: Types.ObjectId;

  @Prop()
  busSeatLayoutBlockIds: Types.ObjectId[];

  @Prop()
  busSeatPrices: BusSeatPricesDocument[];

  @Prop({
    required: true,
    enum: ['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled',
  })
  status: string;

  @Prop()
  note: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ ref: 'bus_stations' })
  currentStationId: Types.ObjectId;
}

export const BusScheduleSchema = SchemaFactory.createForClass(BusScheduleDocument);

// Virtual populate for driver
BusScheduleSchema.virtual('driver', {
  ref: 'users',
  localField: 'busDriverIds',
  foreignField: '_id',
  justOne: false,
});

BusScheduleSchema.set('toJSON', { virtuals: true });
BusScheduleSchema.set('toObject', { virtuals: true });

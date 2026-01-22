import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ _id: false })
export class BusRouteBreakPointsDocument {
  @Prop({ type: Types.ObjectId, required: true })
  busStationId: Types.ObjectId;

  @Prop()
  detailAddress: string;

  @Prop({ required: true })
  location: string;
}

export const BusRouteBreakPointsSchema = SchemaFactory.createForClass(BusRouteBreakPointsDocument);

// Virtual to populate busStation from BusStationModule
BusRouteBreakPointsSchema.virtual('busStation', {
  ref: 'BusStationDocument',
  localField: 'busStationId',
  foreignField: '_id',
  justOne: true,
});

@Schema({ collection: 'bus_routes', timestamps: true })
export class BusRouteDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [BusRouteBreakPointsSchema], default: [] })
  breakPoints: BusRouteBreakPointsDocument[];

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  distanceTime: string;

  notes: string;
}

export const BusRouteSchema = SchemaFactory.createForClass(BusRouteDocument);
BusRouteSchema.set('toObject', { virtuals: true });
BusRouteSchema.set('toJSON', { virtuals: true });

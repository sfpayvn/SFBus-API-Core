import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'bus_provinces', timestamps: true })
export class BusProvinceDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const BusProvinceSchema = SchemaFactory.createForClass(BusProvinceDocument);

// Virtual populate for bus stations
BusProvinceSchema.virtual('busStations', {
  ref: 'bus_stations',
  localField: '_id',
  foreignField: 'provinceId',
  justOne: false,
});

BusProvinceSchema.set('toJSON', { virtuals: true });
BusProvinceSchema.set('toObject', { virtuals: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ collection: 'bus_stations', timestamps: true })
export class BusStationDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  detailAddress: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  provinceId: Types.ObjectId;

  @Prop()
  imageId?: Types.ObjectId;

  @Prop({ default: false })
  isOffice?: boolean;
}

export const BusStationSchema = SchemaFactory.createForClass(BusStationDocument);

// Virtual populate for province
BusStationSchema.virtual('province', {
  ref: 'bus_provinces',
  localField: 'provinceId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for image file
BusStationSchema.virtual('image', {
  ref: 'fs.files',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true,
});

BusStationSchema.set('toJSON', { virtuals: true });
BusStationSchema.set('toObject', { virtuals: true });

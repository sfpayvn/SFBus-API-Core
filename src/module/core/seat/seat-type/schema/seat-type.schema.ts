import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'seat_types', timestamps: true })
export class SeatTypeDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  iconId: Types.ObjectId;

  @Prop()
  isEnv: boolean;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatTypeDocument);

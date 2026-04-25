import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'goods-category', timestamps: true })
export class GoodsCategoryDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  iconId: Types.ObjectId;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const GoodsCategorySchema = SchemaFactory.createForClass(GoodsCategoryDocument);

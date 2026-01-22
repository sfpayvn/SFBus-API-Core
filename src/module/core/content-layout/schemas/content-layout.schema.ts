import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({
  timestamps: true,
  collection: 'content_layouts',
})
export class ContentLayoutDocument extends Document {
  @Prop({ required: true})
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ type: Types.ObjectId })
  imageId: Types.ObjectId;

  @Prop()
  imageUrl: string;

  @Prop({ type: String, default: '' })
  zones: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  projectData: string;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  appSource: string;

  @Prop({ default: true })
  isPublish: boolean;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;
}

export const ContentLayoutSchema = SchemaFactory.createForClass(ContentLayoutDocument);

ContentLayoutSchema.index({ appSource: 1, platform: 1, tenantId: 1, slug: 1 }, { unique: true });

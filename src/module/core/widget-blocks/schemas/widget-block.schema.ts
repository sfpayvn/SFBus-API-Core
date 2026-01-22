import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'widget_blocks' })
export class WidgetBlockDocument extends Document {
  @Prop({ required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  // Thumbnail hiển thị trong block list (GrapesJS)
  @Prop({ required: true })
  imageId: Types.ObjectId;

  // Nội dung block (để render hoặc add vào BlockManager)
  @Prop({ required: true })
  html: string;

  @Prop()
  css?: string;

  // Optional: lưu project data của GrapesJS để edit lại block sau này
  @Prop({ required: true })
  projectData: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const WidgetBlockSchema = SchemaFactory.createForClass(WidgetBlockDocument);

// Unique name theo tenant để tránh trùng
WidgetBlockSchema.index({ tenantId: 1, name: 1 }, { unique: true });

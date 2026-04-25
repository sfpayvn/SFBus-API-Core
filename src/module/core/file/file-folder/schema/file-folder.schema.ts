import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'file-folder', timestamps: true })
export class FileFolderDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const FileFolderSchema = SchemaFactory.createForClass(FileFolderDocument);

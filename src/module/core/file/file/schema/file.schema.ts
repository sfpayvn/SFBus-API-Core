import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class FileMetadata {
  has: string;
  folderId: string = '';
  isFavorite: boolean = false;
  @Prop({ required: true })
  tenantId: Types.ObjectId;
}

@Schema({ collection: 'fs.files', timestamps: true })
export class FileDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  chunkSize: number;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  metadata: FileMetadata;

  @Prop({ required: true })
  md5: string;

  @Prop({ required: true })
  contentType: string;
}

export const FileSchema = SchemaFactory.createForClass(FileDocument);

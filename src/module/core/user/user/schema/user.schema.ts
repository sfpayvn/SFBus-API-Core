// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class UserAddressDocument extends Document {
  _id: Types.ObjectId;
  type: string;
  addressType: string;
  isDefault: boolean;
}

@Schema({ collection: 'users', timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  avatarId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  addresses?: UserAddressDocument[];

  @Prop({ enum: ['male', 'female', 'other'], default: 'other' })
  gender: string;

  @Prop()
  email: string;

  @Prop()
  birthdate?: Date;

  @Prop({ default: ['user'] })
  roles: string[];

  @Prop({ required: true, default: true })
  isTempPassWord: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isPhoneNumberVerified: boolean;

  @Prop({ default: false })
  isLocked: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: 0 })
  resetTokenVersion: number;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

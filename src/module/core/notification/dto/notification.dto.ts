import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class NotificationDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  desc: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

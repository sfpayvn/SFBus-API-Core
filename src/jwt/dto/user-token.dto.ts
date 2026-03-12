import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class UserTokenDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  @IsOptional()
  roles?: string[];

  @Expose()
  @IsOptional()
  subscriptionId?: string;

  @Expose()
  @IsOptional()
  tokenVersion?: number;

  @Expose()
  @IsOptional()
  appVersion?: string;
}

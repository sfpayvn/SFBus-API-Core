import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { ClientCreateUserAddressDto, ClientCreateUserDto } from './client-create-user.dto';
import { IsOptional, IsString, IsEmail, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export class ClientUpdateUserDto extends OmitType(ClientCreateUserDto, ['password'] as const) {
  _id: Types.ObjectId;
  isEmailVerified: boolean = false;
  isLocked: boolean = false;
  isDeleted: boolean = false;
}

export class ClientUpdateUserProfileDto {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  avatarId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  addresses?: ClientCreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Giới tính không đúng',
  })
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // Sử dụng ISO String cho ngày tháng
}

export class ClientUpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { AdminCreateUserAddressDto, AdminCreateUserDto } from './admin-create-user.dto';

export class AdminUpdateUserDto extends PartialType(AdminCreateUserDto) {
  _id: Types.ObjectId;
  isEmailVerified: boolean = false;
  isLocked: boolean = false;
  isDeleted: boolean = false;
}

export class AdminUpdateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  avatarId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  addresses?: AdminCreateUserAddressDto[];

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

export class AdminUpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

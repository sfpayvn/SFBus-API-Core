import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto, CreateUserDto } from './create-user.dto';
import { Types } from 'mongoose';
import { IsOptional, IsString, IsEmail, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsOptional()
  avatarId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  addresses?: CreateUserAddressDto[];

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

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

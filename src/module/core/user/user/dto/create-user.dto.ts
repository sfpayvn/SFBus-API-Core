import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsBoolean, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserAddressDto {
  @IsNotEmpty()
  @Type(() => String)
  addressType: string;

  @IsNotEmpty()
  @Type(() => String)
  address: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  isDefault: boolean;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  avatarId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  roles: string[];

  @IsOptional()
  addresses?: CreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Giới tính phải là male, female hoặc other.',
  })
  gender: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // Sử dụng ISO String cho ngày tháng

  @IsNotEmpty()
  @IsBoolean()
  isTempPassWord: boolean; // Sử dụng ISO String cho ngày tháng

  @IsOptional()
  @IsNumber()
  resetTokenVersion: number;
}

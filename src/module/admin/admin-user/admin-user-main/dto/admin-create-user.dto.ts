import { IsNotEmpty, IsString, IsOptional, IsEmail, IsEnum, IsDateString, IsBoolean, isBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateUserAddressDto {
  addressType: string;
  address: string;
  isDefault: boolean;
}

export class AdminCreateUserDto {
  @IsOptional()
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

  @IsOptional()
  roles: string[];

  @IsOptional()
  addresses?: AdminCreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Giới tính phải là male, female hoặc other.',
  })
  gender: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified: boolean;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // Sử dụng ISO String cho ngày tháng

  @IsNotEmpty()
  @IsBoolean()
  isTempPassWord: boolean; // Sử dụng ISO String cho ngày tháng

  resetTokenVersion: number;
}

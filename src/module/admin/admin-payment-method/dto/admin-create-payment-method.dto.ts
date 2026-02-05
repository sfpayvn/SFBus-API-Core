import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class AdminCreatePaymentBankingDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  providerId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  token: string;

  @IsNotEmpty()
  @Type(() => String)
  bankName: string;

  @IsNotEmpty()
  @Type(() => String)
  accountNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  accountName: string;
}

export class AdminCreatePaymentMethodDto {
  tenantId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  providerId: Types.ObjectId;

  @IsOptional()
  @Type(() => String)
  token: string;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminCreatePaymentBankingDto)
  banking?: AdminCreatePaymentBankingDto;

  @IsNotEmpty()
  @Type(() => String)
  type: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  imageId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  @Type(() => String)
  note?: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsOptional()
  @Type(() => Boolean)
  isDefault?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  isPaymentMethodDefault?: boolean;
}

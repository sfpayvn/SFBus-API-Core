import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PaymentBankingDto {
  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  bankName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  accountName: string;
}

export class PaymentMethodDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  name: string;

  @Expose()
  banking?: PaymentBankingDto;

  @Expose()
  type: string;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  image: string;

  @Expose()
  note?: string;

  @Expose()
  status: string;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isPaymentMethodDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PaymentMethodSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class SearchPaymentMethodPagingQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: PaymentMethodSortFilter;

  @IsOptional()
  filters: PaymentMethodSortFilter[];
}

export class SearchPaymentMethodPagingRes {
  pageIdx: number = 0;
  paymentMethods: PaymentMethodDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

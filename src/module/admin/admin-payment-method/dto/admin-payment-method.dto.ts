import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';
import { AdminBookingDto } from '../../admin-booking/dto/admin-booking.dto';

export class AdminPaymentBankingDto {
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

export class AdminPaymentMethodDto {
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
  banking?: AdminPaymentBankingDto;

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

export class AdminSearchPaymentMethodPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchPaymentMethodPagingQuery {
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
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  sortBy: AdminSearchPaymentMethodPagingQuerySortFilter;

  @IsOptional()
  filters: AdminSearchPaymentMethodPagingQuerySortFilter[];
}

export class AdminSearchPaymentMethodPagingRes {
  pageIdx: number = 0;
  paymentMethods: AdminPaymentMethodDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
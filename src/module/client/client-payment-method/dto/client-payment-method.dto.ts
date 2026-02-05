import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ClientBookingDto } from '../../client-booking/dto/client-booking.dto';

export class ClientPaymentBankingDto {
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

export class ClientPaymentMethodDto {
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
  banking?: ClientPaymentBankingDto;

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

export class ClientBookingSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class ClientSearchPaymentMethodPagingQuery {
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
  sortBy: ClientBookingSortFilter;

  @IsOptional()
  filters: ClientBookingSortFilter[];
}

export class ClientSearchPaymentMethodPagingRes {
  pageIdx: number = 0;
  paymentMethods: ClientPaymentMethodDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

import { Types } from 'mongoose';
export declare class DriverPaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class DriverPaymentMethodDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: DriverPaymentBankingDto;
    type: string;
    imageId: Types.ObjectId;
    image: string;
    note?: string;
    status: string;
    isDefault?: boolean;
    isPaymentMethodDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverPaymentMethodSortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchPaymentMethodPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverPaymentMethodSortFilter;
    filters: DriverPaymentMethodSortFilter[];
}
export declare class DriverSearchPaymentMethodPagingRes {
    pageIdx: number;
    paymentMethods: DriverPaymentMethodDto[];
    totalPage: number;
    totalItem: number;
}

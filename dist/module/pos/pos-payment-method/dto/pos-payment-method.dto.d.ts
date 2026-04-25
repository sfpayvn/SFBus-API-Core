import { Types } from 'mongoose';
export declare class PosPaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class PosPaymentMethodDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: PosPaymentBankingDto;
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
export declare class PosPaymentMethodSortFilter {
    key: string;
    value: string;
}
export declare class PosSearchPaymentMethodPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosPaymentMethodSortFilter;
    filters: PosPaymentMethodSortFilter[];
}
export declare class PosSearchPaymentMethodPagingRes {
    pageIdx: number;
    paymentMethods: PosPaymentMethodDto[];
    totalPage: number;
    totalItem: number;
}

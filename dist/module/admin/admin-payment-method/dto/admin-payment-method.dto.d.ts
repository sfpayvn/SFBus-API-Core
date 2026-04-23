import { Types } from 'mongoose';
export declare class AdminPaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class AdminPaymentMethodDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: AdminPaymentBankingDto;
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
export declare class AdminSearchPaymentMethodPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchPaymentMethodPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchPaymentMethodPagingQuerySortFilter;
    filters: AdminSearchPaymentMethodPagingQuerySortFilter[];
}
export declare class AdminSearchPaymentMethodPagingRes {
    pageIdx: number;
    paymentMethods: AdminPaymentMethodDto[];
    totalPage: number;
    totalItem: number;
}

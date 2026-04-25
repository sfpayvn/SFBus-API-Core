import { Types } from 'mongoose';
export declare class PaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class PaymentMethodDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: PaymentBankingDto;
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
export declare class PaymentMethodSortFilter {
    key: string;
    value: string | string[];
}
export declare class SearchPaymentMethodPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PaymentMethodSortFilter;
    filters: PaymentMethodSortFilter[];
}
export declare class SearchPaymentMethodPagingRes {
    pageIdx: number;
    paymentMethods: PaymentMethodDto[];
    totalPage: number;
    totalItem: number;
}

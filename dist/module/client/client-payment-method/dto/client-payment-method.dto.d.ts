import { Types } from 'mongoose';
export declare class ClientPaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class ClientPaymentMethodDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: ClientPaymentBankingDto;
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
export declare class ClientBookingSortFilter {
    key: string;
    value: string | string[];
}
export declare class ClientSearchPaymentMethodPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientBookingSortFilter;
    filters: ClientBookingSortFilter[];
}
export declare class ClientSearchPaymentMethodPagingRes {
    pageIdx: number;
    paymentMethods: ClientPaymentMethodDto[];
    totalPage: number;
    totalItem: number;
}

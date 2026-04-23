import { Types } from 'mongoose';
export declare class TenantSubscriptionDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    subscriptionId: Types.ObjectId;
    name: string;
    price: number;
    duration: number;
    durationUnit: string;
    startAt: Date;
    endAt: Date;
    status: 'active' | 'canceled' | 'expired';
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class RegisterSubscriptionDto {
    subscriptionId: string;
    startAt?: string;
    durationUnit?: string;
    durationOverride?: number;
    replaceCurrent?: boolean;
}
export declare class SearchTenantSubscriptionQuerySortFilter {
    key: string;
    value: string | string[] | Types.ObjectId | Types.ObjectId[];
}
export declare class SearchTenantSubscriptionQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchTenantSubscriptionQuerySortFilter;
    filters: SearchTenantSubscriptionQuerySortFilter[];
}
export declare class SearchTenantSubscriptionRes {
    pageIdx: number;
    tenantSubscriptions: TenantSubscriptionDto[];
    totalPage: number;
    totalItem: number;
}

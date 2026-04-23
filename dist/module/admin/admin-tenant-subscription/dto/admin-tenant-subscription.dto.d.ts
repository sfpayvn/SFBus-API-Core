import { Types } from 'mongoose';
export declare class AdminTenantSubscriptionDto {
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
export declare class AdminRegisterSubscriptionDto {
    subscriptionId: string;
    startAt?: string;
    durationUnit?: 'month' | 'day';
    durationOverride?: number;
    replaceCurrent?: boolean;
}
export declare class AdminRegisterSubscriptionForTenantDto extends AdminRegisterSubscriptionDto {
    tenantId: Types.ObjectId;
}
export declare class AdminSearchTenantSubscriptionQuerySortFilter {
    key: string;
    value: string | string[] | Types.ObjectId | Types.ObjectId[];
}
export declare class AdminSearchTenantSubscriptionQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchTenantSubscriptionQuerySortFilter;
    filters: AdminSearchTenantSubscriptionQuerySortFilter[];
}
export declare class AdminSearchTenantSubscriptionRes {
    pageIdx: number;
    tenantSubscriptions: AdminTenantSubscriptionDto[];
    totalPage: number;
    totalItem: number;
}

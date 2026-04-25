import { Types } from 'mongoose';
export declare class DriverTenantSubscriptionDto {
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
export declare class DriverRegisterSubscriptionDto {
    subscriptionId: string;
    startAt?: string;
    durationUnit?: 'month' | 'day';
    durationOverride?: number;
    replaceCurrent?: boolean;
}
export declare class DriverRegisterSubscriptionForTenantDto extends DriverRegisterSubscriptionDto {
    tenantId: Types.ObjectId;
}
export declare class DriverSearchTenantSubscriptionQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchTenantSubscriptionQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchTenantSubscriptionQuerySortFilter;
    filters: DriverSearchTenantSubscriptionQuerySortFilter[];
}
export declare class DriverSearchTenantSubscriptionRes {
    pageIdx: number;
    tenantSubscriptions: DriverTenantSubscriptionDto[];
    totalPage: number;
    totalItem: number;
}

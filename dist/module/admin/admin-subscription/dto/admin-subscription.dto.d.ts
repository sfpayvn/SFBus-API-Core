import { Types } from 'mongoose';
export declare class AdminFunctionRuleDto {
    readonly key: string;
    readonly type: 'count' | 'unlimited';
    readonly quota?: number;
    readonly windowType?: 'calendar' | 'rolling';
    readonly windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    readonly windowSize?: number;
    readonly burst?: number;
    readonly concurrency?: number;
}
export declare class AdminModuleRuleDto {
    readonly key: string;
    readonly moduleRule?: AdminFunctionRuleDto;
    readonly functions: AdminFunctionRuleDto[];
}
export declare class AdminSubscriptionLimitationDto {
    readonly defaultAction: 'allow' | 'block';
    readonly modules: AdminModuleRuleDto[];
}
export declare class AdminSubscriptionDto {
    readonly _id: Types.ObjectId;
    readonly name: string;
    readonly price: number;
    readonly description: string;
    readonly duration: number;
    readonly durationUnit: 'month' | 'week' | 'day' | 'year';
    readonly limitation: AdminSubscriptionLimitationDto;
    readonly status: string;
    popular: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchSubscriptionQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchSubscriptionQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchSubscriptionQuerySortFilter;
    filters: AdminSearchSubscriptionQuerySortFilter[];
}
export declare class AdminSearchSubscriptionsRes {
    pageIdx: number;
    subscriptions: AdminSubscriptionDto[];
    totalPage: number;
    totalItem: number;
}

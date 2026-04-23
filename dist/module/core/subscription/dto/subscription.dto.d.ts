import { Types } from 'mongoose';
export declare class FunctionRuleDto {
    readonly key: string;
    readonly type: 'count' | 'unlimited';
    readonly quota?: number;
    readonly windowType?: 'calendar' | 'rolling';
    readonly windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    readonly windowSize?: number;
    readonly burst?: number;
    readonly concurrency?: number;
}
export declare class ModuleRuleDto {
    readonly key: string;
    readonly moduleRule?: FunctionRuleDto;
    readonly functions: FunctionRuleDto[];
}
export declare class SubscriptionLimitationDto {
    readonly defaultAction: 'allow' | 'block';
    readonly modules: ModuleRuleDto[];
}
export declare class SubscriptionDto {
    readonly _id: Types.ObjectId;
    readonly name: string;
    readonly price: number;
    readonly description: string;
    readonly duration: number;
    readonly durationUnit: 'month' | 'week' | 'day' | 'year';
    readonly limitation: SubscriptionLimitationDto;
    readonly status: string;
    popular: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchSubscriptionQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchSubscriptionQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchSubscriptionQuerySortFilter;
    filters: SearchSubscriptionQuerySortFilter[];
}
export declare class SearchSubscriptionsRes {
    pageIdx: number;
    subscriptions: SubscriptionDto[];
    totalPage: number;
    totalItem: number;
}

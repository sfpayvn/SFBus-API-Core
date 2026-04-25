export declare class AdminCreateFunctionRuleDto {
    key: string;
    type: 'count' | 'unlimited';
    quota?: number;
    windowType?: 'calendar' | 'rolling';
    windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    windowSize?: number;
    burst?: number;
    concurrency?: number;
}
export declare class AdminCreteModuleRuleDto {
    key: string;
    moduleRule?: AdminCreateFunctionRuleDto;
    functions: AdminCreateFunctionRuleDto[];
}
export declare class AdminCreateSubscriptionLimitationDto {
    defaultAction: 'allow' | 'block';
    modules: AdminCreteModuleRuleDto[];
}
export declare class AdminCreateSubscriptionDto {
    name: string;
    price: number;
    description: string;
    duration: number;
    durationUnit: 'month' | 'week' | 'day' | 'year';
    limitation: AdminCreateSubscriptionLimitationDto;
    status: string;
    popular: boolean;
}

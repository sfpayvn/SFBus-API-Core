export declare class CreateFunctionRuleDto {
    key: string;
    type: 'count' | 'unlimited';
    quota?: number;
    windowType?: 'calendar' | 'rolling';
    windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    windowSize?: number;
    burst?: number;
    concurrency?: number;
}
export declare class CreteModuleRuleDto {
    key: string;
    moduleRule?: CreateFunctionRuleDto;
    functions: CreateFunctionRuleDto[];
}
export declare class CreateSubscriptionLimitationDto {
    defaultAction: 'allow' | 'block';
    modules: CreteModuleRuleDto[];
}
export declare class CreateSubscriptionDto {
    name: string;
    price: number;
    description: string;
    duration: number;
    durationUnit: 'month' | 'week' | 'day' | 'year';
    limitation: CreateSubscriptionLimitationDto;
    status: string;
    popular: boolean;
}

export declare class FunctionRule {
    key: string;
    type: 'count' | 'unlimited';
    quota?: number;
    windowType?: 'calendar' | 'rolling';
    windowUnit?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    windowSize?: number;
    burst?: number;
    concurrency?: number;
}
export declare const FunctionRuleSchema: import("mongoose").Schema<FunctionRule, import("mongoose").Model<FunctionRule, any, any, any, import("mongoose").Document<unknown, any, FunctionRule> & FunctionRule & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FunctionRule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FunctionRule>> & import("mongoose").FlatRecord<FunctionRule> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ModuleRule {
    key: string;
    moduleRule?: FunctionRule;
    functions: FunctionRule[];
}
export declare const ModuleRuleSchema: import("mongoose").Schema<ModuleRule, import("mongoose").Model<ModuleRule, any, any, any, import("mongoose").Document<unknown, any, ModuleRule> & ModuleRule & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ModuleRule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ModuleRule>> & import("mongoose").FlatRecord<ModuleRule> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class SubscriptionLimitationSubDocument {
    defaultAction: 'allow' | 'block';
    modules: ModuleRule[];
}
export declare const SubscriptionLimitationSchema: import("mongoose").Schema<SubscriptionLimitationSubDocument, import("mongoose").Model<SubscriptionLimitationSubDocument, any, any, any, import("mongoose").Document<unknown, any, SubscriptionLimitationSubDocument> & SubscriptionLimitationSubDocument & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubscriptionLimitationSubDocument, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SubscriptionLimitationSubDocument>> & import("mongoose").FlatRecord<SubscriptionLimitationSubDocument> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

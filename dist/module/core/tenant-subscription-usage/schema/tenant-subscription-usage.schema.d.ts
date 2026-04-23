import { Document, Types } from 'mongoose';
export declare class TenantSubscriptionUsageDocument extends Document {
    subscriptionId: Types.ObjectId;
    subjectId: Types.ObjectId;
    moduleKey: string;
    functionKey: string;
    windowType: 'calendar' | 'rolling';
    windowUnit: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
    windowSize: number;
    windowStart: Date;
    windowEnd: Date;
    used: number;
    quota: number;
}
export declare const TenantSubscriptionUsageSchema: import("mongoose").Schema<TenantSubscriptionUsageDocument, import("mongoose").Model<TenantSubscriptionUsageDocument, any, any, any, Document<unknown, any, TenantSubscriptionUsageDocument> & TenantSubscriptionUsageDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TenantSubscriptionUsageDocument, Document<unknown, {}, import("mongoose").FlatRecord<TenantSubscriptionUsageDocument>> & import("mongoose").FlatRecord<TenantSubscriptionUsageDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
import { SubscriptionLimitationSubDocument } from './subscription-limitation.schema';
export declare class TenantSubscriptionDocument extends Document {
    tenantId: Types.ObjectId;
    subscriptionId: Types.ObjectId;
    name: string;
    price: number;
    duration: number;
    durationUnit: string;
    limitationSnapshot: SubscriptionLimitationSubDocument;
    startAt: Date;
    endAt: Date;
    status: 'active' | 'canceled' | 'expired';
}
export declare const TenantSubscriptionSchema: import("mongoose").Schema<TenantSubscriptionDocument, import("mongoose").Model<TenantSubscriptionDocument, any, any, any, Document<unknown, any, TenantSubscriptionDocument> & TenantSubscriptionDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TenantSubscriptionDocument, Document<unknown, {}, import("mongoose").FlatRecord<TenantSubscriptionDocument>> & import("mongoose").FlatRecord<TenantSubscriptionDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

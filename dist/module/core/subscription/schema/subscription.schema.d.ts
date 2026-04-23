import { Document } from 'mongoose';
import { SubscriptionLimitationSubDocument } from '../../tenant-subscription/schema/subscription-limitation.schema';
export declare class SubscriptionDocument extends Document {
    name: string;
    price: number;
    description: string;
    duration: number;
    durationUnit: string;
    limitation: SubscriptionLimitationSubDocument;
    status: string;
    popular: boolean;
}
export declare const SubscriptionSchema: import("mongoose").Schema<SubscriptionDocument, import("mongoose").Model<SubscriptionDocument, any, any, any, Document<unknown, any, SubscriptionDocument> & SubscriptionDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubscriptionDocument, Document<unknown, {}, import("mongoose").FlatRecord<SubscriptionDocument>> & import("mongoose").FlatRecord<SubscriptionDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

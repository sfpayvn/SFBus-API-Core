import { Document, Types } from 'mongoose';
export declare class PaymentDocument extends Document {
    tenantId: Types.ObjectId;
    referrentId: Types.ObjectId;
    referrentNumber: string;
    userId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    paymentMethodId: Types.ObjectId;
    paymentNumber: string;
    referrentGroupNumber: string;
    status: string;
    paymentAmount: number;
    chargedAmount: number;
    transactionReferrentId: string;
}
export declare const PaymentSchema: import("mongoose").Schema<PaymentDocument, import("mongoose").Model<PaymentDocument, any, any, any, Document<unknown, any, PaymentDocument> & PaymentDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentDocument, Document<unknown, {}, import("mongoose").FlatRecord<PaymentDocument>> & import("mongoose").FlatRecord<PaymentDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

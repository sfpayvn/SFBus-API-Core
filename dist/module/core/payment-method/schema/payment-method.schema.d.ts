import { Document, Types } from 'mongoose';
export declare class PaymentBankingDocument extends Document {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class PaymentMethodDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    type: string;
    imageId: Types.ObjectId;
    note?: string;
    banking?: PaymentBankingDocument;
    status: string;
    isPaymentMethodDefault: boolean;
}
export declare const PaymentMethodSchema: import("mongoose").Schema<PaymentMethodDocument, import("mongoose").Model<PaymentMethodDocument, any, any, any, Document<unknown, any, PaymentMethodDocument> & PaymentMethodDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentMethodDocument, Document<unknown, {}, import("mongoose").FlatRecord<PaymentMethodDocument>> & import("mongoose").FlatRecord<PaymentMethodDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

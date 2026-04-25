import { Document, Types } from 'mongoose';
export declare class PromotionDocument extends Document {
    tenantId: Types.ObjectId;
    imageId: Types.ObjectId;
    name: string;
    code: string;
    description: string;
    expireDate: Date;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    status: string;
}
export declare const PromotionSchema: import("mongoose").Schema<PromotionDocument, import("mongoose").Model<PromotionDocument, any, any, any, Document<unknown, any, PromotionDocument> & PromotionDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PromotionDocument, Document<unknown, {}, import("mongoose").FlatRecord<PromotionDocument>> & import("mongoose").FlatRecord<PromotionDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

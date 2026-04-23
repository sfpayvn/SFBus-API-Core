import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class GoodsCategoryDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
    status: string;
}
export declare const GoodsCategorySchema: import("mongoose").Schema<GoodsCategoryDocument, import("mongoose").Model<GoodsCategoryDocument, any, any, any, Document<unknown, any, GoodsCategoryDocument> & GoodsCategoryDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GoodsCategoryDocument, Document<unknown, {}, import("mongoose").FlatRecord<GoodsCategoryDocument>> & import("mongoose").FlatRecord<GoodsCategoryDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
export declare class WidgetBlockDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    imageId: Types.ObjectId;
    html: string;
    css?: string;
    projectData: string;
    isActive: boolean;
}
export declare const WidgetBlockSchema: import("mongoose").Schema<WidgetBlockDocument, import("mongoose").Model<WidgetBlockDocument, any, any, any, Document<unknown, any, WidgetBlockDocument> & WidgetBlockDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WidgetBlockDocument, Document<unknown, {}, import("mongoose").FlatRecord<WidgetBlockDocument>> & import("mongoose").FlatRecord<WidgetBlockDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

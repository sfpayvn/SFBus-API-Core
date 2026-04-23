import { Document, Types } from 'mongoose';
export declare class ContentLayoutDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    slug: string;
    imageId: Types.ObjectId;
    imageUrl: string;
    zones: string;
    description?: string;
    projectData: string;
    platform: string;
    appSource: string;
    isPublish: boolean;
    startDate: Date;
    endDate?: Date;
}
export declare const ContentLayoutSchema: import("mongoose").Schema<ContentLayoutDocument, import("mongoose").Model<ContentLayoutDocument, any, any, any, Document<unknown, any, ContentLayoutDocument> & ContentLayoutDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContentLayoutDocument, Document<unknown, {}, import("mongoose").FlatRecord<ContentLayoutDocument>> & import("mongoose").FlatRecord<ContentLayoutDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

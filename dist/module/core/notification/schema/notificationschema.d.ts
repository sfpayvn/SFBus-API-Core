import { Document, Types } from 'mongoose';
export declare class NotificationDocument extends Document {
    tenantId: Types.ObjectId;
    title: string;
    desc: string;
    isReaded: boolean;
    userId: Types.ObjectId;
}
export declare const NotificationSchema: import("mongoose").Schema<NotificationDocument, import("mongoose").Model<NotificationDocument, any, any, any, Document<unknown, any, NotificationDocument> & NotificationDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NotificationDocument, Document<unknown, {}, import("mongoose").FlatRecord<NotificationDocument>> & import("mongoose").FlatRecord<NotificationDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
export declare class FileFolderDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
}
export declare const FileFolderSchema: import("mongoose").Schema<FileFolderDocument, import("mongoose").Model<FileFolderDocument, any, any, any, Document<unknown, any, FileFolderDocument> & FileFolderDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FileFolderDocument, Document<unknown, {}, import("mongoose").FlatRecord<FileFolderDocument>> & import("mongoose").FlatRecord<FileFolderDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

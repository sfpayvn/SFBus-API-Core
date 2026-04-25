import { Document, Types } from 'mongoose';
export declare class FileMetadata {
    has: string;
    folderId: string;
    isFavorite: boolean;
    tenantId: Types.ObjectId;
}
export declare class FileDocument extends Document {
    name: string;
    length: number;
    chunkSize: number;
    filename: string;
    metadata: FileMetadata;
    md5: string;
    contentType: string;
}
export declare const FileSchema: import("mongoose").Schema<FileDocument, import("mongoose").Model<FileDocument, any, any, any, Document<unknown, any, FileDocument> & FileDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FileDocument, Document<unknown, {}, import("mongoose").FlatRecord<FileDocument>> & import("mongoose").FlatRecord<FileDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

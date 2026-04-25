import { Types } from 'mongoose';
export declare class FileFolderDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

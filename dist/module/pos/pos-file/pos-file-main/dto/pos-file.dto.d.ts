import { Types } from 'mongoose';
export declare class PosFileDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    link: string;
    filename: string;
    contentType: string;
    folderId: Types.ObjectId;
    isFavorite: boolean;
    isDefault?: boolean;
    uploadDate?: Date;
    md5?: string;
    length?: number;
    chunkSize?: number;
    metadata?: any;
    updatedAt?: Date;
    createdAt?: Date;
    __v?: number;
}
export declare class PosSearchFilesQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchFilesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchFilesQuerySortFilter;
    filters: PosSearchFilesQuerySortFilter[];
    fileFolderId: Types.ObjectId | null;
}
export declare class PosSearchFilesRes {
    pageIdx: number;
    files: PosFileDto[];
    totalPage: number;
    totalItem: number;
}

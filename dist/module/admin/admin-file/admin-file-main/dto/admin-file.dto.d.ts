import { Types } from 'mongoose';
export declare class AdminFileDto {
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
export declare class AdminSearchFilesQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchFilesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchFilesQuerySortFilter;
    filters: AdminSearchFilesQuerySortFilter[];
    fileFolderId: Types.ObjectId | null;
}
export declare class AdminSearchFilesRes {
    pageIdx: number;
    files: AdminFileDto[];
    totalPage: number;
    totalItem: number;
}

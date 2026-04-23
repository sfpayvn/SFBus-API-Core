import { Types } from 'mongoose';
export declare class ClientFileDto {
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
export declare class ClientSearchFilesQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchFilesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchFilesQuerySortFilter;
    filters: ClientSearchFilesQuerySortFilter[];
    fileFolderId: Types.ObjectId | null;
}
export declare class ClientSearchFilesRes {
    pageIdx: number;
    files: ClientFileDto[];
    totalPage: number;
    totalItem: number;
}

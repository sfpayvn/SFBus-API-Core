import { Types } from 'mongoose';
export declare class FileDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    link: string;
    filename: string;
    contentType: string;
    folderId: Types.ObjectId;
    isFavorite: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    uploadDate?: Date;
    md5?: string;
    length?: number;
    chunkSize?: number;
    metadata?: any;
    __v?: number;
}
export declare class SearchFilesQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchFilesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchFilesQuerySortFilter;
    filters: SearchFilesQuerySortFilter[];
    fileFolderId: Types.ObjectId | null;
}
export declare class SearchFilesRes {
    pageIdx: number;
    files: FileDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
export declare class DriverFileDto {
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
export declare class DriverSearchFilesQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchFilesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchFilesQuerySortFilter;
    filters: DriverSearchFilesQuerySortFilter[];
    fileFolderId: Types.ObjectId | null;
}
export declare class DriverSearchFilesRes {
    pageIdx: number;
    files: DriverFileDto[];
    totalPage: number;
    totalItem: number;
}

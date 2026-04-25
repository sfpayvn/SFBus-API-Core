import { Types } from 'mongoose';
export declare class AdminWidgetBlockDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    imageId: Types.ObjectId;
    imageUrl: string;
    html: string;
    css?: string;
    projectData?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchWidgetBlockQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchWidgetBlockQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchWidgetBlockQuerySortFilter;
    filters: AdminSearchWidgetBlockQuerySortFilter[];
}
export declare class AdminSearchWidgetBlocksResultDto {
    pageIdx: number;
    widgetBlocks: AdminWidgetBlockDto[];
    totalPage: number;
    totalItem: number;
}

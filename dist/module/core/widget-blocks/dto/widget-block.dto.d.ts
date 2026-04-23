import { Types } from 'mongoose';
export declare class WidgetBlockDto {
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
export declare class SearchWidgetBlockQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchWidgetBlockQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchWidgetBlockQuerySortFilter;
    filters: SearchWidgetBlockQuerySortFilter[];
}
export declare class SearchWidgetBlocksResultDto {
    pageIdx: number;
    widgetBlocks: WidgetBlockDto[];
    totalPage: number;
    totalItem: number;
}

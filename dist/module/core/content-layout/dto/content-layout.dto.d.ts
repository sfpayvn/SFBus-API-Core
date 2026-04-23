import { Types } from 'mongoose';
export declare class SearchContentLayoutsResultDto {
    contentLayouts: ContentLayoutDto[];
    pageIdx: number;
    totalItem: number;
    totalPage: number;
}
export declare class ContentLayoutZoneDto {
    name: string;
    html: string;
    css: string;
}
export declare class ContentLayoutDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    slug: string;
    imageId: Types.ObjectId;
    imageUrl: string;
    zones: string;
    description: string;
    projectData: string;
    platform: string;
    appSource: string;
    isPublish: boolean;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchContentLayoutQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchContentLayoutQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchContentLayoutQuerySortFilter;
    filters: SearchContentLayoutQuerySortFilter[];
}

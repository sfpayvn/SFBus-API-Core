import { Types } from 'mongoose';
export declare class AdminContentLayoutDto {
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
    isPublish: boolean;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchContentLayoutsResultDto {
    contentLayouts: AdminContentLayoutDto[];
    pageIdx: number;
    totalItem: number;
    totalPage: number;
}
export declare class AdminSearchContentLayoutQuery {
    pageIdx?: number;
    pageSize?: number;
    keyword?: string;
    sortBy?: any;
    filters?: any[];
}

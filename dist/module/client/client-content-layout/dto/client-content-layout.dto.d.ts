import { Types } from 'mongoose';
export declare class ClientContentLayoutDto {
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
export declare class ClientSearchContentLayoutsResultDto {
    contentLayouts: ClientContentLayoutDto[];
    pageIdx: number;
    totalItem: number;
    totalPage: number;
}
export declare class ClientSearchContentLayoutQuery {
    pageIdx?: number;
    pageSize?: number;
    keyword?: string;
    sortBy?: any;
    filters?: any[];
}
export declare class ClientAvailableSlugQueryDto {
    appSource: string;
    platform: string;
}
export declare class ClientAvailableBySlugQueryDto {
    appSource: string;
    platform: string;
    slug: string;
}

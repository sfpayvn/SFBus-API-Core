import { Types } from 'mongoose';
export declare class TrackingDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    type: string;
    platform: string;
    metadata: Record<string, any>;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare class SearchTrackingQuerySortFilter {
    key: string;
    value: any;
}
export declare class SearchTrackingRes {
    pageIdx: number;
    trackings: TrackingDto[];
    totalPage: number;
    totalItem: number;
}

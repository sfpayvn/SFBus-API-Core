import { Types } from 'mongoose';
export declare class AdminBusStationDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    detailAddress: string;
    location: string;
    imageId?: Types.ObjectId;
    image?: string;
    isOffice?: boolean;
    isActive?: boolean;
    provinceId: Types.ObjectId;
    isDefault?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class AdminSearchBusStationsQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusStationsQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusStationsQuerySortFilter;
    filters: AdminSearchBusStationsQuerySortFilter[];
}
export declare class AdminSearchBusStationsRes {
    pageIdx: number;
    busStations: AdminBusStationDto[];
    totalPage: number;
    totalItem: number;
}

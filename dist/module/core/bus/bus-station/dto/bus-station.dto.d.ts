import { Types } from 'mongoose';
export declare class BusStationDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    imageId?: Types.ObjectId;
    image?: string;
    isOffice?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class SearchBusStationsQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusStationsQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusStationsQuerySortFilter;
    filters: SearchBusStationsQuerySortFilter[];
}
export declare class SearchBusStationsRes {
    pageIdx: number;
    busStations: BusStationDto[];
    totalPage: number;
    totalItem: number;
}

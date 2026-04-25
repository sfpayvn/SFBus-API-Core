import { Types } from 'mongoose';
export declare class ClientBusStationDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    readonly detailAddress: string;
    readonly location: string;
    readonly provinceId: Types.ObjectId;
    readonly imageId?: Types.ObjectId;
    readonly image?: any;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class ClientSearchBusStationsQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusStationsQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusStationsQuerySortFilter;
    filters: ClientSearchBusStationsQuerySortFilter[];
}
export declare class ClientSearchBusStationsRes {
    pageIdx: number;
    busStations: ClientBusStationDto[];
    totalPage: number;
    totalItem: number;
}

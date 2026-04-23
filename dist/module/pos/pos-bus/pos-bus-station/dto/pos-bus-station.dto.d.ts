import { Types } from 'mongoose';
export declare class PosBusStationDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    readonly detailAddress: string;
    readonly location: string;
    readonly provinceId: Types.ObjectId;
    readonly imageId?: Types.ObjectId;
    readonly image?: any;
    isDefault?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class PosSearchBusStationsQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusStationsQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusStationsQuerySortFilter;
    filters: PosSearchBusStationsQuerySortFilter[];
}
export declare class PosSearchBusStationsRes {
    pageIdx: number;
    busStations: PosBusStationDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
import { BusStationDto } from '../../bus-station/dto/bus-station.dto';
export declare class BusProvinceDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busStations: BusStationDto[];
    name: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class SearchBusProvincesQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusProvincesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusProvincesQuerySortFilter;
    filters: SearchBusProvincesQuerySortFilter[];
}
export declare class SearchBusProvincesRes {
    pageIdx: number;
    busProvinces: BusProvinceDto[];
    totalPage: number;
    totalItem: number;
}

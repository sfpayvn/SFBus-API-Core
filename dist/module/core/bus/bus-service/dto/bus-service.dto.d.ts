import { Date, Types } from 'mongoose';
export declare class BusServiceDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
    icon: any;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusServicesQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusServicesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusServicesQuerySortFilter;
    filters: SearchBusServicesQuerySortFilter[];
}
export declare class SearchBusServicesRes {
    pageIdx: number;
    busServices: BusServiceDto[];
    totalPage: number;
    totalItem: number;
}

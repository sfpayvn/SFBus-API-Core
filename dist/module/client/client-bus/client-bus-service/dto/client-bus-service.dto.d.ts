import { Date, Types } from 'mongoose';
export declare class ClientBusServiceDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
    icon: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusServicesQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusServicesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusServicesQuerySortFilter;
    filters: ClientSearchBusServicesQuerySortFilter[];
}
export declare class ClientSearchBusServicesRes {
    pageIdx: number;
    busServices: ClientBusServiceDto[];
    totalPage: number;
    totalItem: number;
}

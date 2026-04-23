import { Date, Types } from 'mongoose';
export declare class AdminBusServiceDto {
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
export declare class AdminSearchBusServicesQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusServicesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusServicesQuerySortFilter;
    filters: AdminSearchBusServicesQuerySortFilter[];
}
export declare class AdminSearchBusServicesRes {
    pageIdx: number;
    busServices: AdminBusServiceDto[];
    totalPage: number;
    totalItem: number;
}

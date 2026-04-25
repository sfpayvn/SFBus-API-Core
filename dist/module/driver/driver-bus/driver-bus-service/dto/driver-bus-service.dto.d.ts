import { Date, Types } from 'mongoose';
export declare class DriverBusServiceDto {
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
export declare class DriverSearchBusServicesQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusServicesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusServicesQuerySortFilter;
    filters: DriverSearchBusServicesQuerySortFilter[];
}
export declare class DriverSearchBusServicesRes {
    pageIdx: number;
    busServices: DriverBusServiceDto[];
    totalPage: number;
    totalItem: number;
}

import { Date, Types } from 'mongoose';
export declare class PosBusServiceDto {
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
export declare class PosSearchBusServicesQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusServicesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusServicesQuerySortFilter;
    filters: PosSearchBusServicesQuerySortFilter[];
}
export declare class PosSearchBusServicesRes {
    pageIdx: number;
    busServices: PosBusServiceDto[];
    totalPage: number;
    totalItem: number;
}

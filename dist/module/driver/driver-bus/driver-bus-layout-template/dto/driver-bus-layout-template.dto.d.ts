import { Types } from 'mongoose';
export declare class DriverSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class DriverBusSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: DriverSeatDto[];
}
export declare class DriverBusLayoutTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: DriverBusSeatLayoutTemplateDto[];
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchBusLayoutTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusLayoutTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusLayoutTemplateQuerySortFilter;
    filters: DriverSearchBusLayoutTemplateQuerySortFilter[];
}
export declare class DriverSearchBusTemplateRes {
    pageIdx: number;
    busLayoutTemplates: DriverBusLayoutTemplateDto[];
    totalPage: number;
    totalItem: number;
}

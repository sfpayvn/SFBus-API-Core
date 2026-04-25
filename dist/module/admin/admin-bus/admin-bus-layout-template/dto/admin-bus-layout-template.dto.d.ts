import { Types } from 'mongoose';
export declare class AdminSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class AdminBusSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: AdminSeatDto[];
}
export declare class AdminBusLayoutTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: AdminBusSeatLayoutTemplateDto[];
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchBusLayoutTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusLayoutTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusLayoutTemplateQuerySortFilter;
    filters: AdminSearchBusLayoutTemplateQuerySortFilter[];
}
export declare class AdminSearchBusTemplateRes {
    pageIdx: number;
    busLayoutTemplates: AdminBusLayoutTemplateDto[];
    totalPage: number;
    totalItem: number;
}

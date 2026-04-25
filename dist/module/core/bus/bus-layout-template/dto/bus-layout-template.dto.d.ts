import { Types } from 'mongoose';
export declare class SeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class BusSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: SeatDto[];
}
export declare class BusLayoutTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: BusSeatLayoutTemplateDto[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusLayoutTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusLayoutTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusLayoutTemplateQuerySortFilter;
    filters: SearchBusLayoutTemplateQuerySortFilter[];
}
export declare class SearchBusTemplateRes {
    pageIdx: number;
    busLayoutTemplates: BusLayoutTemplateDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
export declare class PosSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class PosBusSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: PosSeatDto[];
}
export declare class PosBusLayoutTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: PosBusSeatLayoutTemplateDto[];
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchBusLayoutTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusLayoutTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusLayoutTemplateQuerySortFilter;
    filters: PosSearchBusLayoutTemplateQuerySortFilter[];
}
export declare class PosSearchBusTemplateRes {
    pageIdx: number;
    busLayoutTemplates: PosBusLayoutTemplateDto[];
    totalPage: number;
    totalItem: number;
}

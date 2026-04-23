import { Types } from 'mongoose';
export declare class ClientSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class ClientBusSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: ClientSeatDto[];
}
export declare class ClientBusLayoutTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: ClientBusSeatLayoutTemplateDto[];
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusLayoutTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusLayoutTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusLayoutTemplateQuerySortFilter;
    filters: ClientSearchBusLayoutTemplateQuerySortFilter[];
}
export declare class ClientSearchBusTemplateRes {
    pageIdx: number;
    busLayoutTemplates: ClientBusLayoutTemplateDto[];
    totalPage: number;
    totalItem: number;
}

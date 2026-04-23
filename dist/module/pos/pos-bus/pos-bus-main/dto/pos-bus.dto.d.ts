import { Types } from 'mongoose';
import { PosBusTemplateDto } from '../../pos-bus-template/dto/pos-bus-template.dto';
export declare class PosBusDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    description?: string;
    busTemplateId: Types.ObjectId;
    busTemplate: PosBusTemplateDto;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchBusQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusQuerySortFilter;
    filters: PosSearchBusQuerySortFilter[];
}
export declare class PosSearchBusRes {
    pageIdx: number;
    buses: PosBusDto[];
    totalPage: number;
    totalItem: number;
}

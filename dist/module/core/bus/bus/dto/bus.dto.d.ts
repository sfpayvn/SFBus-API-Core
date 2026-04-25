import { Types } from 'mongoose';
import { BusTemplateDto } from '../../bus-template/dto/bus-template.dto';
export declare class BusDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    description?: string;
    busTemplateId: Types.ObjectId;
    busTemplate: BusTemplateDto;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusQuerySortFilter;
    filters: SearchBusQuerySortFilter[];
}
export declare class SearchBusRes {
    pageIdx: number;
    buses: BusDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
import { BusTypeDto } from '../../bus-type/dto/bus-type.dto';
import { BusServiceDto } from '../../bus-service/dto/bus-service.dto';
export declare class BusTemplateDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busServices: BusServiceDto[];
    busTypeId: Types.ObjectId;
    busType: BusTypeDto;
    busLayoutTemplateId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusTemplateQuerySortFilter;
    filters: SearchBusTemplateQuerySortFilter[];
}
export declare class SearchBusTemplateRes {
    pageIdx: number;
    busTemplates: BusTemplateDto[];
    totalPage: number;
    totalItem: number;
}

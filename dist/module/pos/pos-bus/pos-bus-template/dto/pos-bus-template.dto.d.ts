import { Types } from 'mongoose';
import { PosBusServiceDto } from '../../pos-bus-service/dto/pos-bus-service.dto';
import { PosBusTypeDto } from '../../pos-bus-type/dto/pos-bus-type.dto';
export declare class PosBusTemplateDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busServices: PosBusServiceDto[];
    busTypeId: Types.ObjectId;
    busType: PosBusTypeDto;
    busLayoutTemplateId: Types.ObjectId;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchBusTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusTemplateQuerySortFilter;
    filters: PosSearchBusTemplateQuerySortFilter[];
}
export declare class PosSearchBusTemplateRes {
    pageIdx: number;
    busTemplates: PosBusTemplateDto[];
    totalPage: number;
    totalItem: number;
}

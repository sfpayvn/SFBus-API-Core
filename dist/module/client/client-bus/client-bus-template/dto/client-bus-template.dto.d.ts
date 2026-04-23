import { Types } from 'mongoose';
import { ClientBusServiceDto } from '../../client-bus-service/dto/client-bus-service.dto';
import { ClientBusTypeDto } from '../../client-bus-type/dto/client-bus-type.dto';
export declare class ClientBusTemplateDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busServices: ClientBusServiceDto[];
    busTypeId: Types.ObjectId;
    busType: ClientBusTypeDto;
    busLayoutTemplateId: Types.ObjectId;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusTemplateQuerySortFilter;
    filters: ClientSearchBusTemplateQuerySortFilter[];
}
export declare class ClientSearchBusTemplateRes {
    pageIdx: number;
    busTemplates: ClientBusTemplateDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
import { ClientBusTemplateDto } from '../../client-bus-template/dto/client-bus-template.dto';
export declare class ClientBusDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    description?: string;
    busTemplateId: Types.ObjectId;
    busTemplate: ClientBusTemplateDto;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusQuerySortFilter;
    filters: ClientSearchBusQuerySortFilter[];
}
export declare class ClientSearchBusRes {
    pageIdx: number;
    buses: ClientBusDto[];
    totalPage: number;
    totalItem: number;
}

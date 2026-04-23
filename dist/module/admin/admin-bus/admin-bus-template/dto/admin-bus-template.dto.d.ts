import { Types } from 'mongoose';
import { AdminBusServiceDto } from '../../admin-bus-service/dto/admin-bus-service.dto';
import { AdminBusTypeDto } from '../../admin-bus-type/dto/admin-bus-type.dto';
export declare class AdminBusTemplateDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busServices: AdminBusServiceDto[];
    busTypeId: Types.ObjectId;
    busType: AdminBusTypeDto;
    busLayoutTemplateId: Types.ObjectId;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchBusTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusTemplateQuerySortFilter;
    filters: AdminSearchBusTemplateQuerySortFilter[];
}
export declare class AdminSearchBusTemplateRes {
    pageIdx: number;
    busTemplates: AdminBusTemplateDto[];
    totalPage: number;
    totalItem: number;
}

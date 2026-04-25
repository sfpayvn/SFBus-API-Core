import { Types } from 'mongoose';
import { AdminBusTemplateDto } from '../../admin-bus-template/dto/admin-bus-template.dto';
export declare class AdminBusDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    description?: string;
    busTemplateId: Types.ObjectId;
    busTemplate: AdminBusTemplateDto;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchBusQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusQuerySortFilter;
    filters: AdminSearchBusQuerySortFilter[];
}
export declare class AdminSearchBusRes {
    pageIdx: number;
    buses: AdminBusDto[];
    totalPage: number;
    totalItem: number;
}

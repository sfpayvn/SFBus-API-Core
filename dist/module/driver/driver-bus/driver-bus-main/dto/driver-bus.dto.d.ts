import { Types } from 'mongoose';
import { DriverBusTemplateDto } from '../../driver-bus-template/dto/driver-bus-template.dto';
export declare class DriverBusDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    description?: string;
    busTemplateId: Types.ObjectId;
    busTemplate: DriverBusTemplateDto;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchBusQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusQuerySortFilter;
    filters: DriverSearchBusQuerySortFilter[];
}
export declare class DriverSearchBusRes {
    pageIdx: number;
    buses: DriverBusDto[];
    totalPage: number;
    totalItem: number;
}

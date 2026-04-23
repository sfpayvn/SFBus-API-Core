import { Types } from 'mongoose';
import { DriverBusServiceDto } from '../../driver-bus-service/dto/driver-bus-service.dto';
import { DriverBusTypeDto } from '../../driver-bus-type/dto/driver-bus-type.dto';
export declare class DriverBusTemplateDto {
    _id: string;
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busServices: DriverBusServiceDto[];
    busTypeId: Types.ObjectId;
    busType: DriverBusTypeDto;
    busLayoutTemplateId: Types.ObjectId;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchBusTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusTemplateQuerySortFilter;
    filters: DriverSearchBusTemplateQuerySortFilter[];
}
export declare class DriverSearchBusTemplateRes {
    pageIdx: number;
    busTemplates: DriverBusTemplateDto[];
    totalPage: number;
    totalItem: number;
}

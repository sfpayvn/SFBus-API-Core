import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import { DriverBusTypeDto, DriverSearchBusTypesQuerySortFilter, DriverSearchBusTypesRes } from './dto/driver-bus-type.dto';
export declare class DriverBusTypeService {
    private readonly busTypeModel;
    private readonly busTypeService;
    ROOT_TENANT_ID: string;
    constructor(busTypeModel: Model<BusTypeDocument>, busTypeService: BusTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusTypesQuerySortFilter, filters: DriverSearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusTypesRes>;
}

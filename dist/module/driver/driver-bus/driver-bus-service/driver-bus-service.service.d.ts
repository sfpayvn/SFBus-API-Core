import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { BusServiceDocument } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { Model, Types } from 'mongoose';
import { DriverBusServiceDto, DriverSearchBusServicesQuerySortFilter, DriverSearchBusServicesRes } from './dto/driver-bus-service.dto';
export declare class DriverBusServiceService {
    private readonly busServiceModel;
    private readonly busServiceService;
    ROOT_TENANT_ID: string;
    constructor(busServiceModel: Model<BusServiceDocument>, busServiceService: BusServiceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusServiceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusServicesQuerySortFilter, filters: DriverSearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusServicesRes>;
}

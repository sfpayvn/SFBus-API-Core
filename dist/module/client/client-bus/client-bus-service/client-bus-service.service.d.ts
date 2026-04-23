import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { BusServiceDocument } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { Model, Types } from 'mongoose';
import { ClientBusServiceDto, ClientSearchBusServicesQuerySortFilter, ClientSearchBusServicesRes } from './dto/client-bus-service.dto';
export declare class ClientBusServiceService {
    private readonly busServiceModel;
    private readonly busServiceService;
    ROOT_TENANT_ID: string;
    constructor(busServiceModel: Model<BusServiceDocument>, busServiceService: BusServiceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusServiceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusServicesQuerySortFilter, filters: ClientSearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusServicesRes>;
}

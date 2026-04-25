import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { BusServiceDocument } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { Model, Types } from 'mongoose';
import { PosBusServiceDto, PosSearchBusServicesQuerySortFilter, PosSearchBusServicesRes } from './dto/pos-bus-service.dto';
export declare class PosBusServiceService {
    private readonly busServiceModel;
    private readonly busServiceService;
    ROOT_TENANT_ID: string;
    constructor(busServiceModel: Model<BusServiceDocument>, busServiceService: BusServiceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusServiceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusServicesQuerySortFilter, filters: PosSearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusServicesRes>;
}

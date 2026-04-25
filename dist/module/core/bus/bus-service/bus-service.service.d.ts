import { Model, Types } from 'mongoose';
import { CreateBusServiceDto } from './dto/create-bus-service.dto';
import { BusServiceDto, SearchBusServicesQuerySortFilter, SearchBusServicesRes } from './dto/bus-service.dto';
import { UpdateBusServiceDto } from './dto/update-bus-service.dto';
import { BusServiceDocument } from './schema/bus-service.schema';
export declare class BusServiceService {
    private readonly busServiceModel;
    constructor(busServiceModel: Model<BusServiceDocument>);
    create(createBusServiceDto: CreateBusServiceDto, tenantId: Types.ObjectId): Promise<BusServiceDto>;
    update(updateBusServiceDto: UpdateBusServiceDto, tenantId: Types.ObjectId): Promise<BusServiceDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusServiceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusServicesQuerySortFilter, filters: SearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusServicesRes>;
    buildQuerySearchBusServices(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusServicesQuerySortFilter, filters: SearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
    mapBusServiceIconUrl(busServices: BusServiceDto[]): BusServiceDto[];
}

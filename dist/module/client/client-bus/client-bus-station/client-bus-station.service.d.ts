import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import { ClientBusStationDto, ClientSearchBusStationsQuerySortFilter, ClientSearchBusStationsRes } from './dto/client-bus-station.dto';
export declare class ClientBusStationService {
    private readonly busStationModel;
    private readonly busStationService;
    ROOT_TENANT_ID: string;
    constructor(busStationModel: Model<BusStationDocument>, busStationService: BusStationService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusStationsQuerySortFilter, filters: ClientSearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusStationsRes>;
}

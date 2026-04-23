import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import { PosBusStationDto, PosSearchBusStationsQuerySortFilter, PosSearchBusStationsRes } from './dto/pos-bus-station.dto';
export declare class PosBusStationService {
    private readonly busStationModel;
    private readonly busStationService;
    ROOT_TENANT_ID: string;
    constructor(busStationModel: Model<BusStationDocument>, busStationService: BusStationService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]>;
    findAllAvailable(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]>;
    findOffices(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusStationDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusStationsQuerySortFilter, filters: PosSearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusStationsRes>;
}

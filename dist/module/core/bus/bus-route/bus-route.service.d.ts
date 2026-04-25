import { Model, Types } from 'mongoose';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { BusRouteDto, SearchBusRouteQuerySortFilter, SearchBusRouteRes } from './dto/bus-route.dto';
import { BusRouteDocument } from './schema/bus-route.schema';
import { BusStationService } from '../bus-station/bus-station.service';
export declare class BusRouteService {
    private readonly busRouteModel;
    private readonly busStationService;
    constructor(busRouteModel: Model<BusRouteDocument>, busStationService: BusStationService);
    create(createBusRouteDto: CreateBusRouteDto, tenantId: Types.ObjectId): Promise<BusRouteDto>;
    update(updateBusRouteDto: UpdateBusRouteDto, tenantId: Types.ObjectId): Promise<BusRouteDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusRouteDto | null>;
    findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusRouteDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusRouteQuerySortFilter, filters: SearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusRouteRes>;
    buildQuerySearchBusRoute(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusRouteQuerySortFilter, filters: SearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}

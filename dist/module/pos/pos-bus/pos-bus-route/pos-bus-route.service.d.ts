import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { Model, Types } from 'mongoose';
import { PosBusRouteDto, PosSearchBusRouteQuerySortFilter, PosSearchBusRouteRes } from './dto/pos-bus-route.dto';
export declare class PosBusRouteService {
    private readonly busRouteModel;
    private readonly busRouteService;
    ROOT_TENANT_ID: string;
    constructor(busRouteModel: Model<BusRouteDocument>, busRouteService: BusRouteService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto | null>;
    findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusRouteQuerySortFilter, filters: PosSearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusRouteRes>;
}

import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { Model, Types } from 'mongoose';
import { ClientBusRouteDto, ClientSearchBusRouteQuerySortFilter, ClientSearchBusRouteRes } from './dto/client-bus-route.dto';
export declare class ClientBusRouteService {
    private readonly busRouteModel;
    private readonly busRouteService;
    ROOT_TENANT_ID: string;
    constructor(busRouteModel: Model<BusRouteDocument>, busRouteService: BusRouteService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusRouteDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusRouteQuerySortFilter, filters: ClientSearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusRouteRes>;
}

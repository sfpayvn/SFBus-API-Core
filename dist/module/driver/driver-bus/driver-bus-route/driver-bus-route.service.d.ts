import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { Model, Types } from 'mongoose';
import { DriverBusRouteDto, DriverSearchBusRouteQuerySortFilter, DriverSearchBusRouteRes } from './dto/driver-bus-route.dto';
export declare class DriverBusRouteService {
    private readonly busRouteModel;
    private readonly busRouteService;
    ROOT_TENANT_ID: string;
    constructor(busRouteModel: Model<BusRouteDocument>, busRouteService: BusRouteService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusRouteDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusRouteQuerySortFilter, filters: DriverSearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusRouteRes>;
}

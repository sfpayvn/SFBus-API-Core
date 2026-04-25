import { DriverBusRouteService } from './driver-bus-route.service';
import { Types } from 'mongoose';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { DriverSearchBusRouteQuery } from './dto/driver-bus-route.dto';
export declare class DriverBusRouteController {
    private readonly DriverBusRouteService;
    constructor(DriverBusRouteService: DriverBusRouteService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-route.dto").DriverBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-route.dto").DriverBusRouteDto | null>;
    search(query: DriverSearchBusRouteQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-route.dto").DriverSearchBusRouteRes>;
}

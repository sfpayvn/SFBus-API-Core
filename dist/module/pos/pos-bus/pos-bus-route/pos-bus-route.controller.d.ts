import { PosBusRouteService } from './pos-bus-route.service';
import { Types } from 'mongoose';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { PosSearchBusRouteQuery } from './dto/pos-bus-route.dto';
export declare class PosBusRouteController {
    private readonly PosBusRouteService;
    constructor(PosBusRouteService: PosBusRouteService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-route.dto").PosBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-route.dto").PosBusRouteDto>;
    findByStationId(stationId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-route.dto").PosBusRouteDto[]>;
    search(query: PosSearchBusRouteQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-route.dto").PosSearchBusRouteRes>;
}

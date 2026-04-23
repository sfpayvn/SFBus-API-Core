import { ClientBusRouteService } from './client-bus-route.service';
import { Types } from 'mongoose';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { ClientSearchBusRouteQuery } from './dto/client-bus-route.dto';
export declare class ClientBusRouteController {
    private readonly ClientBusRouteService;
    constructor(ClientBusRouteService: ClientBusRouteService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-route.dto").ClientBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-route.dto").ClientBusRouteDto>;
    search(query: ClientSearchBusRouteQuery, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-route.dto").ClientSearchBusRouteRes>;
}

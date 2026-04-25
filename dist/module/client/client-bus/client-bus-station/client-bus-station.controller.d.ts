import { ClientBusStationService } from './client-bus-station.service';
import { Types } from 'mongoose';
import { ClientSearchBusStationsQuery } from './dto/client-bus-station.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusStationController {
    private readonly ClientBusStationService;
    constructor(ClientBusStationService: ClientBusStationService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-station.dto").ClientBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-station.dto").ClientBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-station.dto").ClientBusStationDto>;
    search(tenantScope: TenantScopeResult, query: ClientSearchBusStationsQuery): Promise<import("./dto/client-bus-station.dto").ClientSearchBusStationsRes>;
}

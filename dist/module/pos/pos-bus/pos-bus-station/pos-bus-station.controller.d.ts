import { PosBusStationService } from './pos-bus-station.service';
import { Types } from 'mongoose';
import { PosSearchBusStationsQuery } from './dto/pos-bus-station.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusStationController {
    private readonly PosBusStationService;
    constructor(PosBusStationService: PosBusStationService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-station.dto").PosBusStationDto[]>;
    findAllAvailable(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-station.dto").PosBusStationDto[]>;
    findOffices(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-station.dto").PosBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-station.dto").PosBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-station.dto").PosBusStationDto>;
    search(tenantScope: TenantScopeResult, query: PosSearchBusStationsQuery): Promise<import("./dto/pos-bus-station.dto").PosSearchBusStationsRes>;
}

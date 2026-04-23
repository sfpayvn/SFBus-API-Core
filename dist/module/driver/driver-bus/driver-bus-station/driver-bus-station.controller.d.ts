import { DriverBusStationService } from './driver-bus-station.service';
import { Types } from 'mongoose';
import { DriverSearchBusStationsQuery } from './dto/driver-bus-station.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusStationController {
    private readonly DriverBusStationService;
    constructor(DriverBusStationService: DriverBusStationService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-station.dto").DriverBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-station.dto").DriverBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-station.dto").DriverBusStationDto>;
    search(tenantScope: TenantScopeResult, query: DriverSearchBusStationsQuery): Promise<import("./dto/driver-bus-station.dto").DriverSearchBusStationsRes>;
}

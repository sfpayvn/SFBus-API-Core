import { DriverBusServiceService } from './driver-bus-service.service';
import { Types } from 'mongoose';
import { DriverSearchBusServicesQuery } from './dto/driver-bus-service.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusServiceController {
    private readonly DriverBusServiceService;
    constructor(DriverBusServiceService: DriverBusServiceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-service.dto").DriverBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-service.dto").DriverBusServiceDto>;
    search(query: DriverSearchBusServicesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-service.dto").DriverSearchBusServicesRes>;
}

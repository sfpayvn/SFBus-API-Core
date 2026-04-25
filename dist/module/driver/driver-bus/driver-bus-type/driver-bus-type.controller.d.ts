import { DriverBusTypeService } from './driver-bus-type.service';
import { Types } from 'mongoose';
import { DriverSearchBusTypesQuery } from './dto/driver-bus-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusTypeController {
    private readonly DriverBusTypeService;
    constructor(DriverBusTypeService: DriverBusTypeService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-type.dto").DriverBusTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-type.dto").DriverBusTypeDto[]>;
    search(query: DriverSearchBusTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-type.dto").DriverSearchBusTypesRes>;
}

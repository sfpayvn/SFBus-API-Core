import { PosBusServiceService } from './pos-bus-service.service';
import { Types } from 'mongoose';
import { PosSearchBusServicesQuery } from './dto/pos-bus-service.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusServiceController {
    private readonly PosBusServiceService;
    constructor(PosBusServiceService: PosBusServiceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-service.dto").PosBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-service.dto").PosBusServiceDto>;
    search(query: PosSearchBusServicesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-service.dto").PosSearchBusServicesRes>;
}

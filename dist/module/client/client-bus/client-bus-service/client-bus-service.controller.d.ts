import { ClientBusServiceService } from './client-bus-service.service';
import { Types } from 'mongoose';
import { ClientSearchBusServicesQuery } from './dto/client-bus-service.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusServiceController {
    private readonly ClientBusServiceService;
    constructor(ClientBusServiceService: ClientBusServiceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-service.dto").ClientBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-service.dto").ClientBusServiceDto>;
    search(query: ClientSearchBusServicesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-service.dto").ClientSearchBusServicesRes>;
}

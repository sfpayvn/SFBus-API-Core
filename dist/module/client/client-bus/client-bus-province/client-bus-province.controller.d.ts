import { ClientBusProvinceService } from './client-bus-province.service';
import { Types } from 'mongoose';
import { ClientSearchBusProvincesQuery } from './dto/client-bus-province.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusProvinceController {
    private readonly ClientBusProvinceService;
    constructor(ClientBusProvinceService: ClientBusProvinceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-province.dto").ClientBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-province.dto").ClientBusProvinceDto>;
    search(query: ClientSearchBusProvincesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-province.dto").ClientSearchBusProvincesRes>;
}

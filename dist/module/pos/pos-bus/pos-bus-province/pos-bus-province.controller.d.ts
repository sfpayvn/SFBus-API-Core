import { PosBusProvinceService } from './pos-bus-province.service';
import { Types } from 'mongoose';
import { PosSearchBusProvincesQuery } from './dto/pos-bus-province.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusProvinceController {
    private readonly PosBusProvinceService;
    constructor(PosBusProvinceService: PosBusProvinceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-province.dto").PosBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-province.dto").PosBusProvinceDto>;
    search(query: PosSearchBusProvincesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-province.dto").PosSearchBusProvincesRes>;
}

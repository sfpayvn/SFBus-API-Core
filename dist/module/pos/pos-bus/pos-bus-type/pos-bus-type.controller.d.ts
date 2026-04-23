import { PosBusTypeService } from './pos-bus-type.service';
import { Types } from 'mongoose';
import { PosSearchBusTypesQuery } from './dto/pos-bus-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusTypeController {
    private readonly PosBusTypeService;
    constructor(PosBusTypeService: PosBusTypeService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-type.dto").PosBusTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-type.dto").PosBusTypeDto[]>;
    search(query: PosSearchBusTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-type.dto").PosSearchBusTypesRes>;
}

import { PosSeatTypeService } from './pos-seat-type.service';
import { Types } from 'mongoose';
import { PosSearchSeatTypesQuery } from './dto/pos-seat-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosSeatTypeController {
    private readonly PosSeatTypeService;
    constructor(PosSeatTypeService: PosSeatTypeService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-seat-type.dto").PosSeatTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-seat-type.dto").PosSeatTypeDto[]>;
    search(query: PosSearchSeatTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-seat-type.dto").PosSearchSeatTypeRes>;
}

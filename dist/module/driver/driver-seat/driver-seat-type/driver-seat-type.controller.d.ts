import { DriverSeatTypeService } from './driver-seat-type.service';
import { Types } from 'mongoose';
import { DriverSearchSeatTypesQuery } from './dto/driver-seat-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverSeatTypeController {
    private readonly DriverSeatTypeService;
    constructor(DriverSeatTypeService: DriverSeatTypeService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-seat-type.dto").DriverSeatTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-seat-type.dto").DriverSeatTypeDto[]>;
    search(query: DriverSearchSeatTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-seat-type.dto").DriverSearchSeatTypeRes>;
}

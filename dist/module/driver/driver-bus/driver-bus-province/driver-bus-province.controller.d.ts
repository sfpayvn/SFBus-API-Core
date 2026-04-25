import { DriverBusProvinceService } from './driver-bus-province.service';
import { Types } from 'mongoose';
import { DriverSearchBusProvincesQuery } from './dto/driver-bus-province.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusProvinceController {
    private readonly DriverBusProvinceService;
    constructor(DriverBusProvinceService: DriverBusProvinceService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-province.dto").DriverBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-province.dto").DriverBusProvinceDto>;
    search(query: DriverSearchBusProvincesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-province.dto").DriverSearchBusProvincesRes>;
}

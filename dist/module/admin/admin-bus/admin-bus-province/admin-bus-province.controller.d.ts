import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusProvinceService } from './admin-bus-province.service';
import { Types } from 'mongoose';
import { AdminCloneBusProvinceDto, AdminCreateBusProvinceDto } from './dto/admin-create-bus-province.dto';
import { AdminUpdateBusProvinceDto } from './dto/admin-update-bus-province.dto';
import { AdminSearchBusProvincesQuery } from './dto/admin-bus-province.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusProvinceController {
    private readonly adminBusProvinceService;
    constructor(adminBusProvinceService: AdminBusProvinceService);
    create(adminCreateBusProvinceDto: AdminCreateBusProvinceDto, user: UserTokenDto): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto>;
    clone(adminCloneBusProvinceDto: AdminCloneBusProvinceDto, user: UserTokenDto): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto>;
    update(adminUpdateBusProvinceDto: AdminUpdateBusProvinceDto, user: UserTokenDto): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto[]>;
    findAllAvailable(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-province.dto").AdminBusProvinceDto>;
    search(query: AdminSearchBusProvincesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-province.dto").AdminSearchBusProvincesRes>;
}

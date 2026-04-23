import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusServiceService } from './admin-bus-service.service';
import { Types } from 'mongoose';
import { AdminSearchBusServicesQuery } from './dto/admin-bus-service.dto';
import { AdminCreateBusServiceDto } from './dto/admin-create-bus-service.dto';
import { AdminUpdateBusServiceDto } from './dto/admin-update-bus-service.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusServiceController {
    private readonly adminBusServiceService;
    constructor(adminBusServiceService: AdminBusServiceService);
    create(adminCreateBusServiceDto: AdminCreateBusServiceDto, user: UserTokenDto): Promise<import("./dto/admin-bus-service.dto").AdminBusServiceDto>;
    update(adminUpdateBusServiceDto: AdminUpdateBusServiceDto, user: UserTokenDto): Promise<import("./dto/admin-bus-service.dto").AdminBusServiceDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-service.dto").AdminBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-service.dto").AdminBusServiceDto>;
    search(query: AdminSearchBusServicesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-service.dto").AdminSearchBusServicesRes>;
}

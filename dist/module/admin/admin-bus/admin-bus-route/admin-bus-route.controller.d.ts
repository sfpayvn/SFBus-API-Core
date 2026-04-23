import { AdminBusRouteService } from './admin-bus-route.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminSearchBusRouteQuery } from './dto/admin-admin-bus-route.dto';
import { AdminCreateBusRouteDto } from './dto/admin-create-bus-route.dto';
import { AdminUpdateBusRouteDto } from './dto/admin-update-bus-route.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusRouteController {
    private readonly adminBusRouteService;
    constructor(adminBusRouteService: AdminBusRouteService);
    create(adminCreateBusRouteDto: AdminCreateBusRouteDto, user: UserTokenDto): Promise<import("./dto/admin-admin-bus-route.dto").AdminBusRouteDto>;
    update(adminUpdateBusRouteDto: AdminUpdateBusRouteDto, user: UserTokenDto): Promise<import("./dto/admin-admin-bus-route.dto").AdminBusRouteDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-route.dto").AdminBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-route.dto").AdminBusRouteDto>;
    findByStationId(stationId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-route.dto").AdminBusRouteDto[]>;
    search(query: AdminSearchBusRouteQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-route.dto").AdminSearchBusRouteRes>;
}

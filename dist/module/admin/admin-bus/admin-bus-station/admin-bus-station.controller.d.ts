import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusStationService } from './admin-bus-station.service';
import { Types } from 'mongoose';
import { AdminSearchBusStationsQuery } from './dto/admin-bus-station.dto';
import { AdminCreateBusStationDto } from './dto/admin-create-bus-station.dto';
import { AdminUpdateBusStationDto } from './dto/admin-update-bus-station.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusStationController {
    private readonly adminBusStationService;
    constructor(adminBusStationService: AdminBusStationService);
    create(adminCreateBusStationDto: AdminCreateBusStationDto, user: UserTokenDto): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto>;
    update(adminUpdateBusStationDto: AdminUpdateBusStationDto, user: UserTokenDto): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto>;
    updates(adminUpdateBusStationDtos: AdminUpdateBusStationDto[], tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto[]>;
    findAllAvailable(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto[]>;
    findAllUnAssignedAvailable(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto[]>;
    findOffices(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-station.dto").AdminBusStationDto>;
    search(tenantScope: TenantScopeResult, query: AdminSearchBusStationsQuery): Promise<import("./dto/admin-bus-station.dto").AdminSearchBusStationsRes>;
}

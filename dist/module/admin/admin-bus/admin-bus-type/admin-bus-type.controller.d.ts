import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusTypeService } from './admin-bus-type.service';
import { Types } from 'mongoose';
import { AdminSearchBusTypesQuery } from './dto/admin-bus-type.dto';
import { AdminCreateBusTypeDto } from './dto/admin-create-bus-type.dto';
import { AdminUpdateBusTypeDto } from './dto/admin-update-bus-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusTypeController {
    private readonly adminBusTypeService;
    constructor(adminBusTypeService: AdminBusTypeService);
    create(adminCreateBusTypeDto: AdminCreateBusTypeDto, user: UserTokenDto): Promise<import("./dto/admin-bus-type.dto").AdminBusTypeDto>;
    update(adminUpdateBusTypeDto: AdminUpdateBusTypeDto, user: UserTokenDto): Promise<import("./dto/admin-bus-type.dto").AdminBusTypeDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-type.dto").AdminBusTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-type.dto").AdminBusTypeDto[]>;
    search(query: AdminSearchBusTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-type.dto").AdminSearchBusTypesRes>;
}

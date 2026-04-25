import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminSeatTypeService } from './admin-seat-type.service';
import { Types } from 'mongoose';
import { AdminCreateSeatTypeDto } from './dto/admin-create-seat-type.dto';
import { AdminUpdateSeatTypeDto } from './dto/admin-update-seat-type.dto';
import { AdminSearchSeatTypesQuery } from './dto/admin-seat-type.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminSeatTypeController {
    private readonly adminSeatTypeService;
    constructor(adminSeatTypeService: AdminSeatTypeService);
    create(adminCreateSeatTypeDto: AdminCreateSeatTypeDto, user: UserTokenDto): Promise<import("./dto/admin-seat-type.dto").AdminSeatTypeDto>;
    update(adminUpdateSeatTypeDto: AdminUpdateSeatTypeDto, user: UserTokenDto): Promise<import("./dto/admin-seat-type.dto").AdminSeatTypeDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-seat-type.dto").AdminSeatTypeDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-seat-type.dto").AdminSeatTypeDto[]>;
    search(query: AdminSearchSeatTypesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-seat-type.dto").AdminSearchSeatTypeRes>;
}

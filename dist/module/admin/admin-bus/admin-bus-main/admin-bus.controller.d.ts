import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusService } from './admin-bus.service';
import { Types } from 'mongoose';
import { AdminCreateBusDto } from './dto/admin-create-bus.dto';
import { AdminUpdateBusDto } from './dto/admin-update-bus.dto';
import { AdminSearchBusQuery } from './dto/admin-bus.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusController {
    private readonly adminBusService;
    constructor(adminBusService: AdminBusService);
    create(adminCreateBusDto: AdminCreateBusDto, user: UserTokenDto): Promise<import("./dto/admin-bus.dto").AdminBusDto>;
    update(adminUpdateBusDto: AdminUpdateBusDto, user: UserTokenDto): Promise<import("./dto/admin-bus.dto").AdminBusDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-bus.dto").AdminBusDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-bus.dto").AdminBusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus.dto").AdminBusDto[]>;
    search(query: AdminSearchBusQuery, user: UserTokenDto): Promise<import("./dto/admin-bus.dto").AdminSearchBusRes>;
}

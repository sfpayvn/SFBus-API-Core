import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminContentLayoutService } from './admin-content-layout.service';
import { AdminSearchContentLayoutQuery } from './dto/admin-content-layout.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';
import { AdminCreateContentLayoutDto } from './dto/admin-create-content-layout.dto';
export declare class AdminContentLayoutController {
    private readonly adminContentLayoutService;
    constructor(adminContentLayoutService: AdminContentLayoutService);
    create(createContentLayoutDto: AdminCreateContentLayoutDto, user: UserTokenDto): Promise<import("./dto/admin-content-layout.dto").AdminContentLayoutDto>;
    update(updateContentLayoutDto: any, user: UserTokenDto): Promise<import("./dto/admin-content-layout.dto").AdminContentLayoutDto>;
    remove(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto, tenantScope: TenantScopeResult): Promise<import("./dto/admin-content-layout.dto").AdminContentLayoutDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-content-layout.dto").AdminContentLayoutDto | null>;
    search(query: AdminSearchContentLayoutQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-content-layout.dto").AdminSearchContentLayoutsResultDto>;
}

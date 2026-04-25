import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusTemplateService } from './admin-bus-template.service';
import { Types } from 'mongoose';
import { AdminCreateBusTemplateDto } from './dto/admin-create-bus-template.dto';
import { AdminUpdateBusTemplateDto } from './dto/admin-update-bus-template.dto';
import { AdminSearchBusTemplateQuery } from './dto/admin-bus-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusTemplateController {
    private readonly adminBusTemplateService;
    constructor(adminBusTemplateService: AdminBusTemplateService);
    create(adminCreateBusTemplateDto: AdminCreateBusTemplateDto, user: UserTokenDto): Promise<import("./dto/admin-bus-template.dto").AdminBusTemplateDto>;
    update(adminUpdateBusTemplateDto: AdminUpdateBusTemplateDto, user: UserTokenDto): Promise<import("./dto/admin-bus-template.dto").AdminBusTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-template.dto").AdminBusTemplateDto[]>;
    search(query: AdminSearchBusTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-template.dto").AdminSearchBusTemplateRes>;
}

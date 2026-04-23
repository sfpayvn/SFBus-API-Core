import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminCreateBusLayoutTemplateDto } from './dto/admin-create-bus-layout-template.dto';
import { AdminUpdateBusLayoutTemplateDto } from './dto/admin-update-bus-layout-template.dto';
import { AdminSearchBusLayoutTemplateQuery } from './dto/admin-bus-layout-template.dto';
import { AdminBusLayoutTemplateService } from './admin-bus-layout-template.service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusLayoutTemplateController {
    private readonly adminBusLayoutTemplateService;
    constructor(adminBusLayoutTemplateService: AdminBusLayoutTemplateService);
    create(adminCreateBusLayoutTemplateDto: AdminCreateBusLayoutTemplateDto, user: UserTokenDto): Promise<import("./dto/admin-bus-layout-template.dto").AdminBusLayoutTemplateDto>;
    update(adminUpdateBusLayoutTemplateDto: AdminUpdateBusLayoutTemplateDto, user: UserTokenDto): Promise<import("./dto/admin-bus-layout-template.dto").AdminBusLayoutTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-layout-template/dto/bus-layout-template.dto").BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-layout-template.dto").AdminBusLayoutTemplateDto>;
    search(query: AdminSearchBusLayoutTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-layout-template.dto").AdminSearchBusTemplateRes>;
}

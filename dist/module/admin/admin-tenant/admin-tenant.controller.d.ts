import { Types } from 'mongoose';
import { AdminTenantService } from './admin-tenant.service';
import { UpdateTenantDto } from '../../core/tenant/dto/update-tenant.dto';
import { AdminCreateTenantDto } from './dto/admin-create-tenant.dto';
import { AdminSearchTenantQuery } from './dto/admin-tenant.dto';
export declare class AdminTenantController {
    private readonly adminTenantService;
    constructor(adminTenantService: AdminTenantService);
    create(adminCreateTenantDto: AdminCreateTenantDto): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    update(updateTenantDto: UpdateTenantDto): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    findAll(): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto[]>;
    search(query: AdminSearchTenantQuery): Promise<import("../../core/tenant/dto/tenant.dto").SearchTenantsRes>;
    findOne(id: Types.ObjectId): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto | null>;
    remove(id: Types.ObjectId): Promise<boolean>;
}

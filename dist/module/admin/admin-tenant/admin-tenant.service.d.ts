import { Types } from 'mongoose';
import { TenantService } from '../../core/tenant/tenant.service';
import { UpdateTenantDto } from '../../core/tenant/dto/update-tenant.dto';
import { AdminCreateTenantDto } from './dto/admin-create-tenant.dto';
import { AdminSearchTenantQuerySortFilter } from './dto/admin-tenant.dto';
export declare class AdminTenantService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    create(adminCreateTenantDto: AdminCreateTenantDto): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    validateTenant(phoneNumber: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto | null>;
    findAll(): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto[]>;
    findOne(id: Types.ObjectId): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto | null>;
    findByPhoneNumber(phoneNumber: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    update(updateTenantDto: UpdateTenantDto): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchTenantQuerySortFilter, filters: AdminSearchTenantQuerySortFilter[]): Promise<import("../../core/tenant/dto/tenant.dto").SearchTenantsRes>;
}

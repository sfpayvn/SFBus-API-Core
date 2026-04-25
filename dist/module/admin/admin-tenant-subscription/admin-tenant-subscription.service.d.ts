import { Types } from 'mongoose';
import { AdminRegisterSubscriptionDto, AdminSearchTenantSubscriptionQuerySortFilter, AdminSearchTenantSubscriptionRes, AdminTenantSubscriptionDto } from './dto/admin-tenant-subscription.dto';
import { TenantSubscriptionService } from '@/module/core/tenant-subscription/tenant-subscription.service';
export declare class AdminTenantSubscriptionService {
    private readonly tenantSubscriptionService;
    constructor(tenantSubscriptionService: TenantSubscriptionService);
    registerForTenant(tenantId: Types.ObjectId, dto: AdminRegisterSubscriptionDto): Promise<AdminTenantSubscriptionDto>;
    findByTenantId(tenantId: Types.ObjectId): Promise<AdminTenantSubscriptionDto | null>;
    findAllByTenantId(tenantId: Types.ObjectId): Promise<AdminTenantSubscriptionDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchTenantSubscriptionQuerySortFilter, filters: AdminSearchTenantSubscriptionQuerySortFilter[]): Promise<AdminSearchTenantSubscriptionRes>;
    searchMySubscriptions(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchTenantSubscriptionQuerySortFilter, filters: AdminSearchTenantSubscriptionQuerySortFilter[]): Promise<AdminSearchTenantSubscriptionRes>;
}

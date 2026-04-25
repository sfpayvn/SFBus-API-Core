import { Types } from 'mongoose';
import { DriverRegisterSubscriptionDto, DriverSearchTenantSubscriptionQuerySortFilter, DriverSearchTenantSubscriptionRes, DriverTenantSubscriptionDto } from './dto/driver-tenant-subscription.dto';
import { TenantSubscriptionService } from '@/module/core/tenant-subscription/tenant-subscription.service';
export declare class DriverTenantSubscriptionService {
    private readonly tenantSubscriptionService;
    constructor(tenantSubscriptionService: TenantSubscriptionService);
    registerForTenant(tenantId: Types.ObjectId, dto: DriverRegisterSubscriptionDto): Promise<DriverTenantSubscriptionDto>;
    findByTenantId(tenantId: Types.ObjectId): Promise<DriverTenantSubscriptionDto | null>;
    findAllByTenantId(tenantId: Types.ObjectId): Promise<DriverTenantSubscriptionDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchTenantSubscriptionQuerySortFilter, filters: DriverSearchTenantSubscriptionQuerySortFilter[]): Promise<DriverSearchTenantSubscriptionRes>;
}
